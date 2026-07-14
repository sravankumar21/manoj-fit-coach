import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed"

export async function POST() {
  try {
    await seedDatabase()
    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Seed failed", error: String(error) }, { status: 500 })
  }
}
