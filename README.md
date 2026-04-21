# 🛒 MarketPlace MVP - Online Shopping Platform

A complete, production-ready MVP for an online marketplace with cart functionality and WhatsApp checkout integration.

## ✨ Features

✅ **Product Listing** - Browse all products with images and prices
✅ **Product Search** - Filter products by name in real-time
✅ **Product Details** - View full product information
✅ **Shopping Cart** - Add/remove items and adjust quantities
✅ **WhatsApp Checkout** - Send orders directly via WhatsApp
✅ **Persistent Cart** - Cart saved in localStorage
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Modern UI** - Built with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Next.js (React framework)
- **Backend**: Express.js (Node.js)
- **Database**: Firebase Firestore
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js v14 or higher
- npm or yarn
- Firebase account
- WhatsApp account

## 🚀 Quick Start

### 1. Clone or Download
```bash
cd marketplace-app
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm run dev
```

### 3. Frontend Setup (new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with API URL and WhatsApp phone
npm run dev
```

### 4. Open Browser
```
http://localhost:3000
```

📖 **Detailed setup instructions** in [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
marketplace-app/
├── frontend/           # Next.js React app
│   ├── pages/         # Routes and pages
│   ├── components/    # Reusable components
│   ├── store/         # Zustand state management
│   ├── lib/           # API and utilities
│   └── styles/        # CSS and Tailwind config
│
├── backend/           # Express API server
│   ├── routes/        # API endpoints
│   ├── firebase.js    # Firebase config
│   └── index.js       # Server entry
│
└── SETUP.md          # Detailed setup guide
```

## 🎯 Core Features

### Home Page
- Display all products from Firestore
- Search bar to filter products
- Product cards with add to cart button
- Loading and error states

### Product Detail Page
- Full product information
- Product image
- Price and description
- Quantity selector
- Add to cart button

### Cart Page
- List all cart items
- Adjust quantities
- Remove items
- Cart summary with total
- Checkout button

### WhatsApp Checkout
- Generate formatted message
- Include all items and prices
- Redirect to WhatsApp
- Auto-clear cart after checkout

## 🔌 API Endpoints

```
GET  /api/products        # Get all products
GET  /api/products/:id    # Get single product
GET  /api/health          # Health check
```

## 💾 Database Structure

### Firestore Collection: `products`
```json
{
  "id": "product_1",
  "name": "Sepatu Sneakers",
  "price": 250000,
  "description": "Sepatu sneakers berkualitas tinggi",
  "image": "https://...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 🎨 UI/UX Highlights

- Clean and modern design
- Intuitive navigation
- Real-time cart updates
- Responsive layout
- Loading states
- Error handling
- Success messages

## 🧠 State Management

Using **Zustand** for simple, efficient state management:
- `addToCart()` - Add product to cart
- `removeFromCart()` - Remove product
- `updateQuantity()` - Change item quantity
- `clearCart()` - Empty entire cart
- `getTotal()` - Calculate total price
- `getCartCount()` - Get number of items

All cart data persists in localStorage.

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for sensitive data
- Firestore rules should restrict write access
- Validate all inputs on backend

## 🐛 Troubleshooting

**Products not showing?**
- Verify Firestore collection exists
- Check Firebase credentials
- Open console for errors

**Cart not working?**
- Clear browser cache
- Check localStorage is enabled
- Verify Zustand is installed

**WhatsApp not opening?**
- Check phone number format
- Ensure WhatsApp is installed
- Try with different browser

## 🚀 Production Deployment

### Frontend (Vercel - Recommended)
```bash
npm run build
vercel deploy
```

### Backend (Heroku/Railway)
```bash
# Deploy to your chosen platform
# Set environment variables
# Update API URL in frontend
```

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Feel free to fork and customize this MVP for your needs!

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 💬 Support

For issues or questions, check the [SETUP.md](./SETUP.md) guide or review the code comments.

---

**Built with ❤️ as a complete MVP solution**
