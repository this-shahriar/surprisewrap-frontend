import { vi } from "vitest";
import "@testing-library/jest-dom";
import { ProductMan } from "../../components/ProductMan";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { MemoryRouter } from "react-router-dom";

describe("ProductMan", () => {
  const mockGetProducts = vi.fn();
  const mockSetCreateProductModal = vi.fn();
  const mockDeleteProduct = vi.fn();
  const mockCreateProduct = vi.fn();
  const mockUpdateProduct = vi.fn();

  const renderProductMan = (products = [], createProductModal = false) => {
    return render(
      <ProductsContext.Provider
        value={{
          getProducts: mockGetProducts,
          products,
          setCreateProductModal: mockSetCreateProductModal,
          deleteProduct: mockDeleteProduct,
          createProduct: mockCreateProduct,
          updateProduct: mockUpdateProduct,
          createProductModal,
        }}
      >
        <MemoryRouter>
          <ProductMan />
        </MemoryRouter>
      </ProductsContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the product management panel header", () => {
    renderProductMan();

    expect(screen.getByText(/Products managment panel/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add new/i })
    ).toBeInTheDocument();
  });

  it("calls getProducts on component mount", () => {
    renderProductMan();

    expect(mockGetProducts).toHaveBeenCalled();
  });

  it("displays a list of products", () => {
    const products = [
      {
        id: 1,
        name: "Product 1",
        price: "100",
        currency: "kr",
        searchKey: "product1",
        image: "url1",
      },
      {
        id: 2,
        name: "Product 2",
        price: "200",
        currency: "kr",
        searchKey: "product2",
        image: "url2",
      },
    ];
    renderProductMan(products);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("opens the modal for adding a new product", async () => {
    renderProductMan();

    const addButton = screen.getByRole("button", { name: /add new/i });
    await userEvent.click(addButton);

    expect(mockSetCreateProductModal).toHaveBeenCalledWith(true);
  });

  it("calls deleteProduct when delete icon is clicked", async () => {
    const products = [
      {
        id: 1,
        name: "Product 1",
        price: "100",
        currency: "kr",
        searchKey: "product1",
        image: "url1",
      },
    ];
    renderProductMan(products);

    const deleteButton = screen.getByTestId("delete-product");
    await userEvent.click(deleteButton);

    expect(mockDeleteProduct).toHaveBeenCalledWith({ id: 1 });
  });
});
