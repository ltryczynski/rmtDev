import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";
import { BookmarkIconType } from "../lib/types";

export default function BookmarkIcon({ id }: BookmarkIconType) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarksContext();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        e.preventDefault();
        handleToggleBookmark(id);
        e.stopPropagation();
      }}>
      <BookmarkFilledIcon className={`${bookmarkedIds.includes(id) && "filled"}`} />
    </button>
  );
}
