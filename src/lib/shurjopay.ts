type CreatePaymentArgs = {
  orderId: string;
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

const SHURJO_BASE = process.env.SHURJOPAY_BASE_URL || 'https://secure.shurjopay.com';
const VENDOR_ID = process.env.SHURJOPAY_VENDOR_ID || '';
const SECRET = process.env.SHURJOPAY_SECRET || '';
const RETURN_URL = process.env.SHURJOPAY_RETURN_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8090'}/api/payment/verify`;

export async function createPayment(args: CreatePaymentArgs) {
  const payload = {
    vendor_id: VENDOR_ID,
    secret: SECRET,
    amount: args.amount,
    invoice_no: args.orderId,
    customer_name: args.name,
    customer_email: args.email,
    customer_phone: args.phone,
    customer_address: args.address,
    return_url: RETURN_URL,
  };

  const resp = await fetch(`${SHURJO_BASE}/api/merchant/create_payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await resp.json().catch(() => ({}));
  return json;
}

export async function verifyTransaction(txId: string) {
  if (!txId) return { success: false, message: 'missing transaction id' };
  const resp = await fetch(`${SHURJO_BASE}/api/merchant/verify_transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vendor_id: VENDOR_ID, secret: SECRET, token: txId }),
  });

  const json = await resp.json().catch(() => ({}));
  return json;
}

export default { createPayment, verifyTransaction };
