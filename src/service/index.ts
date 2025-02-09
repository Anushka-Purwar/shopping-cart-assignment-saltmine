import axios from "axios";

const PRICE_API_BASE_URL = "http://localhost:3001/products";

interface CartItem {
    product: string;
    quantity: number;
    price: number;
}

interface ProductPriceResponse {
    price: number;
}

export const cartItems: CartItem[] = [];
const TAX_RATE = 0.125;  // tax rate at 12.5%

const getProductPrice = async (productName: string): Promise<number> => {  // not exported to ensure not to expose api directly
    try {
        const response = await axios.get<ProductPriceResponse>(`${PRICE_API_BASE_URL}/${productName}`);  // better way -> get URL form env
        return response.data.price;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching product price");
    }
};

export const addToCart = async (product: string, quantity: number) => {
  try {
    const price = await getProductPrice(product); 
    const existingItem = cartItems.find((item) => item.product === product);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity, price });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching product price");
  }
};

export const removeFromCart = (product: string, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity -= quantity;
        if (existingItem.quantity <= 0) {
            const index = cartItems.indexOf(existingItem);
            cartItems.splice(index, 1);
        }
    }
};

export const getCartState = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    return { cartItems, subtotal, tax, total };
};
