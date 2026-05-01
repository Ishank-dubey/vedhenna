# Checkout and Fulfillment Plan

This is a future plan for when Vedhenna has enough scale to add online payment and automated shipping pickup.

## Goal

Let customers place an order on the website, pay online using UPI/payment apps, and automatically trigger shipment creation and pickup through Delhivery.

## Recommended Approach

Use one payment gateway first instead of directly integrating PhonePe, Paytm, and Google Pay separately.

A single Indian payment gateway can usually support UPI flows that customers complete through PhonePe, Paytm, Google Pay, and other UPI apps. This keeps KYC, reconciliation, webhooks, and failure handling simpler.

## Suggested Customer Flow

1. Customer opens `/checkout`.
2. Customer selects Vedhenna quantity.
3. Customer enters name, phone number, delivery address, and optional email.
4. Website shows order summary and delivery charge note.
5. Backend creates an internal order with status `PENDING_PAYMENT`.
6. Backend creates a payment session with the selected payment gateway.
7. Customer completes payment.
8. Payment webhook confirms success.
9. Backend marks order as `PAID`.
10. Backend creates shipment/order in Delhivery.
11. Backend schedules Delhivery pickup.
12. Customer sees order confirmation and tracking details when available.

## Pages To Add Later

- `/checkout`
- `/order/success?orderId=...`
- `/order/failed?orderId=...`
- `/order/status?orderId=...`
- `/terms`
- `/privacy`
- `/refund-policy`
- `/shipping-policy`

Payment gateways often review policy pages during merchant onboarding, so these pages should exist before production payment approval.

## Backend API Routes

- `POST /api/orders/create`
  - Creates the internal order.

- `POST /api/payments/create`
  - Creates the payment session with the payment gateway.

- `POST /api/payments/webhook`
  - Receives payment success, failure, and pending updates.

- `POST /api/delhivery/create-shipment`
  - Creates shipment after payment is confirmed.

- `POST /api/delhivery/schedule-pickup`
  - Schedules Delhivery pickup after shipment creation.

- `GET /api/orders/[id]`
  - Returns order, payment, and shipment status.

## Database Needed

Use a small hosted database such as Vercel Postgres, Neon, or Supabase.

Minimum tables:

- `orders`
- `payments`
- `shipments`

Important fields:

- customer name
- phone number
- email
- delivery address
- quantity
- amount
- delivery charge
- payment gateway order ID
- payment status
- Delhivery waybill/tracking ID
- shipment status
- created/updated timestamps

## Delhivery Flow

Do not schedule pickup before payment is confirmed.

Preferred flow:

```text
Customer places order
→ payment initiated
→ payment webhook confirms paid
→ create Delhivery shipment
→ schedule Delhivery pickup
→ store waybill/tracking
→ show/send confirmation
```

## Information Needed Before Implementation

- Payment gateway choice.
- Merchant account and KYC completion.
- Sandbox and production API keys.
- Delhivery One account.
- Delhivery API token.
- Delhivery warehouse/pickup location configured.
- Pickup warehouse name used by Delhivery.
- Shipping rule for Hyderabad vs outside Hyderabad.
- Whether GST invoice is required.
- Refund/cancellation policy text.
- Shipping policy text.
- Privacy and terms text.

## Phased Plan

### Phase 1

Build checkout UI and internal order shape. Keep payment manual or WhatsApp-assisted.

### Phase 2

Add payment gateway sandbox and webhook handling.

### Phase 3

Add Delhivery sandbox shipment creation and pickup scheduling.

### Phase 4

Enable production payment and Delhivery pickup after end-to-end testing.

