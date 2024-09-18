import { Toaster } from "react-hot-toast";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import Pagination from "./PaginationControls";
import JobListSearch from "./JobListSearch";

export default function App() {
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobListSearch />
          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Toaster position="top-right" reverseOrder={false} />

      <Footer />
    </>
  );
}
