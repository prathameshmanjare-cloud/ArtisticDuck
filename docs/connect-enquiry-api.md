# /connect enquiry API

The project enquiry form on `/connect` posts to a backend you configure with
`VITE_ENQUIRY_ENDPOINT` (build-time env var; see `.env.example`). The backend is
responsible for spam checks and for emailing the enquiry to **enquiry@artisticduckk.com**.
No SMTP credentials or provider keys belong in this repository's frontend code.

Until the variable is set, the form validates input and then opens the visitor's email
app with the brief prefilled and addressed to enquiry@artisticduckk.com. The page says
plainly that nothing has been sent until they press send.

Frontend code: `src/connect/services/enquiry.js`.

## Request

`POST {VITE_ENQUIRY_ENDPOINT}` — `Content-Type: application/json`

```json
{
  "name": "Asha Rao",
  "email": "asha@company.com",
  "company": "Company Pvt Ltd",
  "service": "Technology & Development",
  "message": "We need a new website and a booking flow…",
  "source": "connect",
  "page_url": "https://www.artisticduckk.com/connect",
  "website": "",
  "elapsed_ms": 48210
}
```

| Field | Rules |
|---|---|
| `name` | required, 2–100 chars |
| `email` | required, valid email, ≤160 chars |
| `company` | optional (`null` when empty), ≤120 chars |
| `service` | required, one of: Creative & Design, Photography & Cinematography, Marketing & Advertising, Technology & Development, AI & Automation, SEO & Analytics, Branding & Promotions, Events & Management, Other |
| `message` | required, 20–4000 chars |
| `source` | always `"connect"` |
| `page_url` | informational |
| `website` | **honeypot** — must be empty. If filled, respond `200` and silently drop. |
| `elapsed_ms` | time from first keystroke to submit. Treat `< 2500` as likely spam (drop silently). |

## Responses the frontend understands

| Status | Body | UI |
|---|---|---|
| `200`/`201` | `{"id": "…"}` (optional) | success panel: "delivered to our team" |
| `422` | FastAPI validation shape `{"detail":[{"loc":["body","email"],"msg":"…"}]}` or `{"errors":{"email":"…"}}` | field errors shown inline |
| `429` | any | "Too many attempts" |
| other | `{"detail": "…"}` or `{"message": "…"}` | error banner with retry + direct email link |

Only return `2xx` after the email provider has accepted the message — the page tells
the visitor their enquiry was delivered when it gets one.

## Server requirements

- CORS: allow `POST` + `Content-Type` from `https://www.artisticduckk.com` (and `https://artisticduckk.com`).
- Rate-limit per IP (e.g. 5 per 10 minutes).
- Validate everything server-side; never trust the client checks.
- Send with a transactional email provider; keep credentials in server env vars.
- Set `Reply-To` to the visitor's email so the team can reply directly.

## Reference FastAPI implementation

```python
# pip install fastapi pydantic[email] slowapi
import os, smtplib, ssl
from email.message import EmailMessage
from typing import Literal, Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

Service = Literal["Creative & Design", "Photography & Cinematography", "Marketing & Advertising",
                  "Technology & Development", "AI & Automation", "SEO & Analytics",
                  "Branding & Promotions", "Events & Management", "Other"]

class Enquiry(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=120)
    service: Service
    message: str = Field(min_length=20, max_length=4000)
    source: str = "connect"
    page_url: Optional[str] = None
    website: str = ""          # honeypot
    elapsed_ms: Optional[int] = None

app = FastAPI()
app.add_middleware(CORSMiddleware,
    allow_origins=["https://www.artisticduckk.com", "https://artisticduckk.com"],
    allow_methods=["POST"], allow_headers=["Content-Type"])

@app.post("/api/enquiries", status_code=201)
def create_enquiry(e: Enquiry, request: Request):
    if e.website or (e.elapsed_ms is not None and e.elapsed_ms < 2500):
        return {"id": None}  # silently drop likely spam

    msg = EmailMessage()
    msg["Subject"] = f"New enquiry: {e.service} — {e.name}"
    msg["From"] = os.environ["ENQUIRY_FROM"]          # e.g. no-reply@artisticduckk.com
    msg["To"] = "enquiry@artisticduckk.com"
    msg["Reply-To"] = e.email
    msg.set_content(
        f"Name: {e.name}\nEmail: {e.email}\nCompany: {e.company or '-'}\n"
        f"Service: {e.service}\nSource: {e.source} ({e.page_url})\n\n{e.message}\n")

    with smtplib.SMTP(os.environ["SMTP_HOST"], int(os.environ.get("SMTP_PORT", 587))) as s:
        s.starttls(context=ssl.create_default_context())
        s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
        s.send_message(msg)
    return {"id": "ok"}
```

Then build the frontend with:

```bash
VITE_ENQUIRY_ENDPOINT=https://api.artisticduckk.com/api/enquiries npm run build
```
