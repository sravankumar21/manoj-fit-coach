import { NextResponse } from "next/server"
import { getCollection, requireAuth } from "@/lib/api-helpers"
import type { Appointment } from "@/lib/types"

function generateRef(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `MFC-2026-${num}`
}

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request)
    const appointments = await getCollection("appointments")
    let query: Record<string, unknown> = {}
    if (user.role !== "admin") {
      query = { $or: [{ userId: user.sub }, { clientEmail: user.email }] }
    }
    const results = await appointments.find(query).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(results.map(a => ({ ...a, _id: a._id.toString() })))
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    return NextResponse.json({ message: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { serviceId, clientName, clientEmail, clientPhone, date, time, location, notes } = body
    if (!serviceId || !clientName || !clientEmail || !clientPhone || !date || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
    const services = await getCollection("services")
    const { ObjectId } = await import("mongodb")
    const service = await services.findOne({ _id: new ObjectId(serviceId) })
    if (!service) return NextResponse.json({ message: "Service not found" }, { status: 404 })

    let userId: string | undefined
    try {
      const payload = await requireAuth(request)
      userId = payload.sub
    } catch { /* unauthenticated booking ok */ }

    const appointments = await getCollection("appointments")
    const now = new Date()
    const bookingReference = generateRef()
    const appointmentData = {
      serviceId, serviceName: service.title, userId: userId || null,
      clientName, clientEmail, clientPhone, date, time,
      location: location || "online", notes: notes || "",
      status: "pending" as const, bookingReference, createdAt: now, updatedAt: now,
    }
    const result = await appointments.insertOne(appointmentData as Omit<Appointment, "_id">)
    return NextResponse.json({ ...appointmentData, _id: result.insertedId.toString() }, { status: 201 })
  } catch {
    return NextResponse.json({ message: "Failed to create appointment" }, { status: 500 })
  }
}
