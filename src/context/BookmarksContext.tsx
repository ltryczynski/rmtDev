import { createContext } from "react";
import { BookmarksContextProviderType, BookmarksContextType } from "../lib/types";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { LOCALSTORAGE_BOOKMARKS_KEY } from "../lib/constants";

const defaultValue: BookmarksContextType = {
  bookmarkedIds: [],
  handleToggleBookmark: () => {},
  isLoading: false,
  bookmarkedJobItems: [],
};

export const BookmarksContext = createContext<BookmarksContextType>(defaultValue);

export function BookmarksContextProvider({ children }: BookmarksContextProviderType) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    LOCALSTORAGE_BOOKMARKS_KEY,
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const bookmarkIndex = bookmarkedIds.indexOf(id);
      if (bookmarkIndex === -1) return [...prev, id];
      else return prev.filter((bookmarkedId) => bookmarkedId !== id);
    });
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarkedIds, handleToggleBookmark, bookmarkedJobItems, isLoading }}>
      {children}
    </BookmarksContext.Provider>
  );
}