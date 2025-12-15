import styles from "./Home.module.css";
import petAdote from "./img/petAdote.png";
import imgCasa from "./img/img-casa.png";

const Home = () => {
  return (
    <section>
      <div className={styles.imgs}>
        <img src={petAdote} alt="Pet para adoção" />
        <img src={imgCasa} alt="Casa" />
      </div>

      <div className={styles.textos}>
        <h1>Adotar é transformar vidas!</h1>
        <p>
          Quando você adota, não está <br /> apenas levando um pet para casa
        </p>
        <br />

        <p>
          Você está oferecendo uma segunda chance, salvando vidas e ajudando no
          combate ao abandono. <br />
          Cada animal tem uma história, uma personalidade única e um desejo de
          fazer parte da sua.
        </p>

        <h1>Conheça os pets disponíveis!</h1>
        <p>
          Explore nosso site para encontrar o companheiro perfeito para você.{" "}
          <br />
          Temos cães e gatos de todas as idades, tamanhos e personalidades,
          todos esperando por um lar amoroso.
        </p>
      </div>
    </section>
  );
};

export default Home;
