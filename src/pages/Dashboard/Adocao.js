import { useState, useEffect } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Adocao.module.css";

const Adocao = () => {
  const { user } = useAuthValue();
  const { documents: pets, loading, error } = useFetchDocuments("pets");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (petId) => {
    setFavoritos((prevFavoritos) => {
      if (prevFavoritos.includes(petId)) {
        return prevFavoritos.filter((id) => id !== petId);
      } else {
        return [...prevFavoritos, petId];
      }
    });
  };

  const openModal = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  if (loading) return <p>Carregando pets...</p>;
  if (error) return <p>{error}</p>;
  if (!pets || pets.length === 0) return <p>Nenhum pet encontrado.</p>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          <i className={`${styles.arrowIcon} bi bi-arrow-left-circle-fill`} id="arrowLeft"></i>
          <div className={styles.cardsContainer}>
            {(pets || []).map((pet) => (
              <article
                key={pet.id || pet._id || pet.nome}
                className={`${styles.card} ${pet.sexo === "macho" ? styles.macho : ""}`}
              >
                <div className={styles.cardImg}>
                  <img
                    src={pet.image || "/img/placeholder.png"}
                    alt={pet.nome || "pet"}
                  />
                  {/* Ícone de favoritar com base no estado */}
                  <i
                    className={`${styles.heartIcon} bi bi-suit-heart-fill`}
                    onClick={() => toggleFavorito(pet.id || pet._id)} // Alternar favorito
                    style={{
                      color: favoritos.includes(pet.id || pet._id) ? "#b94d9d" : "gray", 
                    }}
                  />
                </div>

                <div className={styles.cardContent}>
                  <h1>{pet.nome}</h1>
                  <span
                    className={`${styles.tag} ${pet.sexo === "macho" ? styles.machoTag : ""}`}
                  >
                    {pet.sexo}, {pet.idade} {pet.idade === "1" ? "mês" : "meses"}
                  </span>

                  <br />
                  <div className={styles.paragrafo}>
                    <p className={styles.title}>Tipo: </p>
                    <p>{pet.tipo}</p>
                  
                  </div>
                    <br></br>
                  <button
                    className={styles.btnVerPassaporte}
                    onClick={() => openModal(pet)}
                  >
                    Ver Passaporte Completo
                  </button>
                </div>
              </article>
            ))}
          </div>
          <i
            className={`${styles.arrowIcon} bi bi-arrow-right-circle-fill`}
            id="arrowRight"
            aria-label="Próximo"
            role="button"
          ></i>
        </div>

        <div className={styles.cadastroWrapper}>
          <a href="cadastrarPet">
            <button className={styles.btnCadastrar}>Cadastre seu pet</button>
          </a>
        </div>
      </div>

      {modalVisible && selectedPet && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span
                className={styles.closeButton}
                role="button"
                onClick={closeModal}
                aria-label="Fechar"
              >
                &times;
              </span>
              <span
                className={styles.heartIcon}
                onClick={() => toggleFavorito(selectedPet.id || selectedPet._id)} 
                title="Salvar"
              >
                <i
                  className={`bi bi-suit-heart-fill ${styles.favoriteIcon}`}
                  style={{
                    color: favoritos.includes(selectedPet.id || selectedPet._id)
                      ? "#b94d9d"
                      : "gray",
                  }}
                ></i>
              </span>
            </div>
            <h2>{selectedPet.nome}</h2>
            <div className={styles.modalInfo}>
              <img
                src={selectedPet.image || "/img/placeholder.png"}
                alt={selectedPet.nome}
                className={styles.modalImage}
              />
              <div className={styles.passportInfo}>
                <div className={styles.title}>Informações</div>
                <p><strong>Tipo:</strong> {selectedPet.tipo}</p>
                <p><strong>Raça:</strong> {selectedPet.raca}</p>
                <p><strong>Cor:</strong> {selectedPet.cor}</p>
                <p><strong>Idade:</strong> {selectedPet.idade}</p>
                <p><strong>Sexo:</strong> {selectedPet.sexo}</p>
                <p><strong>Porte:</strong> {selectedPet.porte}</p>
                <p><strong>Vacinado:</strong> {selectedPet.vacinas}</p>
                <p><strong>Castrado:</strong> {selectedPet.castrado}</p>
                <p><strong>Descrição:</strong> {selectedPet.descricao}</p>
              </div>
            </div>
            <button
              className={styles.btnAdotar}
              onClick={() => console.log("Adotar", selectedPet.nome)}
            >
              Adote-me
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Adocao;
