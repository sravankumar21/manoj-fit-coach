import { NextResponse } from "next/server"
import { getCollection, requireAuth } from "@/lib/api-helpers"

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request)
    const appointments = await getCollection("appointments")
    const results = await appointments
      .find({ $or: [{ userId: user.sub }, { clientEmail: user.email }] })
      .sort({ createdAt: -1 }).toArray()
    return NextResponse.json(results.map(a => ({ ...a, _id: a._id.toString() })))
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }
}
