import { NextResponse } from "next/server"
import { getCollection, requireAdmin } from "@/lib/api-helpers"
import type { Service } from "@/lib/types"

export async function GET() {
  try {
    const services = await getCollection("services")
    const all = await services.find({ isActive: true }).sort({ createdAt: 1 }).toArray()
    return NextResponse.json(all.map(s => ({ ...s, _id: s._id.toString() })))
  } catch {
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request)
    const data = await request.json()
    const services = await getCollection("services")
    const now = new Date()
    const result = await services.insertOne({ ...data, isActive: true, createdAt: now, updatedAt: now } as Omit<Service, "_id">)
    return NextResponse.json({ ...data, _id: result.insertedId.toString(), isActive: true, createdAt: now, updatedAt: now }, { status: 201 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed to create service" }, { status: 500 })
  }
}
