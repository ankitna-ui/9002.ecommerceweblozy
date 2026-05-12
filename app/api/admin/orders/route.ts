import { NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockOrders";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.includes("demo-jwt-token-xyz123")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ orders: mockOrders });
}
