import '@/app/_styles/globals.css'

import Logo from '@/app/_components/Logo'
import Navigation from '@/app/_components/Navigation'

export const metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome /  The Wild Oasis',
  },
  description:
    'Luxurios cabin hotel, located in the heart of the italian Dolomites, surronded by beautiful mountains and green forests',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by the Wild Oasis</footer>
      </body>
    </html>
  )
}
