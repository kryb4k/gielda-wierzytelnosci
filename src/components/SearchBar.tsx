import React, {useState} from 'react';
import styles from '../styles/SearchBar.module.less';
import {LoadingSpinner} from './LoadingSpinner.tsx';
import {MESSAGES} from '../constants/messages.ts';

interface SearchBarProps {
    onSearch: (query: string) => void;
    loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch, loading}) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className={styles.search__container}>
            <label className={styles.search__label}>
                {MESSAGES.SEARCH_BAR.FILL_SEARCH_QUERY}
            </label>
            <div className={styles.search__bar}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.search__input}
                />
                <button
                    onClick={handleSearch}
                    className={styles.search__button}
                    disabled={loading}
                >
                    {loading ? <LoadingSpinner size="small"/> : MESSAGES.SEARCH_BAR.SEARCH}
                </button>
            </div>
        </div>
    );
};
