import { vi } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { GiftPackages } from "../../components/GiftPackages";
import { ProductsContext } from "../../contexts/ProductsContext";

describe("GiftPackages", () => {
  const mockAddToCart = vi.fn();
  const mockCart = [];

  const renderGiftPackages = (gifts = []) => {
    return render(
      <ProductsContext.Provider
        value={{ addToCart: mockAddToCart, cart: mockCart }}
      >
        <GiftPackages gifts={gifts} />
      </ProductsContext.Provider>
    );
  };

  it("renders a message when no gifts are available", () => {
    renderGiftPackages([]);

    expect(screen.queryByText("Popular gift packages from others")).toBeNull();
  });

  it("renders gift packages when available", () => {
    const gifts = [
      {
        id: 1,
        products: JSON.stringify([
          { id: 1, name: "Gift Item 1", image: "item1.jpg" },
          { id: 2, name: "Gift Item 2", image: "item2.jpg" },
        ]),
        totalPrice: 200,
      },
      {
        id: 2,
        products: JSON.stringify([
          { id: 3, name: "Gift Item 3", image: "item3.jpg" },
          { id: 4, name: "Gift Item 4", image: "item4.jpg" },
        ]),
        totalPrice: 300,
      },
    ];

    renderGiftPackages(gifts);

    expect(
      screen.getByText("Popular gift packages from others")
    ).toBeInTheDocument();
    expect(screen.getByText("Gift Item 1")).toBeInTheDocument();
    expect(screen.getByText("Gift Item 2")).toBeInTheDocument();
    expect(screen.getByText("Gift Item 3")).toBeInTheDocument();
    expect(screen.getByText("Gift Item 4")).toBeInTheDocument();
  });

  it("calls addToCart function when order button is clicked", async () => {
    const gifts = [
      {
        id: 1,
        products: JSON.stringify([
          { id: 1, name: "Gift Item 1", image: "item1.jpg" },
        ]),
        totalPrice: 200,
      },
    ];

    renderGiftPackages(gifts);

    const orderButton = screen.getByRole("button", { name: /order/i });
    await userEvent.click(orderButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      name: "Gift Item 1",
      image: "item1.jpg",
    });
  });
});
