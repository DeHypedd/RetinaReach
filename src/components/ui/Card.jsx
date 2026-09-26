import './Card.css';

export default function Card({ className = '', padded = true, children, ...rest }) {
  return (
    <div className={`card ${padded ? 'card--padded' : ''} ${className}`} {...rest}>
      {children}
    </div>
  );
}
