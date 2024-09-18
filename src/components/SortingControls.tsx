import { useJobItemsContext } from "../lib/hooks";
import { SortingButtonType } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleSortBySort, handleToggleSortByOrder, jobItemsCount } = useJobItemsContext();

  return (
    !!jobItemsCount && (
      <section className="sorting">
        <i
          className={`fa-solid fa-arrow-${sortBy.order === "ASC" ? "down" : "up"}-short-wide`}
          onClick={handleToggleSortByOrder}></i>

        <SortingButton type="relevant" sortBy={sortBy} handleSortBySort={handleSortBySort} />
        <SortingButton type="recent" sortBy={sortBy} handleSortBySort={handleSortBySort} />
      </section>
    )
  );
}

function SortingButton({ type, handleSortBySort, sortBy }: SortingButtonType) {
  return (
    <button
      className={`sorting__button sorting__button--${type} ${
        sortBy.sort === type && "sorting__button--active"
      }`}
      onClick={() => {
        handleSortBySort(type);
      }}>
      {type}
    </button>
  );
}
