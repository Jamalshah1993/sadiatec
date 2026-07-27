import type { ReactNode } from 'react'
import Script from 'next/script'
import "../globals.css" // <-- This restores Tailwind to all your frontend pages!
import { ScrollToTop } from '@saidatech/cms-core/components/ui'
import siteConfig from '../../../site.config'

export default function FrontendRootLayout({
  children,
}: {
  children: ReactNode
}) {
  const chatWidget = siteConfig.integrations.chatWidget
  const showChatWidget = siteConfig.features.aiAgent && chatWidget

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <ScrollToTop />
        {showChatWidget && (
          <>
            <link rel="stylesheet" href={chatWidget.url.replace(/widget\.js$/, 'widget.css')} />
            <Script
              src={chatWidget.url}
              strategy="lazyOnload"
              data-staff-whatsapp={chatWidget.whatsappNumber}
              data-avatar={chatWidget.avatarUrl}
              data-color={chatWidget.color}
            />
          </>
        )}
      </body>
    </html>
  )
}