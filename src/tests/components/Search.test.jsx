import { vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../contexts/ProductsContext";
import { MemoryRouter } from "react-router-dom";
import { SearchBar } from "../../components/Search";

describe("SearchBar", () => {
  const mockApplyFilter = vi.fn();
  const mockSearch = vi.fn();
  const mockSetSearchParams = vi.fn();

  const renderSearchBar = (searchParams = {}) => {
    return render(
      <ProductsContext.Provider
        value={{
          applyFilter: mockApplyFilter,
          search: mockSearch,
          setSearchParams: mockSetSearchParams,
          searchParams,
        }}
      >
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </ProductsContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the search input and button", () => {
    renderSearchBar();

    expect(
      screen.getByPlaceholderText(/Looking for flowers\?/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls search and setSearchParams on input change", async () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/Looking for flowers\?/i);
    await userEvent.type(input, "flowers");

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSearch).toHaveBeenCalledWith("flowers");
  });

  //todo more tests
  //time constraints
});
