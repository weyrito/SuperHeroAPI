import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const previousSearchTerm = useRef('');

  useEffect(() => {
    const search = async () => {
      if (
        searchTerm.trim().length > 0 && 
        searchTerm.trim() !== previousSearchTerm.current
      ) {
        previousSearchTerm.current = searchTerm.trim();
        await onSearch(searchTerm);
      }
    };
    
    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Rechercher un super-héro..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black    "
      />
    </div>
  );
};

export default SearchBar;