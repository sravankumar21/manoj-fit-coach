import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getCollection } from "@/lib/api-helpers"
import { signToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }
    const users = await getCollection("users")
    const user = await users.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }
    const token = await signToken({
      sub: user._id.toString(), email: user.email, role: user.role, name: user.name,
    })
    return NextResponse.json({
      token,
      user: { _id: user._id.toString(), name: user.name, email: user.email, role: user.role, createdAt: user.createdAt.toISOString() },
    })
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
