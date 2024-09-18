export type JobItemType = {
    id: number;
    badgeLetters: string;
    company: string;
    daysAgo: number;
    relevanceScore: number;
    title: string;
}

export type ActiveJobContentType = JobItemType & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary: string;
    location: string;
    coverImgURL: string;
    companyURL: string;
}

export type ContainerType = {
    children: React.ReactNode
};

export type SidebarType = {
    children: React.ReactNode;
};

export type JobListType = {
    jobItems: JobItemType[];
    isLoading: boolean;
};

export type JobListItemType = {
    jobItem: JobItemType;
    isActive: boolean
};
export type HeaderType = {
    children: React.ReactNode;
};


export type JobItemContentType = {
    activeJobContent: ActiveJobContentType | null;
    isLoading: boolean
}

export type ResultsCountType = {
    count: number
}

export type JobItemApiResponse = {
    public: boolean,
    jobItem: ActiveJobContentType
}
export type JobItemsApiResponse = {
    public: boolean,
    sorted: boolean,
    jobItems: JobItemType[]
}

export type PaginationControlsType = {
    onClick: (direction: 'previous' | 'next') => void;
    currentPage: number,
    totalNumberOfPages: number
}

export type PaginationButtonType = Omit<PaginationControlsType, 'totalNumberOfPages'> & {
    direction: 'previous' | 'next'
}

export type SortType = 'relevant' | 'recent';
export type OrderType = 'ASC' | 'DESC';
export type SortByType = {
    sort: SortType;
    order: OrderType;
}

export type SortingControlsType = {
    sortBy: SortByType;
    handleSortBySort: (sort: SortType) => void;
    handleToggleSortByOrder: () => void;

}

export type SortingButtonType = Omit<SortingControlsType, 'handleToggleSortByOrder'> & {
    type: 'relevant' | 'recent',
}

export type HandleSortByType = {
    newSort: SortType | OrderType;
}

export type BookmarksContextType = {
    bookmarkedIds: number[];
    handleToggleBookmark: (id: number) => void;
    isLoading: boolean,
    bookmarkedJobItems: ActiveJobContentType[]
};

export type BookmarksContextProviderType = {
    children: React.ReactNode;
};
export type BookmarkIconType = {
    id: number
}
export type BookmarksPopoverType = {
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
    style?: React.HTMLAttributes<HTMLDivElement>;
}