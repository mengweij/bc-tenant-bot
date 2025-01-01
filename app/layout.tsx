import "./global.css"
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
    title: "BC TenantBot",
    description: "A chatbot that can answer questions about BC Tenant Law.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={quicksand.className}>
            <body>{children}</body>
        </html>
    )
}