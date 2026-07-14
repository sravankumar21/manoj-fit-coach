import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    await connectToDatabase()
    return NextResponse.json({ status: "healthy" })
  } catch {
    return NextResponse.json({ status: "unhealthy" }, { status: 500 })
  }
}
