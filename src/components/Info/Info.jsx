import './Info.css'

import { Button } from '../Button/Button'

import { Link } from 'react-router-dom'
import heroImage from "../../images/hero-video.mp4"

export const Info = () => {
  return (
    <div className='info'>
      <div className="container">
        <div className="info-wrapper">
        <div className="info-image">

          <video autoPlay muted loop>
              <source src={heroImage} type="video/mp4" /> 
            </video>
          </div>
          {/* <div className="info-text">
            <div className="info-title">
              best task managment app
            </div>
            <p className='info-text'>AMMA-Track helps team move</p>
            <p className='info-text info-text--gradient'>work forward.</p>
            <p className='info-main'>
              Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with AMMA-Track!
            </p>
            <Button>
              <Link to='/sign-up'> Get AMMA-Track for free</Link>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  )
}