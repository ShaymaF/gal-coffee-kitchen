import type React from "react"
import type { Metadata } from "next"
import { Cormorant, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart/cart-provider"
import { Toaster } from "@/components/ui/toaster"

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "GAL Coffee & Kitchen",
  description: "Redefining sophistication and taste in coffee and dining",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans bg-gal-dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'