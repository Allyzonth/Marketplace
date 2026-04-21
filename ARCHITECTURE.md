# 🏗️ MarketPlace MVP - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  ┌──────────────┬──────────────────┬──────────────┬────────────┐ │
│  │   Pages      │   Components     │   Store      │   Utils    │ │
│  ├──────────────┼──────────────────┼──────────────┼────────────┤ │
│  │ • index.js   │ • Header         │ • cartStore  │ • api.js   │ │
│  │ • cart.js    │ • ProductCard    │ (Zustand)    │ • helpers  │ │
│  │ • product    │ • CartItem       │              │            │ │
│  │   /[id].js   │ • Checkout       │              │            │ │
│  └──────────────┴──────────────────┴──────────────┴────────────┘ │
│                              ↓ (HTTP)                             │
└────────────────────────────────────────────────────────────────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                     ↓                         ↓
        ┌─────────────────────┐    ┌──────────────────┐
        │   Backend (Express) │    │  localStorage    │
        │                     │    │  (Cart Persist)  │
        │ • routes/products.js│    └──────────────────┘
        │ • firebase.js       │
        │ • index.js          │
        └────────────┬────────┘
                     │ (Firestore Query)
                     ↓
        ┌──────────────────────────┐
        │  Firebase Firestore DB   │
        │  ┌────────────────────┐  │
        │  │  products         │  │
        │  │  collection       │  │
        │  └────────────────────┘  │
        └──────────────────────────┘
```

---

## 📱 Frontend Architecture

### State Management (Zustand)
```javascript
useCartStore
├── State
│   └── cart: Product[]
├── Actions
│   ├── addToCart(product)
│   ├── removeFromCart(productId)
│   ├── updateQuantity(productId, quantity)
│   ├── clearCart()
│   ├── getTotal()
│   └── getCartCount()
└── Persistence
    └── localStorage: 'cart-storage'
```

### Component Hierarchy
```
<_app>
└── <Header>
    ├── Logo
    ├── Navigation
    └── Cart Counter

<index> (Home)
├── <Header>
├── Search Input
└── <ProductCard> (multiple)
    ├── Image
    ├── Name, Description
    ├── Price
    └── Add to Cart Button

<product/[id]> (Detail)
├── <Header>
├── Image
├── Details
├── Quantity Selector
└── Add to Cart Button

<cart> (Cart Page)
├── <Header>
├── <CartItem> (multiple)
│   ├── Image
│   ├── Details
│   ├── Quantity Controls
│   └── Remove Button
└── <CheckoutSummary>
    ├── Name Input
    ├── Order Summary
    ├── Total
    └── WhatsApp Checkout Button
```

### Data Flow

```
User Action → Component → Zustand Store → localStorage
                    ↓
                  API Call
                    ↓
                 Backend/Firebase
                    ↓
                Re-render Component
```

---

## 🖥️ Backend Architecture

### Express Server Structure
```
index.js (Entry Point)
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── Error Handler
├── Routes
│   └── /api/products
│       ├── GET / (All products)
│       └── GET /:id (Single product)
└── Firebase Connection
    └── Firestore Client
```

### API Endpoints

#### GET /api/products
```json
Response:
{
  "success": true,
  "data": [
    {
      "id": "doc_id",
      "name": "Product Name",
      "price": 100000,
      "description": "...",
      "image": "url",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET /api/products/:id
```json
Response:
{
  "success": true,
  "data": {
    "id": "doc_id",
    "name": "Product Name",
    "price": 100000,
    "description": "...",
    "image": "url",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## 💾 Database Schema

### Firestore Collection: `products`

```
Collection: products
├── Document: product_001
│   ├── name: "Sepatu Sneakers" (string)
│   ├── price: 250000 (number)
│   ├── description: "..." (string)
│   ├── image: "https://..." (string)
│   └── createdAt: Timestamp
├── Document: product_002
│   └── ...
└── Document: product_003
    └── ...
```

### Document Structure
```javascript
{
  name: string,           // Required: Product name
  price: number,          // Required: Price in IDR
  description: string,    // Required: Product description
  image: string,          // Optional: Image URL
  createdAt: timestamp    // Auto: Creation date
}
```

---

## 🔄 Data Flow Examples

### 1. Product Listing Flow
```
User opens app
      ↓
<index> page mounts
      ↓
useEffect() triggers
      ↓
fetchProducts() → API call
      ↓
GET /api/products
      ↓
Backend queries Firestore
      ↓
Firestore returns products[]
      ↓
Backend sends response
      ↓
Frontend updates state
      ↓
Re-render with products
```

### 2. Add to Cart Flow
```
User clicks "Add" button
      ↓
addToCart(product) action
      ↓
Zustand updates store
      ↓
localStorage saves state
      ↓
CartCounter updates
      ↓
Show success message
```

### 3. Checkout Flow
```
User fills name & clicks "Checkout"
      ↓
generateWhatsAppMessage()
      ↓
Format cart items → text
      ↓
encodeURIComponent()
      ↓
Build WhatsApp URL
      ↓
window.open() → WhatsApp
      ↓
clearCart()
      ↓
Redirect on return
```

---

## 🔐 Security Considerations

### Frontend Security
- ✅ Input validation on forms
- ✅ Secure localStorage for cart only
- ✅ XSS prevention (Next.js built-in)
- ✅ CORS enabled on backend

### Backend Security
- ✅ Firebase security rules required
- ✅ Environment variables for credentials
- ✅ Error messages don't leak data
- ✅ Input validation on API

### Firebase Security Rules
```javascript
match /databases/{database}/documents {
  match /products/{document=**} {
    allow read: if true;           // Anyone can read
    allow write: if false;          // Only via admin
  }
}
```

---

## 📊 Performance Optimization

### Frontend
- ✅ Code splitting (Next.js automatic)
- ✅ Image optimization (Next.js Image component)
- ✅ Zustand for lightweight state
- ✅ localStorage caching

### Backend
- ✅ Firestore indexes
- ✅ Efficient queries
- ✅ CORS pre-flight handling
- ✅ Error handling

---

## 🚀 Scalability Considerations

### Current Limitations
- Single Firestore instance
- No authentication
- All products in one collection
- No pagination

### Future Improvements
```
├── Add Pagination
│   └── Limit products per page
├── Add Search Indexing
│   └── Firestore composite indexes
├── Add Caching
│   └── Redis/CDN for frequently accessed data
├── Add Authentication
│   └── Firebase Auth
├── Add Orders Collection
│   └── Track purchase history
└── Add Admin Dashboard
    └── Manage products
```

---

## 📦 Deployment Architecture

### Development
```
Local Machine
├── Frontend: localhost:3000 (npm run dev)
└── Backend: localhost:5000 (npm run dev)
```

### Production
```
CDN/Vercel (Frontend)
├── Build: npm run build
├── Deploy: Automatic from git
└── URL: marketplace.vercel.app

Cloud Server (Backend)
├── Docker container
├── Environment variables
└── Firebase credentials
```

---

## 🧪 Testing Strategy

### Frontend Testing (TBD)
```javascript
// Unit Tests
- Components rendering
- State updates
- API calls mocking

// Integration Tests
- Complete user flows
- Cart persistence
- Navigation
```

### Backend Testing (TBD)
```javascript
// Unit Tests
- API endpoints
- Error handling
- Firebase queries

// Integration Tests
- End-to-end flows
- Database operations
```

---

## 📈 Monitoring & Logging

### Frontend Monitoring
```javascript
// Check browser console for:
- API errors
- Component warnings
- localStorage issues
```

### Backend Monitoring
```javascript
// Check server logs for:
- Firebase errors
- API errors
- Request logs
```

---

## 🔗 External Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^14.0.0 | React framework |
| react | ^18.2.0 | UI library |
| express | ^4.18.2 | API server |
| firebase-admin | ^11.8.0 | Firebase SDK |
| zustand | ^4.4.0 | State management |
| axios | ^1.4.0 | HTTP client |
| tailwindcss | ^3.3.2 | Styling |

---

## 📞 Support & Troubleshooting

### Common Issues
1. **Products not loading** → Check Firestore
2. **Cart not saving** → Check localStorage
3. **API errors** → Check backend console
4. **WhatsApp not opening** → Check phone number format

### Debug Checklist
- [ ] Firebase credentials correct
- [ ] API URL in .env.local correct
- [ ] Firestore collection exists
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] localStorage enabled in browser

---

## 📚 Additional Resources

- [Next.js Architecture](https://nextjs.org/docs/advanced-features/architecture)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Firestore Optimization](https://firebase.google.com/docs/firestore/best-practices)
- [Zustand Patterns](https://github.com/pmndrs/zustand/tree/main/examples)

---

**Version**: 1.0.0
**Last Updated**: 2024
**Status**: Production Ready
