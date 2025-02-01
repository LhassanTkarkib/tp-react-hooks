import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';

const ProductSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { isDarkTheme } = useContext(ThemeContext);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    // TODO: Exercice 2.1 - Utiliser le LanguageContext

    // TODO: Exercice 1.2 - Utiliser le hook useDebounce
    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Rechercher un produit..."
                className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
            />
        </div>
    );
};

export default ProductSearch;
