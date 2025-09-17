import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock authentication - replace with real authentication logic
    // Accept username or email in the "email" field from client for simplicity
    if ((email === "admin" || email === "admin@saputoranch.com") && password === "123456") {
      const user = {
        id: "1",
        email: typeof email === "string" && email.includes("@") ? email : "admin@saputoranch.com",
        name: "Quản trị viên",
        phone: "0123456789",
        balance: 50000000, // 50 million VND
      }

      const token = "mock-jwt-token-" + Date.now()

      const response = NextResponse.json({
        user,
        token,
        message: "Đăng nhập thành công",
      })

      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    }

    return NextResponse.json({ message: "Tài khoản/Email hoặc mật khẩu không đúng" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 })
  }
}
