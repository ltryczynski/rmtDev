import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchContextType = {
  inputText: string;
  handleChangeSearch: (newText: string) => void;
  debouncedInputText: string;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText);

  const handleChangeSearch = (newText: string) => {
    setInputText(newText);
  };

  return (
    <SearchContext.Provider value={{ inputText, handleChangeSearch, debouncedInputText }}>
      {children}
    </SearchContext.Provider>
  );
}
