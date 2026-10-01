import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const digits = (value: unknown) => String(value ?? '').replace(/\D/g, '')

async function sendWhatsAppText(to: string, body: string) {
  const token = Deno.env.get('META_ACCESS_TOKEN')
  const phoneNumberId = Deno.env.get('META_PHONE_NUMBER_ID')
  const version = Deno.env.get('META_GRAPH_API_VERSION')

  if (!token || !phoneNumberId || !version) {
    throw new Error('WhatsApp Cloud API secrets are not configured.')
  }

  const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { preview_url: false, body },
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(`Meta WhatsApp API ${response.status}: ${JSON.stringify(data)}`)
  }
  return data
}

function bookingMessage(record: Record<string, unknown>) {
  return [
    '🚕 ASWOORODA TRAVELS - NEW TRIP REQUEST',
    '',
    `Booking ID: ${record.id ?? '-'}`,
    `Customer: ${record.customer_name ?? '-'}`,
    `Mobile: ${record.mobile ?? '-'}`,
    `WhatsApp: ${record.whatsapp ?? record.mobile ?? '-'}`,
    `Pickup: ${record.pickup ?? '-'}`,
    `Destination: ${record.destination ?? '-'}`,
    `Date: ${record.travel_date ?? '-'} ${record.pickup_time ?? ''}`.trim(),
    `Travellers: ${record.travellers ?? '-'}`,
    `Package: ${record.package_name ?? '-'}`,
    `Vehicle: ${record.vehicle_name ?? '-'}`,
    `Estimated Price: ${record.total_price ? `₹${record.total_price}` : 'Quotation Required'}`,
    `Notes: ${record.special_notes ?? 'None'}`,
    '',
    'Please open the Owner Portal and contact the customer.',
  ].join('\n')
}

function customerStatusMessage(record: Record<string, unknown>) {
  const status = String(record.status ?? 'UPDATED')
  return [
    'ASWOORODA TRAVELS',
    '',
    `Booking ID: ${record.id ?? '-'}`,
    `Your trip request status: ${status}`,
    `Package: ${record.package_name ?? '-'}`,
    `Travel Date: ${record.travel_date ?? '-'}`,
    '',
    status === 'CONFIRMED'
      ? 'Your trip has been confirmed. Our team will contact you for the final details.'
      : 'Our team has updated your trip request. We will contact you shortly.',
  ].join('\n')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405)

  const expectedSecret = Deno.env.get('WHATSAPP_WEBHOOK_SECRET')
  if (expectedSecret) {
    const suppliedSecret = req.headers.get('x-webhook-secret')
    if (suppliedSecret !== expectedSecret) return json({ error: 'Unauthorized webhook' }, 401)
  }

  try {
    const payload = await req.json()
    const record = (payload?.record ?? payload?.data?.record ?? payload) as Record<string, unknown>
    const eventType = String(payload?.type ?? payload?.event ?? 'INSERT').toUpperCase()
    const oldRecord = (payload?.old_record ?? payload?.data?.old_record ?? {}) as Record<string, unknown>

    const owner = digits(Deno.env.get('ASWOORODA_OWNER_WHATSAPP'))
    if (!owner) return json({ error: 'ASWOORODA_OWNER_WHATSAPP is not configured.' }, 500)

    if (eventType === 'INSERT') {
      const result = await sendWhatsAppText(owner, bookingMessage(record))
      return json({ ok: true, sentTo: 'owner', result })
    }

    if (eventType === 'UPDATE') {
      const oldStatus = String(oldRecord.status ?? '')
      const newStatus = String(record.status ?? '')
      if (oldStatus === newStatus) return json({ ok: true, skipped: 'status unchanged' })

      const customer = digits(record.whatsapp ?? record.mobile)
      if (!customer) return json({ ok: true, skipped: 'customer has no WhatsApp number' })

      const result = await sendWhatsAppText(customer, customerStatusMessage(record))
      return json({ ok: true, sentTo: 'customer', result })
    }

    return json({ ok: true, skipped: `unsupported event ${eventType}` })
  } catch (error) {
    console.error(error)
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})
