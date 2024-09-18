import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchContext, useSearchQuery } from "../lib/hooks";
import { JobItemType, SortByType, SortType } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContextType = {
  jobItems: JobItemType[] | undefined;
  jobItemsSortedAndSliced: JobItemType[];
  isLoading: boolean;
  jobItemsCount: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortByType;
  handleChangePage: (direction: "next" | "previous") => void;
  handleSortBySort: (sort: SortType) => void;
  handleToggleSortByOrder: () => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
  const { debouncedInputText } = useSearchContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedInputText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByType>({ sort: "relevant", order: "ASC" });

  // derived / computed state
  const sortedJobItems = useMemo(
    () =>
      [...(jobItems || [])].sort((a: JobItemType, b: JobItemType) => {
        switch (sortBy.sort) {
          case "relevant": {
            const compare = b.relevanceScore - a.relevanceScore;
            return sortBy.order === "ASC" ? compare : -compare;
          }
          case "recent": {
            const compare = a.daysAgo - b.daysAgo;
            return sortBy.order === "ASC" ? compare : -compare;
          }
        }
      }),
    [sortBy.sort, sortBy.order, jobItems]
  );
  const jobItemsSortedAndSliced = useMemo(
    () =>
      sortedJobItems?.slice(
        RESULTS_PER_PAGE * currentPage - RESULTS_PER_PAGE,
        RESULTS_PER_PAGE * currentPage
      ) || [],
    [sortedJobItems, currentPage]
  );
  const jobItemsCount = jobItems?.length || 0;
  const totalNumberOfPages = jobItemsCount / RESULTS_PER_PAGE;

  // event handlers / actions
  const handleChangePage = useCallback((direction: "next" | "previous") => {
    if (direction === "next") setCurrentPage((prev) => prev + 1);
    else if (direction === "previous") setCurrentPage((prev) => prev - 1);
  }, []);

  const handleSortBySort = useCallback(
    (sort: SortType) => {
      setSortBy({ ...sortBy, sort });
      setCurrentPage(1);
    },
    [sortBy]
  );
  const handleToggleSortByOrder = useCallback(() => {
    setSortBy({ ...sortBy, order: sortBy.order === "ASC" ? "DESC" : "ASC" });
    setCurrentPage(1);
  }, [sortBy]);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      jobItemsCount,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleSortBySort,
      handleToggleSortByOrder,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      jobItemsCount,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleSortBySort,
      handleToggleSortByOrder,
    ]
  );

  return <JobItemsContext.Provider value={contextValue}>{children}</JobItemsContext.Provider>;
}
