import { NextResponse } from 'next/server';
import { verifyTransaction } from '@/lib/shurjopay';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tx = url.searchParams.get('txid') || url.searchParams.get('token') || url.searchParams.get('order_id') || '';

    if (!tx) {
      return NextResponse.json({ error: 'missing_transaction_token' }, { status: 400 });
    }

    const result = await verifyTransaction(tx);

    // Decide redirect based on result. This is provider-dependent.
    const success = result?.status === 'Completed' || result?.status === 'SUCCESS' || result?.success === true;

    if (success) {
      // Redirect to checkout success page with order reference if available
      const orderRef = result?.invoice_no || result?.invoice || '';
      const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8090'}/checkout/success`);
      if (orderRef) redirectUrl.searchParams.set('orderId', String(orderRef));
      return NextResponse.redirect(redirectUrl);
    }

    // On failure, return JSON for debugging or redirect to an error page
    return NextResponse.json({ ok: false, result });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
