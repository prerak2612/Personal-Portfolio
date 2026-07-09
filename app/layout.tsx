import "./globals.css";

export const metadata = {
  title: "Prerak Arya - AI Full-Stack Developer Portfolio",
  description:
    "Premium interactive 3D portfolio for Prerak Arya, a Computer Science (AI) student building full-stack web applications and AI-powered products.",
  openGraph: {
    title: "Prerak Arya - AI Full-Stack Developer Portfolio",
    description:
      "Interactive 3D developer portfolio featuring experience, projects, skills, education, achievements, and contact details.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="m-0 bg-[#050505] p-0 font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
