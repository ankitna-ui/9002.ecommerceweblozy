import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mockUsers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Hardcoded check for demo as requested
    if (email === "admin@fiorentini.com" && password === "admin123") {
      const user = mockUsers.find(u => u.email === email);
      return NextResponse.json({
        success: true,
        token: "demo-jwt-token-xyz123",
        user
      });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
