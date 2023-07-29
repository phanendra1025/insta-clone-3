import {Component} from 'react'
import './index.css'
import Header from '../Header'
import UserStories from '../UserStories'
import Posts from '../Posts'

class HomeRoute extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <UserStories />
        <Posts />
      </div>
    )
  }
}

export default HomeRoute
