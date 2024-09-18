import { useContext, useEffect, useState } from "react";
import { JobItemApiResponse, JobItemsApiResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../context/BookmarksContext";
import { ActiveIdContext } from "../context/ActiveIdContext";
import { SearchContext } from "../context/SearchTextContext";
import { JobItemsContext } from "../context/JobItemsContext";


const fetchJobItems = async (inputText: string): Promise<JobItemsApiResponse> => {
    const res = await fetch(`${BASE_API_URL}?search=${inputText}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.description);
    }
    const data = await res.json();
    return data;
}

export function useSearchQuery(inputText: string | null) {
    const { data, isInitialLoading } = useQuery(
        ['job-items', inputText],
        () => inputText ? fetchJobItems(inputText) : null,
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!inputText,
            onError: handleError
        }
    );
    return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}

export function useJobItems(ids: number[]) {
    const results = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: () => fetchJobItem(id),
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!id,
            onError: handleError
        }))
    })

    const jobItems = results.map(result => result.data?.jobItem).filter(jobItem => jobItem !== undefined)
    const isLoading = results.some(result => result.isLoading)

    return { jobItems, isLoading }
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
    const res = await fetch(`${BASE_API_URL}/${id}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.description);
    }
    const data = await res.json();
    return data;
}

export function useJobItem(id: number | null) {
    const { data, isInitialLoading } = useQuery(
        ['job-item', id],
        () => id ? fetchJobItem(id) : null,
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!id,
            onError: handleError
        })
    const activeJobContent = data?.jobItem
    return { activeJobContent, isLoading: isInitialLoading } as const;

}

export function useActiveJobContent() {
    const activeId = useActiveId();
    const { activeJobContent, isLoading } = useJobItem(activeId);
    return { activeJobContent, isLoading } as const;
}

export function useDebounce<T>(value: T, delay?: number): T {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay || 500);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])

    return debounceValue;
}

export function useActiveId() {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            setActiveId(+window.location.hash.slice(1));
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return activeId;
}

export function useBookmarksContext() {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error("useBookmarksContext must be used within a BookmarksContextProvider");
    }
    return context;
}

export function useActiveIdContext() {
    const context = useContext(ActiveIdContext);
    if (!context) {
        throw new Error("ActiveIdContext must be used within a ActiveIdContextProvider");
    }
    return context;
}


export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState(() =>
        JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue] as const;
}

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('SearchContext must be used within a SearchContextProvider')
    }
    return context;
}
export function useJobItemsContext() {
    const context = useContext(JobItemsContext);
    if (!context) {
        throw new Error('JobItemsContext must be used within a JobItemsContextProvider')
    }
    return context;
}




export function UseOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void) {
    useEffect(() => {
        const closePopover = (e: MouseEvent) => {
            if (
                e.target instanceof HTMLElement &&
                refs.every(ref => !ref.current?.contains(e.target as Node))
            ) {
                handler();
            }
        };
        document.addEventListener("click", closePopover);
        return () => {
            document.removeEventListener("click", closePopover);
        };
    }, [refs, handler]);
}