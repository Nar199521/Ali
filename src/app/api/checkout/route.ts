import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { products } from '@/lib/data';
import { createPayment } from '@/lib/shurjopay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, cart } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'empty cart' }, { status: 400 });
    }

    // calculate total using local product data
    let amount = 0;
    for (const item of cart) {
      const p = products.find((x) => String(x.id) === String(item.productId));
      if (p) amount += (p.price || 0) * (item.quantity || 1);
    }

    const orderId = uuidv4();

    // Create payment with ShurjoPay
    const resp = await createPayment({ orderId, amount, name, email, phone, address });

    // Resp shape varies; try common keys
    const paymentUrl = resp?.payment_url || resp?.redirect_url || resp?.url || resp?.paymentUrl || null;

    return NextResponse.json({ orderId, amount, paymentUrl, raw: resp });
  } catch (err) {
    return NextResponse.json({ error: 'server_error', details: String(err) }, { status: 500 });
  }
}
