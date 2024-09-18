import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookmarksContextProvider } from "./context/BookmarksContext.tsx";
import { ActiveIdContextProvider } from "./context/ActiveIdContext.tsx";
import { SearchContextProvider } from "./context/SearchTextContext.tsx";
import { JobItemsContextProvider } from "./context/JobItemsContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveIdContextProvider>
          <SearchContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchContextProvider>
        </ActiveIdContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
