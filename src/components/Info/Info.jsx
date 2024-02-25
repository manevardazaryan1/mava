import './Info.css'

import { Button } from '../Button/Button'

import { Link } from 'react-router-dom'
import heroImage from "../../images/login-signup/login-signup-background-image.webp"

export const Info = () => {
  return (
    <div className='info'>
      <div className="container">
        <div className="info-wrapper">
          <div className="hero-image">
          <img src={heroImage} />
          </div>
          <div className="info-text">
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