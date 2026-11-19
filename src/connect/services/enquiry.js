// API layer for the project enquiry form.
//
// The endpoint is configured at build time with VITE_ENQUIRY_ENDPOINT (see .env.example and
// docs/connect-enquiry-api.md). The backend owns email delivery to enquiry@artisticduckk.com;
// no SMTP credentials or API keys ever live in frontend code.
//
// When no endpoint is configured, `isEnquiryApiConfigured` is false and the UI falls back to
// opening the visitor's email app with the brief prefilled. It never reports a delivery that
// did not happen.

const ENDPOINT = (import.meta.env.VITE_ENQUIRY_ENDPOINT || '').trim()
const TIMEOUT_MS = 15000

export const isEnquiryApiConfigured = ENDPOINT.length > 0

export class EnquiryError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message)
    this.name = 'EnquiryError'
    this.status = status
    this.fieldErrors = fieldErrors || {}
  }
}

/**
 * POST an enquiry to the backend.
 * @param {{name:string,email:string,company?:string,service:string,message:string}} data
 * @param {{honeypot?:string, startedAt?:number}} meta  spam-protection signals, validated server-side
 * @returns {Promise<{id?:string}>}
 */
export async function submitEnquiry(data, meta = {}) {
  if (!isEnquiryApiConfigured) throw new EnquiryError('Enquiry endpoint is not configured.', { status: 0 })

  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    company: (data.company || '').trim() || null,
    service: data.service,
    message: data.message.trim(),
    source: 'connect',
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    // spam protection: the honeypot must be empty and the form must not be submitted instantly
    website: meta.honeypot || '',
    elapsed_ms: meta.startedAt ? Date.now() - meta.startedAt : null,
  }

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
  } catch (err) {
    throw new EnquiryError(
      err.name === 'AbortError'
        ? 'The request timed out. Please check your connection and try again.'
        : 'We could not reach our server. Please check your connection and try again.',
    )
  } finally {
    clearTimeout(timer)
  }

  let body = null
  try {
    body = await res.json()
  } catch {
    /* empty or non-JSON body */
  }

  if (!res.ok) {
    if (res.status === 422 && body) throw new EnquiryError('Please check the highlighted fields.', { status: 422, fieldErrors: mapFastApiErrors(body) })
    if (res.status === 429) throw new EnquiryError('Too many attempts. Please wait a minute and try again.', { status: 429 })
    throw new EnquiryError((body && (body.message || (typeof body.detail === 'string' && body.detail))) || 'Something went wrong on our side. Please try again.', { status: res.status })
  }
  return body || {}
}

// FastAPI validation errors look like {detail:[{loc:['body','email'], msg:'...'}]}.
function mapFastApiErrors(body) {
  const out = {}
  if (Array.isArray(body.detail)) {
    for (const e of body.detail) {
      const field = Array.isArray(e.loc) ? e.loc[e.loc.length - 1] : null
      if (field && !out[field]) out[field] = e.msg
    }
  } else if (body.errors && typeof body.errors === 'object') {
    Object.assign(out, body.errors)
  }
  return out
}

/** A mailto: link carrying the brief, used when the API is not configured. */
export function buildMailto(to, data) {
  const subject = `Project enquiry: ${data.service}${data.company ? ` — ${data.company}` : ''}`
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${data.service}`,
    '',
    data.message,
    '',
    '— Sent from artisticduckk.com/connect',
  ]
    .filter((l) => l !== null)
    .join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
