// this will let me go through each and every page through a navigation bar
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <Link to = '/'>Home</Link>
      <Link to = '/Register'>Register</Link>
      <Link to = '/Login'>Login</Link>
    </nav>
  )
}

