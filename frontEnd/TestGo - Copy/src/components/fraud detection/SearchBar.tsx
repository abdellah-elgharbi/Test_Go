import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  autoSearch?: boolean;
  placeholder?: string;
}

const SearchBar = ({ 
  onSearch, 
  autoSearch = true, 
  placeholder = "Rechercher un étudiant..." 
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Effet pour déclencher la recherche automatiquement quand searchTerm change
  useEffect(() => {
    if (autoSearch) {
      onSearch(searchTerm);
    }
  }, [searchTerm, autoSearch, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-3 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        {!autoSearch && (
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <span className="sr-only">Rechercher</span>
            <div className="h-8 bg-primary text-white rounded px-4 flex items-center justify-center">
              Rechercher
            </div>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;