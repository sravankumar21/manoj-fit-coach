import { NextResponse } from "next/server"
import { getCollection, requireAdmin } from "@/lib/api-helpers"
import { ObjectId } from "mongodb"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const services = await getCollection("services")
    const service = await services.findOne({ _id: new ObjectId(id) })
    if (!service) return NextResponse.json({ message: "Service not found" }, { status: 404 })
    return NextResponse.json({ ...service, _id: service._id.toString() })
  } catch {
    return NextResponse.json({ message: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request)
    const { id } = await params
    const data = await request.json()
    const services = await getCollection("services")
    await services.updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } })
    const updated = await services.findOne({ _id: new ObjectId(id) })
    return NextResponse.json(updated)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(_request)
    const { id } = await params
    const services = await getCollection("services")
    await services.updateOne({ _id: new ObjectId(id) }, { $set: { isActive: false, updatedAt: new Date() } })
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed to delete service" }, { status: 500 })
  }
}
