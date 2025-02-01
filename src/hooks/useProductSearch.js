import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// TODO: Exercice 3.2 - Créer le hook useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key", key, error);
    }
  };

  return [storedValue, setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
  };
};

export default useProductSearch;
