import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.module.css";
import logoPet from "../img/logoPet.png";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  return (
    <header>
      <nav>
        <img src={logoPet} alt="Logo Pet" />

        <NavLink to="/Home">Home</NavLink>

        <NavLink to="/Adocao">Adotar</NavLink>

        <NavLink to={user ? "/CadastrarPet" : "/login"}>Cadastrar pet</NavLink>

        <NavLink to="/about">Sobre</NavLink>
      </nav>

      <div className="end">
        {!user && (
          <button onClick={() => navigate("/login")}>
            Login / Cadastre-se
          </button>
        )}
      </div>

      {user && (
        <>
          <span>Olá, {user.displayName} ! 👋</span>
          <button onClick={logout}>Sair</button>
        </>
      )}
    </header>
  );
};

export default Header;
