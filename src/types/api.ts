export interface Service {
  _id: string
  title: string
  description: string
  icon: string
  price?: string
  duration?: string
  details?: string
  includes?: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  _id: string
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
  createdAt: string
  updatedAt: string
}

export interface Review {
  _id: string
  userId?: string
  clientName: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: "admin" | "client"
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface GoogleLoginRequest {
  credential: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface CreateAppointmentRequest {
  serviceId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  location: string
  notes?: string
}

export interface CreateReviewRequest {
  clientName: string
  rating: number
  comment: string
}

export interface CreateContactRequest {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}
