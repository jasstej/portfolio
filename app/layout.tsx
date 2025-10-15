import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SoundProvider } from "@/components/sound/SoundProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import { NotificationProvider } from "@/components/ui/notifications";

const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], display: "swap" });
const shareMono = Share_Tech_Mono({ variable: "--font-share-tech-mono", weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "JasstejTrace.exe — Portfolio",
  description: "Cyberpunk developer + cybersecurity portfolio of Jasstej Singh Marwaha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-cursor="laser">
      <body className={`${orbitron.variable} ${shareMono.variable} ${inter.variable} antialiased`}>
          <NotificationProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <SoundProvider>
                {children}
                <CustomCursor />
                {/* Scanline overlay */}
                <div className="pointer-events-none fixed inset-0 z-[5] mix-blend-overlay opacity-20 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]"></div>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `(()=>{document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='t'){document.documentElement.classList.toggle('dark');}})})();`,
                  }}
                />
              </SoundProvider>
            </ThemeProvider>
          </NotificationProvider>
      </body>
    </html>
  );
}
