# Hydropulse

Hydropulse is a water and soil-moisture monitoring concept with timely alerts to help teams decide what to do next.

This repository contains the Hydropulse landing page, built with Vite and React. It includes a sample field dashboard, a branching scripted voice-call preview, and configurable contact links.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Set these Vite environment values in `.env.local` or the deployment environment to enable the contact links:

- `VITE_WHATSAPP_NUMBER`: recipient number in international format, digits only (for example, `2547XXXXXXXX`). The page opens a WhatsApp click-to-chat link; this is not the WhatsApp Business API.
- `VITE_CONTACT_EMAIL`: email address for the contact link.

## Product preview limits

Dashboard values are illustrative sample data. The voice interaction is a scripted browser preview and does not place a phone call or control irrigation. Live sensor ingestion, an AI calling provider, and WhatsApp Business messaging still need backend services and provider credentials; do not put provider secrets in `VITE_` variables because they are exposed to the browser.

## Authors

- [davytheprogrammer](https://github.com/davytheprogrammer)
- [Nas-inya](https://github.com/Nas-inya)
