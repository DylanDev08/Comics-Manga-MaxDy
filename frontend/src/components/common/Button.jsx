import { Link } from "react-router-dom";

function Button({ children, to, variant = "primary", icon: Icon, type = "button", ...props }) {
  const className = `button button--${variant}`;
  const content = (
    <>
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link className={className} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} type={type} {...props}>
      {content}
    </button>
  );
}

export default Button;
