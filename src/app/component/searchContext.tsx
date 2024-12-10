'use client';
import { createContext, useContext, useState, ReactNode, FormEvent } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// Tạo 1 context để chứa giá trị của từ khóa tìm kiếm
interface SearchContextType {
    keyword: string;
    setKeyword: (keyword: string) => void;
}

const SearchContext = createContext<SearchContextType>({
    keyword: '',
    setKeyword: () => {},
});

// Tạo 1 provider để cung cấp giá trị cho context
const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [keyword, setKeyword] = useState('');

    return (
        // Truyền giá trị và hàm cập nhật giá trị cho context
        <SearchContext.Provider value={{ keyword, setKeyword }}>
            {children}
        </SearchContext.Provider>
    );
};

// Component sử dụng SearchContext
const SearchForm = () => {
    const { keyword, setKeyword } = useContext(SearchContext);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        // Handle search functionality or navigation here
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Tìm kiếm..."
                required
            />
            <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span className="sr-only">Tìm kiếm</span>
            </button>
        </form>
    );
};

// Export context và provider
export { SearchContext, SearchProvider, SearchForm };
