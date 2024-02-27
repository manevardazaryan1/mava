import './Info.css'

import { Button } from '../Button/Button'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Info = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn")
    if (isLoggedIn && isLoggedIn === "ON") 
      navigate('/workspaces');
    
  }, [navigate])

  return (
    <div className='info'>
      <div className="container">
        <div className="info-wrapper">
          <div className="info-text on-image">
            <span className="hero-label">Best task managment app</span>
            <h1 className="hero-title">mava helps team move</h1>
            <p className='info-main'>
              Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with mava!
            </p>
            <Button type="main">
              <Link to='/sign-up'> Get mava for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}