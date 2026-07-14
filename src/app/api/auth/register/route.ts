import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getCollection } from "@/lib/api-helpers"
import { signToken } from "@/lib/auth"
import type { User } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 })
    }
    const users = await getCollection("users")
    const existing = await users.findOne({ email })
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await users.insertOne({
      name, email, passwordHash, role: "client", createdAt: new Date(),
    } as Omit<User, "_id">)
    const token = await signToken({
      sub: result.insertedId.toString(), email, role: "client", name,
    })
    return NextResponse.json({
      token,
      user: { _id: result.insertedId.toString(), name, email, role: "client", createdAt: new Date().toISOString() },
    })
  } catch {
    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}
