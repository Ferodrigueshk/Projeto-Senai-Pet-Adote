import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Register.module.css";
import logoOficial from "./img/logoPet.png";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password,
      telefone,
      endereco,
      showPassword,
    };

    await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.page}>
      <a href="/Home">
        <img src={logoOficial} alt="Logo" className={styles.logoOficial} />
      </a>

      <h2>Ficha cadastro do adotante</h2>

      <div className={styles.container}>
        <form id="formAdocao" onSubmit={handleSubmit}>
          <input
            type="text"
            name="displayName"
            placeholder="Nome Completo:"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="E-mail:"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="tel"
            placeholder="Telefone:"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Endereço:"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!loading && (
            <button type="submit" id="btnEnviar" className={styles.btn}>
              ENVIAR
            </button>
          )}

          {loading && (
            <button className={styles.btn} disabled>
              Aguarde...
            </button>
          )}

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
