import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

 const createUser = async (data) => {
  checkIfIsCancelled();
  setLoading(true);
  setError(null);

  try {
    // 1. Cria usuário no Auth
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // 2. Atualiza nome no Auth
    await updateProfile(user, {
      displayName: data.displayName,
    });

    // 3. Salva dados extras no Firestore
    await setDoc(doc(db, "users", user.uid), {
      displayName: data.displayName,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      createdAt: new Date(),
    });

    setLoading(false);
    return user;

  } catch (error) {
    console.log(error.message);

    let systemErrorMessage;

    if (error.message.includes("Password")) {
      systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
    } else if (error.message.includes("email-already")) {
      systemErrorMessage = "E-mail já cadastrado.";
    } else {
      systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
    }

    setError(systemErrorMessage);
    setLoading(false);
  }
};


  const login = async (data) => {
    checkIfIsCancelled();

    
    setLoading(true);
    setError(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};
