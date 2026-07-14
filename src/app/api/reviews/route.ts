import { NextResponse } from "next/server"
import { getCollection, requireAuth } from "@/lib/api-helpers"
import type { Review } from "@/lib/types"

export async function GET() {
  try {
    const reviews = await getCollection("reviews")
    const results = await reviews.find({ isApproved: true }).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(results.map(r => ({ ...r, _id: r._id.toString() })))
  } catch {
    return NextResponse.json({ message: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request)
    const { clientName, rating, comment } = await request.json()
    if (!clientName || !rating || !comment) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
    const reviews = await getCollection("reviews")
    const now = new Date()
    const reviewData = {
      userId: user.sub, clientName, rating: Number(rating), comment,
      isApproved: false, createdAt: now, updatedAt: now,
    }
    const result = await reviews.insertOne(reviewData as Omit<Review, "_id">)
    return NextResponse.json({ ...reviewData, _id: result.insertedId.toString() }, { status: 201 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed"
    if (msg === "Unauthorized") return NextResponse.json({ message: msg }, { status: 401 })
    return NextResponse.json({ message: "Failed to create review" }, { status: 500 })
  }
}
