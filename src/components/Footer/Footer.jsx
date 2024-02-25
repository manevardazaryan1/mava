import './Footer.css'


export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <p>&copy;{date} by mava.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}