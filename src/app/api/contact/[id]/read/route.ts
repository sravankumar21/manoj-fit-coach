import { NextResponse } from "next/server"
import { getCollection, requireAdmin } from "@/lib/api-helpers"
import { ObjectId } from "mongodb"

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(_request)
    const { id } = await params
    const contacts = await getCollection("contacts")
    await contacts.updateOne({ _id: new ObjectId(id) }, { $set: { isRead: true } })
    const updated = await contacts.findOne({ _id: new ObjectId(id) })
    return NextResponse.json(updated)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }
}
