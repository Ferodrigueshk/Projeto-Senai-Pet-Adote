import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Login.module.css";
import logoOficial from "./img/logoPet.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.loginBackground}>
      <a href="/">
        <img src={logoOficial} alt="Logo Pet" className={styles.logo} />
      </a>

      <h1>Login</h1>

      <div className={styles.container}>
        <form id="formAdocao" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail:"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha:"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!loading && (
            <button className={styles.loginButton} type="submit" id="btnEnviar">
              Entrar
            </button>
          )}

          {loading && (
            <button className={styles.loginButton} type="submit" disabled>
              Aguarde...
            </button>
          )}

          <p>
            Ainda não tem conta?
            <a href="/register"> Cadastre-se</a>
          </p>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
