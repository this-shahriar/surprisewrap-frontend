import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Header } from "../../components/Header";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

describe("Header", () => {
  const mockLogout = vi.fn();
  const mockSetAuthModal = vi.fn();
  const mockSetCartModal = vi.fn();

  const renderHeader = (isLoggedIn = false, cartItems = []) => {
    return render(
      <AuthContext.Provider
        value={{
          setAuthModal: mockSetAuthModal,
          isLoggedIn,
          logout: mockLogout,
        }}
      >
        <ProductsContext.Provider
          value={{ cart: cartItems, setCartModal: mockSetCartModal }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </ProductsContext.Provider>
      </AuthContext.Provider>
    );
  };

  it("renders login button when user is not logged in", () => {
    renderHeader();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("renders orders and logout buttons when user is logged in", () => {
    renderHeader(true);

    expect(screen.getByRole("button", { name: /orders/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", async () => {
    renderHeader(true);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await userEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it("opens cart modal when View Cart button is clicked", async () => {
    const cartItems = [{ id: 1, name: "Product 1", image: "product1.jpg" }];
    renderHeader(true, cartItems);

    const viewCartButton = screen.getByRole("button", { name: /view cart/i });
    await userEvent.click(viewCartButton);

    expect(mockSetCartModal).toHaveBeenCalledWith(true);
  });

  it("renders avatars for items in the cart", () => {
    const cartItems = [
      { id: 1, name: "Product 1", image: "product1.jpg" },
      { id: 2, name: "Product 2", image: "product2.jpg" },
    ];
    renderHeader(true, cartItems);

    expect(screen.getAllByRole("img", { name: "Product 1" })).toHaveLength(1);
    expect(screen.getAllByRole("img", { name: "Product 2" })).toHaveLength(1);
  });
});
