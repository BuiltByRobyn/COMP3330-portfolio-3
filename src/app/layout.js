import { Inter, Roboto_Mono } from 'next/font/google'
import "./globals.css"
import MyNavBar from "../components/ui/navBar"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata = {
  title: 'Robyn Portfolio',
  description: 'My personal portfolio showcasing projects and experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
        <MyNavBar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
