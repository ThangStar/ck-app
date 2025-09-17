import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone } = await request.json()

    // Mock registration - replace with real registration logic
    // Check if user already exists (mock check)
    if (email === "existing@saputoranch.com") {
      return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 400 })
    }

    // Create new user (mock)
    const user = {
      id: Date.now().toString(),
      email,
      name,
      phone,
      balance: 0,
    }

    const token = "mock-jwt-token-" + Date.now()

    return NextResponse.json({
      user,
      token,
      message: "Đăng ký thành công",
    })
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 })
  }
}
