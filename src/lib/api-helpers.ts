import { NextResponse } from "next/server"
import { connectToDatabase } from "./mongodb"
import { getUserFromRequest } from "./auth"
import type { JwtPayload } from "./types"
import type { Collection, ObjectId } from "mongodb"

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status })
}

export function jsonSuccess(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

export async function getCollection(name: string): Promise<Collection> {
  const { db } = await connectToDatabase()
  return db.collection(name)
}

export async function requireAuth(request: Request): Promise<JwtPayload> {
  const user = await getUserFromRequest(request)
  if (!user) throw new Error("Unauthorized")
  return user
}

export async function requireAdmin(request: Request): Promise<JwtPayload> {
  const user = await requireAuth(request)
  if (user.role !== "admin") throw new Error("Forbidden")
  return user
}

export function toObjectId(id: string): ObjectId {
  const { ObjectId } = require("mongodb")
  return new ObjectId(id)
}
