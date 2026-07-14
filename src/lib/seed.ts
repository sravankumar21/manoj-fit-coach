import { connectToDatabase } from "./mongodb"
import bcrypt from "bcryptjs"

const defaultServices = [
  {
    title: "Weight Loss Programs",
    description: "Structured habit-based programs for sustainable weight loss that fit your lifestyle.",
    icon: "Flame",
    price: "Contact for pricing",
    duration: "8-12 weeks",
    details: "Our weight loss programs are designed around building healthy habits that last a lifetime. No crash diets, no extreme restrictions — just science-backed nutrition and accountability that delivers real, sustainable results. Each program is personalized to your body type, lifestyle, and goals.",
    includes: ["Personalized nutrition plan", "Weekly habit tracking & check-ins", "Body composition measurements", "WhatsApp support between sessions", "Recipe database access", "Monthly progress reviews"],
    isActive: true,
  },
  {
    title: "Body Transformation",
    description: "Complete body recomposition coaching — lose fat, build muscle, reshape your physique.",
    icon: "Dumbbell",
    price: "Contact for pricing",
    duration: "12-16 weeks",
    details: "Ready for a complete transformation? Our body recomposition program combines targeted nutrition with progressive training to help you simultaneously lose fat and build lean muscle.",
    includes: ["Customized training program", "Nutrition plan with macros", "Weekly video check-ins", "Progress photos & measurements", "Exercise technique guidance", "Mindset coaching sessions"],
    isActive: true,
  },
  {
    title: "Nutrition Planning",
    description: "Personalized meal plans & habit-based nutrition coaching for your unique needs.",
    icon: "Apple",
    price: "Contact for pricing",
    duration: "Ongoing",
    details: "Nutrition is the foundation of every transformation. Our personalized meal plans are built around foods you actually enjoy, making healthy eating easy and sustainable.",
    includes: ["Custom meal plans", "Grocery shopping lists", "Meal prep guides", "Nutrition education sessions", "Habit building framework", "Flexible dieting approach"],
    isActive: true,
  },
  {
    title: "Online Coaching",
    description: "Virtual 1-on-1 coaching with weekly check-ins, accountability, and support from anywhere.",
    icon: "Monitor",
    price: "Contact for pricing",
    duration: "Monthly",
    details: "Can't make it in person? Our online coaching gives you the same expert guidance and accountability from the comfort of your home.",
    includes: ["Weekly video coaching calls", "Daily habit check-ins via app", "24/7 WhatsApp support", "Custom workout plans", "Nutrition guidance", "Monthly progress reports"],
    isActive: true,
  },
  {
    title: "Personal Training",
    description: "In-person training sessions tailored to your goals with expert guidance and motivation.",
    icon: "Users",
    price: "Contact for pricing",
    duration: "Per session",
    details: "Train face-to-face with Manoj for maximum motivation and perfect form. Each session is customized to your fitness level and goals.",
    includes: ["1-on-1 training sessions", "Customized workout plan", "Real-time form correction", "Warm-up & cool-down guidance", "Progress tracking", "Flexible scheduling"],
    isActive: true,
  },
]

const adminEmails = ["manoj@manojfitcoach.com", "developer@manojfitcoach.com"]

export async function seedDatabase() {
  const { db } = await connectToDatabase()

  // Seed services if empty
  const serviceCount = await db.collection("services").countDocuments()
  if (serviceCount === 0) {
    const now = new Date()
    const services = defaultServices.map((s) => ({
      ...s,
      createdAt: now,
      updatedAt: now,
    }))
    await db.collection("services").insertMany(services)
  }

  // Seed admin accounts
  for (const email of adminEmails) {
    const existing = await db.collection("users").findOne({ email })
    if (!existing) {
      await db.collection("users").insertOne({
        name: email === "manoj@manojfitcoach.com" ? "Manoj" : "Developer",
        email,
        passwordHash: await bcrypt.hash("ManojFit@2026", 10),
        role: "admin",
        createdAt: new Date(),
      })
    }
  }
}
