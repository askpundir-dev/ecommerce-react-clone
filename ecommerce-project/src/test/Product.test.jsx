import React from "react";
vi.mock("../utils/addToCart", () => ({
  default: ({ setCart }) => {
    setCart([]);
    return true;
  }
}));
vi.mock("../utils/addToCart", () => ({
  default: vi.fn(() => true)
}));
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "../pages/Home/Product";
import { CartContext } from "../context-provider/Context";

//This is a integration test for the Product component
describe("Product Component", () => {
  const products = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    },
  ];
  const product = products[0];
  const cartContextValue = {
    setCart: vi.fn(),
    loadFetchedCart: vi.fn(),
  };

  it("displays the product details correctly", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <Product product={product} products={products} />
      </CartContext.Provider>
    );
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: product.name })).toHaveAttribute("src", product.image);
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(screen.getByText(/\$10\.90/)).toBeInTheDocument();
  });

  it("can change quantity and add to cart", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <Product product={product} products={products} />
      </CartContext.Provider>
    );
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });
    expect(select.value).toBe("2");

    const button = screen.getByText("Add to Cart");
    await fireEvent.click(button);
    expect(cartContextValue.setCart).toHaveBeenCalled();
    // The "Added" message should be visible (opacity: 1)
    const addedMsg = await screen.findByText("Added");
    expect(addedMsg).toBeInTheDocument();
    // Optionally check style
    // expect(addedMsg).toHaveStyle({ opacity: 1 });
  });
});
