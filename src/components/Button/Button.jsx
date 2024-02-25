import './Button.css'


export const Button = ({ onClick, children, type, disabled, className }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`button ${type} ${className}`}>{children}</button>
  )
}