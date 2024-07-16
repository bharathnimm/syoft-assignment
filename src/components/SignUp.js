import {useState} from 'react'
import '../styles.css'

const SignUp = ({setPage}) => {
  const [form, setForm] = useState({
    user_firstname: '',
    user_email: '',
    user_password: '',
    user_phone: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.user_firstname) newErrors.user_firstname = 'Full name is required'
    if (!form.user_email) newErrors.user_email = 'Email is required'
    if (!form.user_password) newErrors.user_password = 'Password is required'
    if (!form.user_phone) newErrors.user_phone = 'Phone number is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return

    const payload = {
      ...form,
      user_lastname: 'StaticLastName',
      user_city: 'StaticCity',
      user_zipcode: '123456',
    }

    const response = await fetch(
      'https://syoft.dev/Api/user_registeration/api/user_registeration',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      },
    )

    if (response.ok) {
      setPage('login')
    }
  }

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_firstname"
          placeholder="Full Name"
          value={form.user_firstname}
          onChange={handleChange}
          required
        />
        {errors.user_firstname && (
          <p className="error">{errors.user_firstname}</p>
        )}
        <input
          type="email"
          name="user_email"
          placeholder="Email Address"
          value={form.user_email}
          onChange={handleChange}
          required
        />
        {errors.user_email && <p className="error">{errors.user_email}</p>}
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          value={form.user_password}
          onChange={handleChange}
          required
        />
        {errors.user_password && (
          <p className="error">{errors.user_password}</p>
        )}
        <input
          type="text"
          name="user_phone"
          placeholder="Phone Number"
          value={form.user_phone}
          onChange={handleChange}
          required
        />
        {errors.user_phone && <p className="error">{errors.user_phone}</p>}
        <button type="submit">Create your free account</button>
      </form>
      <p>
        Already have an account?
        <span
          onClick={() => setPage('login')}
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            if (e.key === 'Enter') setPage('login')
          }}
        >
          Sign in
        </span>
      </p>
    </div>
  )
}

export default SignUp
