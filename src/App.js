import {Switch, Route} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/my-profile" component={UserProfile} />
    </Switch>
  </div>
)

export default App
