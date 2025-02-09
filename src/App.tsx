import { useState } from 'react'
import './App.css'
import { addToCart, getCartState, removeFromCart } from './service';
import productImages from "./assets/product-images";
import { Modal } from "antd";

function App() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartState, setCartState] = useState(getCartState()); 
  const { cartItems, subtotal, tax, total } = cartState; 
  const products = ["cheerios", "cornflakes", "frosties", "shreddies", "weetabix"];

  const handleAddToCart = async (product: string) => {
    try {
        const currentQuantity = cart[product] || 0; 
        await addToCart(product,  1); 
        setCart({ ...cart, [product]: currentQuantity + 1 }); 
    } catch (err) {
        console.error(err);
    }
};

const handleRemoveFromCart = (product: string) => {
  const currentQuantity = cart[product] || 0;
  if (currentQuantity > 0) {
      removeFromCart(product, 1);
      setCart({ ...cart, [product]: currentQuantity - 1 });
  }
};

const fetchCart = () => {
  setCartState(getCartState()); 
  setIsModalOpen(true);
};

  return (
    <>
      <p style={{ fontSize: "40px", fontWeight: "700" }}>
        Add anything you want
      </p>
      <div className='container'>
        {products.map((product) => (
          <div key={product} className="product-container">
            <img src={productImages[product]} alt={product} className="product-image" height="200px" width="200px"/>
            {product}
            <div className='container'>
              {!cart[product]? (
                <div>
                  <button className='add-button' onClick={() => handleAddToCart(product)}>
                    Add
                  </button>
                </div>
              ) : (
                <div className='container'>
                  <button className='sign-buttons' onClick={() => handleRemoveFromCart(product)}>-</button>
                  {cart[product]}
                  <button className='sign-buttons' onClick={() => handleAddToCart(product)}>+</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className='cart-status-button' onClick={() => fetchCart()}>Go to Cart</button>

      <Modal
        title="Your Cart"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product}>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p><strong>Tax (12.5%):</strong> ${tax.toFixed(2)}</p>
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default App
