import { Eye, EyeOff, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PasswordStrength from "../components/auth/PasswordStrength";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/auth.service";

const copy = {
  login: { title: "Iniciar sesion", button: "Entrar", showUser: false, showPassword: true },
  register: { title: "Crear cuenta", button: "Registrarme", showUser: true, showPassword: true, confirmPassword: true },
  forgot: { title: "Recuperar password", button: "Enviar email", showUser: false, showPassword: false },
  reset: { title: "Resetear password", button: "Guardar password", showUser: false, showPassword: true, token: true },
  verify: { title: "Verificacion de email", button: "Volver al perfil", showUser: false, showPassword: false },
};

const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  token: "",
};

function validateForm(mode, form) {
  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresa un email valido.";
  }

  if (mode === "register" && form.username.trim().length < 3) {
    errors.username = "El username debe tener al menos 3 caracteres.";
  }

  if (["login", "register", "reset"].includes(mode) && form.password.length < 8) {
    errors.password = "La password debe tener al menos 8 caracteres.";
  }

  if (mode === "register" && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Las passwords no coinciden.";
  }

  if (mode === "reset" && form.token.trim().length < 24) {
    errors.token = "El token no parece valido.";
  }

  return errors;
}

function AuthPage({ mode }) {
  const config = copy[mode] || copy.login;
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(mode, form);
    setErrors(nextErrors);
    setMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
        navigate(location.state?.from || "/usuario/perfil", { replace: true });
      } else if (mode === "register") {
        await register({ username: form.username, email: form.email, password: form.password });
        navigate("/usuario/perfil", { replace: true });
      } else if (mode === "forgot") {
        await authService.forgotPassword({ email: form.email });
        setMessage("Si el email existe, enviamos instrucciones para continuar.");
      } else if (mode === "reset") {
        await authService.resetPassword({ token: form.token, password: form.password });
        setMessage("Password actualizada. Ya podes iniciar sesion.");
      } else {
        navigate("/usuario/perfil");
      }
    } catch (error) {
      setMessage(error.message || "No pudimos completar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-panel" onSubmit={submit}>
        <p className="eyebrow">Cuenta MaxDy</p>
        <h1>{config.title}</h1>
        {message ? <div className="notice">{message}</div> : null}

        {config.showUser ? (
          <label>
            Usuario
            <span>
              <UserRound size={18} />
              <input value={form.username} onChange={(event) => updateField("username", event.target.value)} placeholder="maxdy_reader" />
            </span>
            {errors.username ? <small className="field-error">{errors.username}</small> : null}
          </label>
        ) : null}

        <label>
          Email
          <span>
            <Mail size={18} />
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="tu@email.com" />
          </span>
          {errors.email ? <small className="field-error">{errors.email}</small> : null}
        </label>

        {config.token ? (
          <label>
            Token
            <span>
              <ShieldCheck size={18} />
              <input value={form.token} onChange={(event) => updateField("token", event.target.value)} placeholder="token seguro" />
            </span>
            {errors.token ? <small className="field-error">{errors.token}</small> : null}
          </label>
        ) : null}

        {config.showPassword ? (
          <label>
            Password
            <span>
              <ShieldCheck size={18} />
              <input type={visible ? "text" : "password"} value={form.password} onChange={(event) => updateField("password", event.target.value)} />
              <button className="inline-icon" type="button" onClick={() => setVisible((current) => !current)} aria-label="Mostrar u ocultar password">
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
            <PasswordStrength value={form.password} />
            {errors.password ? <small className="field-error">{errors.password}</small> : null}
          </label>
        ) : null}

        {config.confirmPassword ? (
          <label>
            Confirmar password
            <span>
              <ShieldCheck size={18} />
              <input type={visible ? "text" : "password"} value={form.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} />
            </span>
            {errors.confirmPassword ? <small className="field-error">{errors.confirmPassword}</small> : null}
          </label>
        ) : null}

        <Button type="submit" disabled={loading}>{loading ? "Procesando..." : config.button}</Button>
        <div className="auth-panel__links">
          <a href="/registro">Registro</a>
          <a href="/recuperar-password">Recuperar password</a>
        </div>
      </form>
    </section>
  );
}

export default AuthPage;
