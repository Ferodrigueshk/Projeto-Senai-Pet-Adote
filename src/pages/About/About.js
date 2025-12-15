import styles from "./About.module.css";
import cardPet from "./img/cardPet.png"
import logo0 from "./img/petLove.png";
import logo1 from "./img/logoPetz.png";
import logo2 from "./img/Cobasi.png";
import logo3 from "./img/logoAdotar.png";
import logo4 from "./img/whiskas.png";


const About = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.divulgue}>
          <h1>Quem somos</h1>
          <p>
            Somos uma turma de estudantes do Senai-SIG em que, juntamente com os professores, tivemos a oportunidade de
        expressar o amor por pets e ajudar a encontrar um lar carinhoso, já que acreditamos que todos merecem aconchego.
          </p>
        </div>

        <div className={styles.texto2}>
          <div>
            <h1>Divulgue pets para adoção</h1>
            <p>
              Utilizamos ferramentas de divulgação de pets com eficácia comprovada
          em todo o Brasil. Crie seu anúncio gratuito agora mesmo para ter
          acesso ao painel de doação.
            </p>
          </div>
          <img src={cardPet} alt="Card Pet" />
        </div>

        <div className={styles.parceiros}>
          <h1>Parceiros:</h1>
          <img src={logo0} alt="petLove" />
          <img src={logo1} alt="Petz" />
          <img src={logo2} alt="Cobasi" />
          <img src={logo3} alt="Adotar" />
          <img src={logo4} alt="Whiskas" />
        </div>
      </main>
    </div>
  );
};

export default About;
