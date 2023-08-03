import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const userProfileAPIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class UserProfile extends Component {
  state = {
    userProfileData: {},
    apiStatus: userProfileAPIConstants.initial,
  }

  componentDidMount() {
    this.getTheUserProfileDetails()
  }

  getTheUserProfileDetails = async () => {
    this.setState({apiStatus: userProfileAPIConstants.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/my-profile',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const {profile} = data
      const updatedData = {
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        id: profile.id,
        posts: profile.posts,
        postsCount: profile.posts_count,
        profilePic: profile.profile_pic,
        stories: profile.stories,
        userBio: profile.user_bio,
        userId: profile.user_id,
        userName: profile.user_name,
      }
      this.setState({
        userProfileData: updatedData,
        apiStatus: userProfileAPIConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {userProfileData} = this.state
    const {
      followersCount,
      followingCount,
      id,
      posts,
      postsCount,
      profilePic,
      stories,
      userBio,
      userId,
      userName,
    } = userProfileData
    return (
      <div className="user-profile">
        <div className="user-profile-details-container">
          <p>{userName} Aditya</p>
          <div className="user-account-details">
            <img
              src={profilePic}
              alt="profile-pic"
              className="user-profile-pic"
            />
            <div className="counts-container">
              <p className="user-profile-counts-text">{postsCount}</p>
              <p className="user-profile-counts-name">posts</p>
            </div>
            <div className="counts-container">
              <p className="user-profile-counts-text">{followersCount}</p>
              <p className="user-profile-counts-name">followers</p>
            </div>
            <div className="counts-container">
              <p className="user-profile-counts-text">{followingCount}</p>
              <p className="user-profile-counts-name">following</p>
            </div>
          </div>
          <p className="user-profile-id">{userId}</p>
          <p className="user-profile-bio">{userBio}</p>
          <ul className="user-profile-highlights-container">
            {stories.map(eachPost => (
              <li className="highlight-item" key={eachPost.id}>
                <img src={eachPost.image} alt="story" className="highlights" />
              </li>
            ))}
          </ul>
        </div>
        <div className="user-profile-posts-container">
          <div className="posts-heading-container">
            <BsGrid3X3 size="15px" />
            <p className="post-text">Posts</p>
          </div>
          <ul className="user-profile-posts-list">
            {posts.map(eachPost => (
              <li key={eachPost.id} className="user-profile-post">
                <img src={eachPost.image} alt="post" className="post-image" />
              </li>
            ))}
          </ul>
        </div>{' '}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="user-profile-loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderAllUserProfileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case userProfileAPIConstants.success:
        return this.renderSuccessView()
      case userProfileAPIConstants.failure:
        return this.renderFailureView()
      case userProfileAPIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-container">
          {this.renderAllUserProfileViews()}
        </div>
      </>
    )
  }
}

export default UserProfile
