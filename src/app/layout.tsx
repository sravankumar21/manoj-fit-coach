import type { Metadata } from "next"
import "@fontsource-variable/outfit"
import "@fontsource-variable/inter"
import "./globals.css"

export const metadata: Metadata = {
  title: "Manoj Fit Coach | Online Weight Loss & Body Transformation Coach",
  description: "Online Weight Loss & Body Transformation Coach. Habit-based Nutrition for sustainable, life-changing results.",
  openGraph: {
    title: "Manoj Fit Coach",
    description: "Online Weight Loss & Body Transformation Coach. Habit-based Nutrition for sustainable results.",
    url: "https://manoj-fit-coach.vercel.app",
    siteName: "Manoj Fit Coach",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
