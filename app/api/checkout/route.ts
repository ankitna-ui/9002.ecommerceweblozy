import { NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockOrders";
import { generateOrderId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = generateOrderId();
    
    const newOrder = {
      id: orderId,
      ...body,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    mockOrders.push(newOrder);

    return NextResponse.json({ success: true, orderId: orderId, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
