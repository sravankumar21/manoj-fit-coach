import { NextResponse } from "next/server"
import { getCollection, requireAdmin } from "@/lib/api-helpers"
import { ObjectId } from "mongodb"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request)
    const { id } = await params
    const { status } = await request.json()
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }
    const appointments = await getCollection("appointments")
    await appointments.updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } })
    const updated = await appointments.findOne({ _id: new ObjectId(id) })
    return NextResponse.json(updated)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }
}
