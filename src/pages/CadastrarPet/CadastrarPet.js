import { useState, useEffect } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import logoPet from "../../img/logoPet.png";
import styles from "./CadastrarPet.module.css";

const CadastrarPet = () => {
  const { user } = useAuthValue();
  const navigate = useNavigate();

  // 🔒 proteção da página
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [image, setImage] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [raca, setRaca] = useState("");
  const [cor, setCor] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [porte, setPorte] = useState("");
  const [vacinas, setVacinas] = useState("");
  const [castrado, setCastrado] = useState("");
  const [descricao, setDescricao] = useState("");
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("pets");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError("");

  // valida URL da imagem
  try {
    new URL(image);
  } catch {
    setFormError("A imagem precisa ser uma URL válida.");
    return;
  }

  if (
    !image ||
    !nome ||
    !tipo ||
    !raca ||
    !cor ||
    !idade ||
    !sexo ||
    !porte ||
    !vacinas ||
    !castrado ||
    !descricao
  ) {
    setFormError("Preencha todos os campos.");
    return;
  }

  try {
    await insertDocument({
      image,
      nome,
      tipo,
      raca,
      cor,
      idade,
      sexo,
      porte,
      vacinas,
      castrado,
      descricao,
      uid: user.uid,
      createdBy: user.displayName,
    });
    navigate("/");
  } catch (err) {
    setFormError("Erro ao cadastrar o pet. Tente novamente.");
  }
};


  return (
    <div className={styles.page}>
      <img src={logoPet} alt="Logo Pet" className={styles.logo} />

      <h2 className={styles.titulo}>Ficha de Cadastro do Pet</h2>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
    <input
      className={styles["campo-input"]}
      placeholder="URL da imagem"
      value={image}
      onChange={(e) => setImage(e.target.value)}
    />

    <input
      className={styles["campo-input"]}
      placeholder="Nome do pet"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
    />

    <div className={styles.linha}>
      <input
        className={styles["campo-input"]}
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        className={styles["campo-input"]}
        placeholder="Raça"
        value={raca}
        onChange={(e) => setRaca(e.target.value)}
      />
    </div>

    <div className={styles.linha}>
      <input
        className={styles["campo-input"]}
        placeholder="Cor"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
      />
      <input
        className={styles["campo-input"]}
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
    </div>

    <div className={styles.linha}>
      <input
        className={styles["campo-input"]}
        placeholder="Sexo"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
      />
      <input
        className={styles["campo-input"]}
        placeholder="Porte"
        value={porte}
        onChange={(e) => setPorte(e.target.value)}
      />
    </div>

<div className={styles.linha}>
    <input
      className={styles["campo-input"]}
      placeholder="Vacinas"
      value={vacinas}
      onChange={(e) => setVacinas(e.target.value)}
    />

    <input
      className={styles["campo-input"]}
      placeholder="Castrado"
      value={castrado}
      onChange={(e) => setCastrado(e.target.value)}
    />
    </div>

    <textarea
      className={styles["campo-textarea"]}
      placeholder="Descrição do pet"
      maxLength={300}
      value={descricao}
      onChange={(e) => setDescricao(e.target.value)}
    />

    <small>{descricao.length} / 300</small>

    {!response.loading && <button type="submit">ENVIAR</button>}
    {response.loading && <button disabled>Aguarde...</button>}

    {formError && <p className={styles.error}>{formError}</p>}
    {response.error && <p className={styles.error}>{response.error}</p>}
  </form>
      </div>
    </div>
  );
};

export default CadastrarPet;
