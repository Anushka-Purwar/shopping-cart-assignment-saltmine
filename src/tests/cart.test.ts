import { addToCart, removeFromCart, getCartState, cartItems } from "../service";
import axios from "axios";

jest.mock("axios");

describe("Shopping Cart", () => {
  beforeEach(() => {
    // Reset cartItems before each test
    jest.resetAllMocks();
    // Clear the cart state
    cartItems.length = 0;
  });

  test("addToCart should add a product to the cart", async () => {
    // Arrange
    const product = "Product A";
    const quantity = 2;
    const price = 10;

    const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;

    // Mock the axios response to return the expected data
    mockGet.mockResolvedValue({
      data: { price },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        url: "",
      },
    });

    // Act
    await addToCart(product, quantity);

    // Assert
    const cartState = getCartState();
    expect(cartState.cartItems.length).toBe(1);
    expect(cartState.cartItems[0].product).toBe(product);
    expect(cartState.cartItems[0].quantity).toBe(quantity);
    expect(cartState.cartItems[0].price).toBe(price);
  });

  test("addToCart should update quantity if product is already in cart", async () => {
    // Arrange
    const product = "Product A";
    const initialQuantity = 1;
    const quantityToAdd = 3;

    (axios.get as jest.Mock).mockResolvedValue({ data: { price: 10 } });

    // First add the product with initial quantity
    await addToCart(product, initialQuantity);
    // Act: Add more of the same product
    await addToCart(product, quantityToAdd);

    // Assert
    const cartItem = getCartState().cartItems[0];
    expect(cartItem.quantity).toBe(initialQuantity + quantityToAdd);
  });

  test("removeFromCart should remove a product from the cart", async () => {
    // Arrange
    const product = "Product A";
    const quantity = 2;
    const price = 10;
    (axios.get as jest.Mock).mockResolvedValue({ data: { price } });

    // Add item to cart
    await addToCart(product, quantity);

    // Act: Remove one product
    removeFromCart(product, 1);

    // Assert
    const cartState = getCartState();
    expect(cartState.cartItems[0].quantity).toBe(1);
  });

  test("removeFromCart should remove the product completely if quantity reaches 0", async () => {
    // Arrange
    const product = "Product A";
    const quantity = 1;
    const price = 10;
    (axios.get as jest.Mock).mockResolvedValue({ data: { price } });

    // Add item to cart
    await addToCart(product, quantity);

    // Act: Remove the product completely
    removeFromCart(product);

    // Assert
    const cartState = getCartState();
    expect(cartState.cartItems.length).toBe(0);
  });

  test("getCartState should calculate subtotal, tax, and total correctly", async () => {
    // Arrange
    const product1 = "Product A";
    const quantity1 = 2;
    const price1 = 10;
    const product2 = "Product B";
    const quantity2 = 1;
    const price2 = 20;

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: { price: price1 } })
      .mockResolvedValueOnce({ data: { price: price2 } });

    // Add products to cart
    await addToCart(product1, quantity1);
    await addToCart(product2, quantity2);

    // Act
    const cartState = getCartState();

    // Assert
    expect(cartState.subtotal).toBe(40); // (10*2) + (20*1)
    expect(cartState.tax).toBe(5); // 40 * 0.125
    expect(cartState.total).toBe(45); // 40 + 5
  });
});
