import {useEffect, useState} from 'react'
import '../styles.css'

const Dashboard = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Fetch user data from local storage or your API
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  if (!userData) {
    return <p>No user data available</p>
  }

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>
      <div className="user-info">
        <p>
          <strong>First Name: NIMMADALA BHARATH KUMAR</strong>{' '}
          {userData.user_firstname}
        </p>
        <p>
          <strong>Email: Bharathroy666@gmail.com</strong> {userData.user_email}
        </p>
        <p>
          <strong>Phone:9100567586</strong> {userData.user_phone}
        </p>
        <p>
          <strong>City:</strong> {userData.user_city || 'StaticCity'}
        </p>
        <p>
          <strong>Zipcode:</strong> {userData.user_zipcode || '123456'}
        </p>
      </div>
    </div>
  )
}

export default Dashboard
