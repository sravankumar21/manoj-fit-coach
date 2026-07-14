export interface User {
  _id?: string
  name: string
  email: string
  passwordHash: string
  role: "client" | "admin"
  createdAt: Date
}

export interface Service {
  _id?: string
  title: string
  description: string
  icon: string
  price?: string
  duration?: string
  details?: string
  includes?: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  _id?: string
  serviceId: string
  serviceName: string
  userId?: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  location: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  bookingReference: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: string
  userId?: string
  clientName: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  createdAt: Date
}

export interface JwtPayload {
  sub: string
  email: string
  role: string
  name: string
}
