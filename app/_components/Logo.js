import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'

function Logo() {
  return (
    <Link href="/" className="flex items-center z-10">
      {/* <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        quality={100}
      /> */}
      <div className="h-16"></div>

      <span className="text-2xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  )
}

export default Logo
