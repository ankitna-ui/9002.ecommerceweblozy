import { NextResponse } from "next/server";

// Mocking server-side cart
let cartItems: any[] = [];

export async function GET() {
  return NextResponse.json({ items: cartItems });
}

export async function POST(request: Request) {
  const body = await request.json();
  cartItems.push(body);
  return NextResponse.json({ success: true, items: cartItems });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    cartItems = cartItems.filter(item => item.product.id !== id);
  } else {
    cartItems = [];
  }
  return NextResponse.json({ success: true, items: cartItems });
}
