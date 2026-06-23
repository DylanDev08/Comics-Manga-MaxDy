import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";

import Button from "../components/common/Button";
import PasswordStrength from "../components/auth/PasswordStrength";

const copy = {
  login: { title: "Iniciar sesion", button: "Entrar", showUser: false, showPassword: true },
  register: { title: "Crear cuenta", button: "Registrarme", showUser: true, showPassword: true },
  forgot: { title: "Recuperar password", button: "Enviar email", showUser: false, showPassword: false },
  reset: { title: "Resetear password", button: "Guardar password", showUser: false, showPassword: true },
  verify: { title: "Verificacion de email", button: "Verificar", showUser: false, showPassword: false },
};

function AuthPage({ mode }) {
  const [password, setPassword] = useState("");
  const config = copy[mode] || copy.login;

  return (
    <section className="auth-page">
      <form className="auth-panel">
        <p className="eyebrow">Cuenta MaxDy</p>
        <h1>{config.title}</h1>
        {config.showUser ? (
          <label>
            Usuario
            <span><UserRound size={18} /><input placeholder="maxdy_reader" /></span>
          </label>
        ) : null}
        <label>
          Email
          <span><Mail size={18} /><input type="email" placeholder="tu@email.com" /></span>
        </label>
        {mode === "reset" ? (
          <label>
            Token
            <span><ShieldCheck size={18} /><input placeholder="token seguro" /></span>
          </label>
        ) : null}
        {config.showPassword ? (
          <label>
            Password
            <span><ShieldCheck size={18} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></span>
            <PasswordStrength value={password} />
          </label>
        ) : null}
        <Button type="submit">{config.button}</Button>
        <div className="auth-panel__links">
          <a href="/registro">Registro</a>
          <a href="/recuperar-password">Recuperar password</a>
        </div>
      </form>
    </section>
  );
}

export default AuthPage;
