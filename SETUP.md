# 🛒 MarketPlace MVP - Setup Instructions

## Prerequisites
- Node.js (v14+)
- npm or yarn
- Firebase account with Firestore database
- Git (optional)

---

## 📁 Project Structure

```
marketplace-app/
├── frontend/                 # Next.js Frontend
│   ├── pages/               # Next.js pages
│   │   ├── index.js        # Home page (product listing)
│   │   ├── product/[id].js # Product detail page
│   │   ├── cart.js         # Cart page
│   │   ├── _app.js         # App wrapper
│   │   └── _document.js    # Document wrapper
│   ├── components/          # React components
│   │   ├── Header.js       # Header with navigation
│   │   ├── ProductCard.js  # Product card component
│   │   ├── CartItem.js     # Cart item component
│   │   └── CheckoutSummary.js # Checkout summary
│   ├── store/              # Zustand state management
│   │   └── cartStore.js    # Cart store
│   ├── lib/                # Utility functions
│   │   ├── api.js          # API calls
│   │   └── helpers.js      # Helper functions
│   ├── styles/             # CSS styles
│   │   └── globals.css     # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.example
│
└── backend/                # Express Backend
    ├── routes/
    │   └── products.js     # Product routes
    ├── firebase.js         # Firebase setup
    ├── index.js            # Server entry point
    ├── package.json
    └── .env.example
```

---

## 🚀 Setup Instructions

### 1. Backend Setup

#### Step 1.1: Navigate to backend folder
```bash
cd backend
```

#### Step 1.2: Install dependencies
```bash
npm install
```

#### Step 1.3: Setup Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Settings → Service Accounts
4. Click "Generate New Private Key"
5. Copy the JSON file

#### Step 1.4: Create .env file
```bash
cp .env.example .env
```

Edit `.env`:
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email@appspot.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
PORT=5000
```

#### Step 1.5: Setup Firestore Database

1. In Firebase Console, go to Firestore Database
2. Create a database (choose production mode)
3. Create collection: `products`
4. Add sample products with this structure:

```json
{
  "name": "Sepatu Sneakers",
  "price": 250000,
  "description": "Sepatu sneakers berkualitas tinggi dengan desain modern",
  "image": "https://via.placeholder.com/300x200?text=Sneakers"
}
```

#### Step 1.6: Start backend server
```bash
npm run dev
```

Output:
```
Server running on port 5000
```

---

### 2. Frontend Setup

#### Step 2.1: Navigate to frontend folder (new terminal)
```bash
cd frontend
```

#### Step 2.2: Install dependencies
```bash
npm install
```

#### Step 2.3: Create .env file
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP_PHONE=628123456789
```

Replace `628123456789` with your actual WhatsApp number (including country code without + symbol)

#### Step 2.4: Start frontend development server
```bash
npm run dev
```

Output:
```
> next dev
ready - started server on 0.0.0.0:3000
```

---

## 🌐 Access the Application

Open your browser and visit:
```
http://localhost:3000
```

---

## 🧪 Testing the Application

### Test Product Listing
1. Open http://localhost:3000
2. You should see all products from Firestore
3. Click on a product to see details

### Test Search
1. Type in the search box on home page
2. Products should filter by name

### Test Cart
1. Click "Add" button on any product
2. Click cart icon in header
3. You should see the product in cart
4. Adjust quantity or remove items

### Test WhatsApp Checkout
1. Add products to cart
2. Go to cart page
3. Enter your name
4. Click "Checkout via WhatsApp"
5. WhatsApp should open with pre-filled message

---

## 📝 Sample Firestore Products

Insert these products into Firestore `products` collection:

```javascript
// Product 1
{
  name: "Sepatu Sneakers",
  price: 250000,
  description: "Sepatu sneakers berkualitas tinggi dengan desain modern",
  image: "https://via.placeholder.com/300x200?text=Sneakers",
  createdAt: new Date()
}

// Product 2
{
  name: "T-Shirt Cotton",
  price: 75000,
  description: "Kaos katun premium dengan kenyamanan maksimal",
  image: "https://via.placeholder.com/300x200?text=T-Shirt",
  createdAt: new Date()
}

// Product 3
{
  name: "Backpack Travel",
  price: 450000,
  description: "Ransel travel dengan banyak kompartemen",
  image: "https://via.placeholder.com/300x200?text=Backpack",
  createdAt: new Date()
}
```

---

## ⚙️ Key Features Explained

### 1. Product Listing
- Fetches products from Firestore
- Displays in grid layout
- Add to cart button on each product

### 2. Product Detail
- Full product information
- Quantity selector
- Add multiple quantities to cart

### 3. Cart System
- Stored in localStorage (persists on page refresh)
- Add, remove, update quantity
- Real-time total calculation

### 4. Search
- Client-side filtering
- Searches by product name

### 5. WhatsApp Checkout
- Generates formatted message with all cart items
- Encodes message for URL
- Opens WhatsApp with pre-filled message
- Auto-clears cart after checkout

---

## 🔧 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify Firebase credentials are correct
- Check .env file is created

### Frontend shows "API Error"
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Open browser console for error details

### Products not loading
- Verify Firestore collection "products" exists
- Check Firebase credentials
- Ensure database rules allow read access

### Cart not persisting
- Check localStorage is enabled in browser
- Clear browser cache if needed

---

## 📦 Production Build

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Deploy Backend
```bash
# Use services like:
# - Heroku
# - Railway
# - Render
# - AWS
```

---

## 🎯 Future Improvements

- [ ] User authentication
- [ ] Admin dashboard
- [ ] Order tracking
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Product reviews/ratings
- [ ] Wishlist feature
- [ ] Multi-language support

---

## 📚 Tech Stack Details

| Technology | Purpose |
|-----------|---------|
| Next.js | React framework with routing |
| Express | Backend API server |
| Firestore | NoSQL database |
| Zustand | State management |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| localStorage | Client-side storage |

---

## 📄 License

This project is open source and available under the MIT License.
