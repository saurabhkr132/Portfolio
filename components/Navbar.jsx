import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-start align-top gap-5 text-red-500'>
      <Link href="/">
          Home
        </Link>
        <Link href="/Projects">
          Projects
        </Link>
        <Link href="/Member">
          Materials
        </Link>
    </nav>
  )
}

export default Navbar