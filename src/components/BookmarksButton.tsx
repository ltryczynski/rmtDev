import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { UseOnClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  UseOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        className="bookmarks-btn"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}>
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
