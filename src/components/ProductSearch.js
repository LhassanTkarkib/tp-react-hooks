import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';

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

const ProductSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { isDarkTheme } = useContext(ThemeContext);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, onSearch]);

    // TODO: Exercice 2.1 - Utiliser le LanguageContext

    // TODO: Exercice 1.2 - Utiliser le hook useDebounce
    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un produit..."
                className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
            />
        </div>
    );
};

export default ProductSearch;
