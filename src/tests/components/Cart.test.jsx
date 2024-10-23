import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Cart } from "../../components/Cart";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { BrowserRouter } from "react-router-dom";

describe("Cart", () => {
  const mockRemoveFromCart = vi.fn();

  const renderCart = (cartItems = []) => {
    return render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{ cart: cartItems, removeFromCart: mockRemoveFromCart }}
        >
          <Cart />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
  };

  it("renders empty cart message when no items are in the cart", () => {
    renderCart();

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders products in the cart", () => {
    const cartItems = [
      { id: 1, name: "Product 1", image: "product1.jpg" },
      { id: 2, name: "Product 2", image: "product2.jpg" },
    ];

    renderCart(cartItems);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("calls removeFromCart function when remove button is clicked", async () => {
    const cartItems = [{ id: 1, name: "Product 1", image: "product1.jpg" }];
    renderCart(cartItems);

    const deleteButton = screen.getByRole("button", { name: /remove/i });
    await userEvent.click(deleteButton);

    expect(mockRemoveFromCart).toHaveBeenCalled();
  });
});
