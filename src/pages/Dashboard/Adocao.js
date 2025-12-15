import { useState, useEffect, useRef } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import styles from "./Adocao.module.css";

const Adocao = () => {
  const { user } = useAuthValue();
  const { documents: pets, loading, error } = useFetchDocuments("pets");
  const navigate = useNavigate();
  const [localPets, setLocalPets] = useState([]);
  const cardsRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    setLocalPets(pets || []);
  }, [pets]);

  // calcula o passo (largura do card + gap) e o máximo de deslocamento
  useEffect(() => {
    const compute = () => {
      const container = cardsRef.current;
      if (!container) return;

      const firstCard = container.querySelector(`.${styles.card}`);
      if (!firstCard) return;

      const gapStr = getComputedStyle(container).gap || "0px";
      const gap = parseFloat(gapStr) || 0;
      const cardWidth = firstCard.offsetWidth;
      const step = cardWidth + gap;
      const totalCards = container.children.length;
      const totalWidth = totalCards * step - gap;
      const visibleWidth = container.offsetWidth;
      const max = Math.max(0, totalWidth - visibleWidth);

      setCardStep(step);
      setMaxTranslate(max);
      setTranslateX((t) => Math.min(t, max));
    };

    // compute on next tick (images might change sizes)
    const id = setTimeout(() => compute(), 50);

    // recompute on window resize
    window.addEventListener("resize", compute);

    // images inside cards may change layout; listen to their load
    const imgs = cardsRef.current?.querySelectorAll("img") || [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", compute, { once: true });
    });

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", compute);
      imgs.forEach((img) => img.removeEventListener("load", compute));
    };
  }, [localPets]);

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

  // Adotar: deleta o documento no Firestore e remove localmente para feedback imediato
  const handleAdotar = async (petId) => {
    if (!user) {
      // direciona para login se não estiver autenticado
      navigate("/login");
      return;
    }

    const confirmacao = window.confirm("Deseja realmente adotar este pet?");
    if (!confirmacao) return;

    try {
      // remover localmente para resposta instantânea
      setLocalPets((prev) => prev.filter((p) => (p.id || p._id) !== petId));

      // tenta remover do Firestore (o listener atualizará a lista se bem-sucedido)
      await deleteDoc(doc(db, "pets", petId));

      // fechar modal e notificar usuário
      closeModal();
      alert("Pet adotado com sucesso!");
    } catch (err) {
      console.error("Erro ao adotar:", err);
      alert("Erro ao adotar o pet. Tente novamente mais tarde.");
      // caso de erro, re-sincroniza com a fonte de verdade
      setLocalPets(pets || []);
    }
  };

  if (loading) return <p>Carregando pets...</p>;
  if (error) return <p>{error}</p>;
  if (!pets || pets.length === 0) return <p>Nenhum pet encontrado.</p>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          <i
            className={`${styles.arrowIcon} bi bi-arrow-left-circle-fill`}
            id="arrowLeft"
            role="button"
            aria-label="Anterior"
            onClick={() => {
              setTranslateX((prev) => Math.max(prev - cardStep, 0));
            }}
            style={{ opacity: translateX === 0 ? 0.35 : 1, pointerEvents: translateX === 0 ? 'none' : 'auto' }}
          ></i>
          <div
            className={styles.cardsContainer}
            ref={cardsRef}
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {(localPets || []).map((pet) => (
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
            onClick={() => {
              setTranslateX((prev) => Math.min(prev + cardStep, maxTranslate));
            }}
            style={{ opacity: translateX >= maxTranslate ? 0.35 : 1, pointerEvents: translateX >= maxTranslate ? 'none' : 'auto' }}
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
              onClick={() => handleAdotar(selectedPet.id || selectedPet._id)}
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
