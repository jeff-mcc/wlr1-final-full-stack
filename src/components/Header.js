import {Link} from 'react-router-dom'

const Header = () => {
  return(
    <header>
      <Link>Auth</Link>
      <Link>Products</Link>
      <Link>Cart</Link>
    </header>
  )
}

export default Header