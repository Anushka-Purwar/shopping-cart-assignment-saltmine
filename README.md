### Shopping Cart Application
This project implements a shopping cart system with features such as adding/removing items, updating quantities, and calculating subtotals, taxes, and total costs. It is built using React, TypeScript, and Jest for testing. The cart interacts with an external API to fetch product prices and updates the cart state accordingly.

# Features
-  **Add to Cart** : Users can add products to the cart, specifying the quantity.
- **Remove from Cart** : Users can remove items from the cart by reducing the quantity or completely removing the item.
- **Quantity Update** : Users can increase or decrease the quantity of an item in the cart.
- **Subtotal, Tax, and Total Calculation** : The cart automatically calculates the subtotal (price * quantity), tax (based on a 12.5% tax rate), and total (subtotal + tax).

# Assumptions
- **Price API** : The price of products is fetched from an external API. This API returns the price for each product when queried by its name. For testing purposes, this API is mocked using Jest.
- **Tax Rate** : A fixed tax rate of 12.5% is applied to the cart's subtotal.
- **Cart Persistence** : The cart is temporarily stored in memory during the session. Once the page is refreshed, the cart state is reset.

# Tradeoffs
- **State Management** : The cart state is managed using simple local component state and is not persisted across page reloads. A more robust solution could involve using something like Redux or Context API for state management and local storage for persistence.
- **API Mocking** : For testing purposes, the external API for fetching product prices is mocked. In a production system, this would need to be a live API integration.
- **UI/UX** : The user interface is minimalistic and functional but could be enhanced with additional UI/UX features such as animations, cart item previews, or a more responsive layout for various screen sizes.

## Setup Instructions


# Clone the Repository
`git clone` -- repo link

`cd shopping-cart-assignment`

# Install Dependencies

`npm install` or `yarn install`

# Running the Application

- Running Price API `npm run serve-products`
- Running project `npm run dev`
- Running JEST `npm jest`

## How to Test

- **Add to Cart** : Click the "Add" button for any product to add it to the cart. Ensure that the cart updates with the correct product, quantity, and price.
- **Update Quantity** : Use the plus (+) and minus (-) buttons to update the quantity of a product in the cart. Verify that the subtotal and total update accordingly.
- **Remove from Cart** : Click the minus button to reduce the quantity or remove the product completely when the quantity reaches 0. Ensure the cart reflects these changes.
- **Price Calculation** : Add multiple products with different quantities and verify that the subtotal, tax (12.5%), and total are calculated correctly.


## Known Issues

- **Price API Mock** : The price API is mocked in the tests, but in a live environment, it would need to be integrated with a real backend.
- **Cart Persistence** : The cart is not persisted across page reloads. This could be addressed by integrating with local storage or a database.

## Future Improvements

- Implement global state management (e.g., using Redux or Context API) to manage the cart state across the entire application.
- Persist cart items using localStorage or sessionStorage so that the cart is saved across page reloads.
- Implement user authentication for personalized cart management and order tracking.
- Enhance UI with a more responsive design, animations, and better cart management features like editing the quantity directly in the cart.


