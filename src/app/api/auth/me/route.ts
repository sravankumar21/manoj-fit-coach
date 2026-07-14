import { NextResponse } from "next/server"
import { getCollection } from "@/lib/api-helpers"
import { getUserFromRequest } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    const payload = await getUserFromRequest(request)
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const users = await getCollection("users")
    const user = await users.findOne({ _id: new ObjectId(payload.sub) })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }
    return NextResponse.json({
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    })
  } catch {
    return NextResponse.json({ message: "Failed to get user" }, { status: 500 })
  }
}
