# ASWOORODA TRAVELS — Direct WhatsApp Notification Setup

This project separates two WhatsApp flows:

1. **Manual WhatsApp button**: opens `wa.me` for a human to start/chat with the owner or customer.
2. **Automatic booking notification**: Customer submits a booking -> Supabase `bookings` INSERT -> Database Webhook -> `whatsapp-notify` Edge Function -> Meta WhatsApp Cloud API -> owner's phone.

The automatic flow does **not** open a WhatsApp browser page. It sends through the WhatsApp Business Cloud API. Meta provides the Cloud API `/messages` endpoint for programmatic messages and requires a registered WhatsApp business sender, phone-number ID, and access token with messaging permission. citeturn1search1turn1search4

## 1. Install and run

```powershell
npm install
npm run dev
```

## 2. Supabase browser configuration

Copy `.env.example` to `.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Do not put Meta access tokens in `.env` or React code.

Run `supabase/schema.sql` in the Supabase SQL Editor.

## 3. Meta / WhatsApp Cloud API

You need a Meta Business Portfolio, WhatsApp Business Account, and registered business phone number. The Cloud API sends messages through the business phone-number ID. citeturn1search4

Create Supabase Edge Function secrets:

```text
META_ACCESS_TOKEN=YOUR_META_TOKEN
META_PHONE_NUMBER_ID=YOUR_WHATSAPP_BUSINESS_PHONE_NUMBER_ID
META_GRAPH_API_VERSION=vXX.X
ASWOORODA_OWNER_WHATSAPP=918125130488
WHATSAPP_WEBHOOK_SECRET=CREATE_A_LONG_RANDOM_SECRET
```

**Important:** `ASWOORODA_OWNER_WHATSAPP` must be the phone that should receive the notification. If the WhatsApp Business sender number is the same number, use a separate admin/owner recipient number for the notification flow; the sender/recipient relationship must be valid for your Meta setup.

## 4. Deploy the Edge Function

Function file:

```text
supabase/functions/whatsapp-notify/index.ts
```

Using Supabase CLI:

```powershell
supabase functions deploy whatsapp-notify --no-verify-jwt
```

Then set the secrets in Supabase. Never commit the access token.

## 5. Create the Database Webhook

Supabase Dashboard -> Database -> Webhooks -> Create webhook

Use:

- Table: `public.bookings`
- Event: `INSERT` and `UPDATE`
- Target: `whatsapp-notify` Edge Function
- Method: POST
- Header: `x-webhook-secret: <same WHATSAPP_WEBHOOK_SECRET>`

For `INSERT`, the function sends the complete booking to the owner.
For `UPDATE`, it sends the changed booking status to the customer.

## 6. What the owner receives

After a customer submits:

```text
ASWOORODA TRAVELS - NEW TRIP REQUEST

Booking ID: AST-2026-1234
Customer: Karthik
Mobile: 8125130488
Pickup: Tirupati
Destination: Kanipakam
Date: 2026-10-05 06:00
Travellers: 4
Package: Kanipakam Special Offer
Vehicle: Innova
Estimated Price: ₹4500
Notes: None

Please open the Owner Portal and contact the customer.
```

The customer does **not** need to click WhatsApp and does **not** need to keep the website open after submitting. The database webhook starts the backend send.

## 7. Meta messaging rules

Meta supports text, media and template messages through the Cloud API. Business-initiated messaging can require an approved template depending on the conversation state. If Meta rejects the free-form text, create an approved utility template and change the Edge Function to send the approved template. Meta's current API materials document template management and message sending. citeturn1search0turn1search1

## 8. Manual WhatsApp links

Manual links still use `https://wa.me/<digits>` and are only for human-initiated conversations. They are not the automatic notification mechanism.

## 9. Fleet and packages

Manage Fleet and Manage Packages remain in the existing project. Supabase is the production synchronization layer when configured; localStorage remains only as a fallback when Supabase is not configured.
