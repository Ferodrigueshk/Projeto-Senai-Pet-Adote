// ...existing code...
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFetchDocuments = (docCollection) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setDocuments([]);

    const colRef = collection(db, docCollection);

    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("[useFetchDocuments] snapshot:", docCollection, results);
        setDocuments(results);
        setLoading(false);
      },
      (err) => {
        console.error("[useFetchDocuments] error:", err);
        setError(err.message || "Erro ao buscar documentos");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [docCollection]);

  return { documents, loading, error };
};
// ...existing code...