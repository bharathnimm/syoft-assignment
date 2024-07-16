import {useState} from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const App = () => {
  const [page, setPage] = useState('signup')
  const [userData, setUserData] = useState(null)

  const renderPage = () => {
    switch (page) {
      case 'signup':
        return <SignUp setPage={setPage} />
      case 'login':
        return <Login setPage={setPage} setUserData={setUserData} />
      case 'dashboard':
        return <Dashboard userData={userData} />
      default:
        return <SignUp setPage={setPage} />
    }
  }

  return <div className="app">{renderPage()}</div>
}

export default App
