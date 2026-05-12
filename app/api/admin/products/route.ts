import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.includes("demo-jwt-token-xyz123")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  // Mock add
  return NextResponse.json({ success: true, message: "Product added" });
}

export async function PUT(request: Request) {
  // Mock update
  return NextResponse.json({ success: true, message: "Product updated" });
}

export async function DELETE(request: Request) {
  // Mock delete
  return NextResponse.json({ success: true, message: "Product deleted" });
}
