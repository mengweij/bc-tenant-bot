import "./global.css"
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
    title: "BC TenantBot",
    description: "A chatbot that can answer questions about BC Tenant Law.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>{children}</body>
        </html>
    )
}