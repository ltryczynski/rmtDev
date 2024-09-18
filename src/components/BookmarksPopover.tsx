import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks";
import { BookmarksPopoverType } from "../lib/types";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverType>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
