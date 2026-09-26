import './Button.css';

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  children,
  ...rest
}) {
  return (
    <Component
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...rest}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
    </Component>
  );
}
