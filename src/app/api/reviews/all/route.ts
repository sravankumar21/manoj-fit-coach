import { NextResponse } from "next/server"
import { getCollection, requireAdmin } from "@/lib/api-helpers"

export async function GET(request: Request) {
  try {
    await requireAdmin(request)
    const reviews = await getCollection("reviews")
    const results = await reviews.find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(results.map(r => ({ ...r, _id: r._id.toString() })))
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    if (msg === "Forbidden") return NextResponse.json({ message: msg }, { status: 403 })
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }
}
