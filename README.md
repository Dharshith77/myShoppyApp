# myShoppy

myShoppy is a mobile-first e-commerce application developed using React Native and Expo. The application allows users to browse household products, search and filter products, view product details, manage a shopping cart, and complete a simple checkout process.

The project was developed as part of an application development on clean UI, reusable components, modular architecture, and state management.

---

## Features

- Product catalog
- Featured categories
- Category browsing
- Product search with live suggestions
- Product filtering
- Product details screen
- Shopping cart
- Quantity management
- Remove items from cart
- Checkout flow
- Order confirmation
- Form validation
- Responsive mobile interface
- Loading and empty state handling

---

## Technology Stack

- React Native
- Expo SDK 54
- TypeScript
- React Navigation
- Context API
- Axios
- DummyJSON API

---

## Project Structure

```
src
│
├── components
├── context
├── data
├── navigation
├── screens
├── services
├── styles
├── types
└── utils
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate

```bash
cd myShoppy
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npx expo start
```

### Android

```bash
npx expo run:android
```

or

```bash
eas build -p android --profile preview
```

---

## Application Flow

```
Home
   │
   ├── Featured Categories
   │
   ├── Search Products
   │
   ▼
Products
   │
   ▼
Product Details
   │
   ▼
Add To Cart
   │
   ▼
Cart
   │
   ▼
Checkout
   │
   ▼
Order Success
```

---

## API

Product information is retrieved from the DummyJSON API.

https://dummyjson.com

The application fetches

- Products
- Categories
- Search results

---

## Validation

The application validates

- Required fields
- Phone number
- Pincode
- Quantity updates
- Empty cart
- Empty search
- Invalid checkout fields

---

## Future Enhancements

- User Authentication
- Order History
- Inventory Management
- Payment Gateway
- Wishlist
- Push Notifications
- Product Reviews

---

## Author

Developed by Dharshith Erra.
