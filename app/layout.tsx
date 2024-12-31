import "./global.css"

export const metadata = {
    title: "BC TenantBot",
    description: "A chatbot that can answer questions about BC Tenant Law.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}