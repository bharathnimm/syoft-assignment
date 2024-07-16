import {useState} from 'react'
import '../styles.css'

const Login = ({setPage, setUserData}) => {
  const [form, setForm] = useState({
    user_email: '',
    user_password: '',
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.user_email) newErrors.user_email = 'Email is required'
    if (!form.user_password) newErrors.user_password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    // Check for specific credentials before making the API call
    if (
      form.user_email === 'mail@gmail.com' &&
      form.user_password === '123456'
    ) {
      try {
        const response = await fetch(
          'https://syoft.dev/Api/userlogin/api/userlogin',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
          },
        )

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('user', JSON.stringify(data))
          setUserData(data)
          setPage('dashboard')
        } else {
          setApiError('Invalid login credentials')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        setApiError('Failed to login. Please try again.')
      }
    } else {
      setApiError('Invalid login credentials')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) return

    handleLogin()
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <h3 style={{textAlign: 'start'}}>Username</h3>
        <input
          type="email"
          name="user_email"
          placeholder="mail@gmail.com"
          value={form.user_email}
          onChange={handleChange}
          required
        />
        {errors.user_email && <p className="error">{errors.user_email}</p>}
        <h3 style={{textAlign: 'start'}}>Password</h3>
        <input
          type="password"
          name="user_password"
          placeholder="123456"
          value={form.user_password}
          onChange={handleChange}
          required
        />
        {errors.user_password && (
          <p className="error">{errors.user_password}</p>
        )}
        <button type="submit">Login</button>
        {apiError && <p className="error">{apiError}</p>}
      </form>
    </div>
  )
}

export default Login
