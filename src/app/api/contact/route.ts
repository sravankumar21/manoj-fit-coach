import { NextResponse } from "next/server"
import { getCollection, requireAdmin } from "@/lib/api-helpers"
import type { ContactMessage } from "@/lib/types"

export async function GET(request: Request) {
  try {
    await requireAdmin(request)
    const contacts = await getCollection("contacts")
    const results = await contacts.find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(results.map(c => ({ ...c, _id: c._id.toString() })))
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json()
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
    const contacts = await getCollection("contacts")
    const contactData = {
      name, email, phone: phone || "", subject, message, isRead: false, createdAt: new Date(),
    }
    const result = await contacts.insertOne(contactData as Omit<ContactMessage, "_id">)
    return NextResponse.json({ ...contactData, _id: result.insertedId.toString() }, { status: 201 })
  } catch {
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 })
  }
}
