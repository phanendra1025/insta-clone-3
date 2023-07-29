import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    isMenuVisible: false,
  }

  showTheMenu = () => {
    this.setState({isMenuVisible: true})
  }

  closeTheMenu = () => {
    this.setState({isMenuVisible: false})
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderDesktopMenu = () => (
    <ul className="nav-items-list">
      <Link to="/" className="header-link-items">
        <li className="menu-list-item">Home</li>
      </Link>
      <Link to="/my-profile" className="header-link-items">
        <li className="menu-list-item">Profile</li>
      </Link>
      <li>
        <button type="button" onClick={this.logout} className="logout-button">
          Logout
        </button>
      </li>
    </ul>
  )

  renderMobileMenu = () => {
    const {isMenuVisible} = this.state
    const menuClass = isMenuVisible
      ? 'mobile-menu-details-list'
      : 'mobile-menu-details-list-off'
    return (
      <ul className={menuClass}>
        <Link to="/" className="header-link-items">
          <li className="menu-list-item">Home</li>
        </Link>

        <li className="menu-list-item">Search</li>
        <Link to="/my-profile" className="header-link-items">
          <li className="menu-list-item">Profile</li>
        </Link>
        <li>
          <button
            type="button"
            onClick={this.logout}
            className="mobile-logout-button"
          >
            Logout
          </button>
        </li>
        <li>
          <button
            className="close-button"
            type="button"
            onClick={this.closeTheMenu}
          >
            <AiFillCloseCircle color="#262626" size="24px" />
          </button>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <nav className="nav-bar-container">
        <div className="nav-bar-content-container">
          <div className="nav-bar-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dytmw4swo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1689749750/Insta%20Clone/Group_t5f0gl.jpg?_s=public-apps"
                alt="website logo"
                className="navbar-website-logo"
              />
            </Link>
            <h1 className="navbar-app-name">Insta Share</h1>
          </div>
          <div className="nav-items-container">
            <div className="search-bar-container">
              <input
                type="search"
                className="search-bar"
                placeholder="Search Caption"
              />
              <div className="search-icon-container">
                <FaSearch size={10} color="#989898" />
              </div>
            </div>
            {this.renderDesktopMenu()}
          </div>
          <div className="menu-icon-container">
            <button
              type="button"
              onClick={this.showTheMenu}
              className="hamburger-menu-button"
            >
              <GiHamburgerMenu color="#262626" size="24px" />
            </button>
          </div>
        </div>
        {this.renderMobileMenu()}
      </nav>
    )
  }
}

export default withRouter(Header)
