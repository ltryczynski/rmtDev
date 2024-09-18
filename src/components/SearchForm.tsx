import { useSearchContext } from "../lib/hooks";

export default function SearchForm() {
  const { inputText, handleChangeSearch } = useSearchContext();
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearch(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputText);
  };

  return (
    <form action="#" className="search" onSubmit={handleFormSubmit}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        onChange={handleChangeInput}
        value={inputText}
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
