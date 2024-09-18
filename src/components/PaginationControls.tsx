import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationButtonType } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function Pagination() {
  const { currentPage, handleChangePage, totalNumberOfPages } = useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          onClick={handleChangePage}
          currentPage={currentPage}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton direction="next" onClick={handleChangePage} currentPage={currentPage} />
      )}
    </section>
  );
}

function PaginationButton({ direction, onClick, currentPage }: PaginationButtonType) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick(direction);
        e.currentTarget.blur();
      }}>
      {direction === "previous" && <ArrowLeftIcon />}
      Page {direction === "next" ? currentPage + 1 : currentPage - 1}
      {direction === "next" && <ArrowRightIcon />}
    </button>
  );
}
