function PasswordStrength({ value }) {
  const score = [value.length >= 8, /[A-Z]/.test(value), /[0-9]/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
  const labels = ["Muy debil", "Debil", "Media", "Fuerte", "Excelente"];

  return (
    <div className="password-strength">
      <div className="password-strength__track">
        <span style={{ width: `${Math.max(score, 1) * 25}%` }} />
      </div>
      <small>{labels[score]}</small>
    </div>
  );
}

export default PasswordStrength;
