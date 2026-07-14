import type {
  AuthResponse, LoginRequest, GoogleLoginRequest, RegisterRequest,
  Service, Appointment, Review, ContactMessage,
  CreateAppointmentRequest, CreateReviewRequest, CreateContactRequest,
} from "@/types/api"

const API_URL = ""

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      window.location.href = "/login"
    }
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || "Request failed")
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

export const authApi = {
  login: (data: LoginRequest) =>
    request<AuthResponse>("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  googleLogin: (data: GoogleLoginRequest) =>
    request<AuthResponse>("/api/auth/google", { method: "POST", body: JSON.stringify(data) }),
  register: (data: RegisterRequest) =>
    request<AuthResponse>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  me: () => request<{ user: { id: string; name: string; email: string; role: string } }>("/api/auth/me"),
}

export const servicesApi = {
  getAll: () => request<Service[]>("/api/services"),
  getById: (id: string) => request<Service>(`/api/services/${id}`),
  create: (data: Partial<Service>) =>
    request<Service>("/api/services", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Service>) =>
    request<Service>(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/api/services/${id}`, { method: "DELETE" }),
}

export const appointmentsApi = {
  create: (data: CreateAppointmentRequest) =>
    request<Appointment>("/api/appointments", { method: "POST", body: JSON.stringify(data) }),
  getMine: () => request<Appointment[]>("/api/appointments/mine"),
  getById: (id: string) => request<Appointment>(`/api/appointments/${id}`),
}

export const reviewsApi = {
  getApproved: () => request<Review[]>("/api/reviews"),
  create: (data: CreateReviewRequest) =>
    request<Review>("/api/reviews", { method: "POST", body: JSON.stringify(data) }),
}

export const contactApi = {
  create: (data: CreateContactRequest) =>
    request<ContactMessage>("/api/contact", { method: "POST", body: JSON.stringify(data) }),
}

export const adminApi = {
  getAppointments: () => request<Appointment[]>("/api/appointments"),
  updateAppointmentStatus: (id: string, status: string) =>
    request<Appointment>(`/api/appointments/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  getReviews: () => request<Review[]>("/api/reviews/all"),
  approveReview: (id: string) =>
    request<Review>(`/api/reviews/${id}/approve`, { method: "PATCH" }),
  rejectReview: (id: string) =>
    request<void>(`/api/reviews/${id}/reject`, { method: "PATCH" }),
  getContacts: () => request<ContactMessage[]>("/api/contact"),
  markContactRead: (id: string) =>
    request<ContactMessage>(`/api/contact/${id}/read`, { method: "PATCH" }),
}
