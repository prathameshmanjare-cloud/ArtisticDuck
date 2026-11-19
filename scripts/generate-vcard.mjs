// Generates the company contact card (public/artistic-duckk.vcf) from src/connect/data/connect.js
// so the download always matches the details shown on /connect. Company-only: no personal fields.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brand, CONNECT_URL, socials } from '../src/connect/data/connect.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// RFC 6350 text escaping and 75-octet line folding.
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')
function fold(line) {
  const out = []
  let rest = line
  while (Buffer.byteLength(rest) > 75) {
    let cut = 75
    while (Buffer.byteLength(rest.slice(0, cut)) > 75) cut--
    out.push(rest.slice(0, cut))
    rest = ' ' + rest.slice(cut)
  }
  out.push(rest)
  return out.join('\r\n')
}

const logo = readFileSync(resolve(root, 'public/logo-sm.png')).toString('base64')

const lines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  // organisation card: empty personal name, company as display name
  'N:;;;;',
  `FN:${esc(brand.legalName)}`,
  `ORG:${esc(brand.legalName)}`,
  'X-ABShowAs:COMPANY',
  `TEL;TYPE=WORK,VOICE:${brand.phoneE164}`,
  `EMAIL;TYPE=INTERNET,WORK:${brand.email}`,
  `URL;TYPE=WORK:${brand.website}`,
  `item1.URL:${CONNECT_URL}`,
  'item1.X-ABLabel:Digital card',
  socials.linkedin && `X-SOCIALPROFILE;TYPE=linkedin:${socials.linkedin}`,
  socials.instagram && `X-SOCIALPROFILE;TYPE=instagram:${socials.instagram}`,
  `NOTE:${esc(`${brand.principles.join(' • ')}. ${brand.statement}`)}`,
  `PHOTO;ENCODING=b;TYPE=PNG:${logo}`,
  `REV:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')}`,
  'END:VCARD',
].filter(Boolean)

const vcf = lines.map(fold).join('\r\n') + '\r\n'
const target = resolve(root, 'public', brand.vcard.href.replace(/^\//, ''))
writeFileSync(target, vcf)
console.log(`vCard written to ${target} (${vcf.length} bytes)`)
