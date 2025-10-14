import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daz Gordon - Product Designer & Builder",
  description: "Product designer, builder, and entrepreneur sharing insights on design, AI, and product development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="storyblok-editor"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.location.search.includes('_storyblok')) {
                var script = document.createElement('script');
                script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
                script.onload = function() {
                  storyblok.init({
                    accessToken: '${process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt'}',
                    bridge: true,
                    customParent: 'https://app.storyblok.com',
                    resolveRelations: ['featured_projects', 'featured_posts', 'featured_tools'],
                    apiOptions: {
                      region: 'eu-central-1'
                    }
                  });
                };
                document.head.appendChild(script);
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoryblokProvider>
          {children}
        </StoryblokProvider>
      </body>
    </html>
  );
}
