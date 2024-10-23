import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Order } from "../../components/Order";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { OrdersContext } from "../../contexts/OrdersContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { MemoryRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

describe("Order", () => {
  const mockCreateOrder = vi.fn();
  const mockCreateGift = vi.fn();

  const renderOrder = (cartItems = [], user = {}, edit = {}) => {
    return render(
      <AuthContext.Provider value={{ user }}>
        <OrdersContext.Provider value={{ createOrder: mockCreateOrder }}>
          <ProductsContext.Provider
            value={{ cart: cartItems, createGift: mockCreateGift }}
          >
            <MemoryRouter>
              <Order edit={edit} />
            </MemoryRouter>
          </ProductsContext.Provider>
        </OrdersContext.Provider>
      </AuthContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders total price correctly when cart is empty", () => {
    renderOrder([]);

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("0kr")).toBeInTheDocument();
  });

  it("renders total price correctly when items are in the cart", () => {
    const cartItems = [
      { id: 1, name: "Product 1", price: "100" },
      { id: 2, name: "Product 2", price: "200" },
    ];
    renderOrder(cartItems);

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("300kr")).toBeInTheDocument();
  });

  it("calls createOrder and createGift when the form is submitted", async () => {
    const cartItems = [
      { id: 1, name: "Product 1", price: "100" },
      { id: 2, name: "Product 2", price: "200" },
    ];
    const user = { userId: "123" };
    renderOrder(cartItems, user);

    const addressInput = screen.getByPlaceholderText("Address");
    await userEvent.type(addressInput, "123 Test St");

    const saveGiftCheckbox = screen.getByLabelText(
      /save this gift for others/i
    );
    await userEvent.click(saveGiftCheckbox);

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    await userEvent.click(confirmButton);

    expect(mockCreateOrder).toHaveBeenCalledWith({
      delivery_address: "123 Test St",
      status: "ordered",
      totalPrice: 300,
      products: JSON.stringify(cartItems),
      userId: user.userId,
    });

    expect(mockCreateGift).toHaveBeenCalledWith({
      delivery_address: "123 Test St",
      quantity: 2,
      status: "active",
      totalPrice: 300,
      products: JSON.stringify(cartItems),
      userId: user.userId,
    });
  });

  it("disables confirm button when cart is empty", () => {
    renderOrder([]);

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  it("enables confirm button when items are in the cart", () => {
    const cartItems = [{ id: 1, name: "Product 1", price: "100" }];
    renderOrder(cartItems);

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeEnabled();
  });
});
