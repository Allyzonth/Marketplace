# 📖 Quick Reference Guide

## ⚡ 5-Minute Setup

### Step 1: Backend (Terminal 1)
```bash
cd marketplace-app/backend
npm install
cp .env.example .env
# Edit .env with Firebase credentials
npm run dev
```

### Step 2: Frontend (Terminal 2)
```bash
cd marketplace-app/frontend
npm install
cp .env.example .env.local
# Edit .env.local
npm run dev
```

### Step 3: Open Browser
```
http://localhost:3000
```

---

## 📂 File Structure Quick Lookup

### Adding a New Feature

**New Page:**
1. Create file in `frontend/pages/newpage.js`
2. Import components
3. Use `useCartStore` for state
4. Import API functions

**New Component:**
1. Create file in `frontend/components/NewComponent.js`
2. Export default component
3. Use props for data
4. Import Zustand store if needed

**New API:**
1. Create endpoint in `backend/routes/products.js`
2. Use Firebase queries
3. Return JSON response

---

## 🎨 Common Code Patterns

### Use Cart Store
```javascript
import useCartStore from '@/store/cartStore';

// Get data
const cart = useCartStore((state) => state.cart);
const total = useCartStore((state) => state.getTotal());

// Update data
const { addToCart, removeFromCart } = useCartStore();
addToCart(product);
```

### Fetch Products
```javascript
import { fetchProducts, fetchProductById } from '@/lib/api';

// Get all products
const products = await fetchProducts();

// Get single product
const product = await fetchProductById('product_id');
```

### Format Price
```javascript
import { formatPrice } from '@/lib/helpers';

formatPrice(250000); // "Rp250.000"
```

### WhatsApp Checkout
```javascript
import { generateWhatsAppMessage, redirectToWhatsApp } from '@/lib/helpers';

const message = generateWhatsAppMessage(cartItems, 'Customer Name');
redirectToWhatsApp(message, '628123456789');
```

---

## 🔧 Configuration Files

### Backend .env
```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_CLIENT_X509_CERT_URL=
PORT=5000
```

### Frontend .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP_PHONE=628123456789
```

---

## 📊 Database Queries

### Get All Products (Backend)
```javascript
const snapshot = await db.collection('products').get();
const products = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Get Single Product (Backend)
```javascript
const doc = await db.collection('products').doc(id).get();
const product = { id: doc.id, ...doc.data() };
```

### Add Product (Firebase Console)
```json
{
  "name": "Product Name",
  "price": 100000,
  "description": "Description",
  "image": "https://...",
  "createdAt": Timestamp.now()
}
```

---

## 🚀 Deployment Commands

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Deploy Frontend (Vercel)
```bash
npm i -g vercel
vercel deploy
```

### Build Backend
```bash
cd backend
npm start
```

---

## 🐛 Debugging

### Check Backend
```bash
# Terminal 1
cd backend
npm run dev

# Check output for:
# - Server running on port 5000
# - No Firebase errors
```

### Check Frontend
```bash
# Terminal 2
cd frontend
npm run dev

# Check for:
# - Ready - started server on 0.0.0.0:3000
# - No build errors
```

### Check Browser Console
```
F12 → Console Tab
Look for:
- API errors
- React warnings
- Network failures
```

### Check Network
```
F12 → Network Tab
- API calls should return 200
- Check response data
```

---

## ✅ Checklist for Launch

- [ ] Firebase project created
- [ ] Firestore database setup
- [ ] Products added to Firestore
- [ ] Backend .env configured
- [ ] Backend running on port 5000
- [ ] Frontend .env.local configured
- [ ] Frontend running on port 3000
- [ ] Can browse products
- [ ] Search works
- [ ] Add to cart works
- [ ] Cart page displays items
- [ ] WhatsApp checkout opens
- [ ] Cart clears after checkout

---

## 🎯 Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Product Detail | http://localhost:3000/product/[id] |
| Cart | http://localhost:3000/cart |
| Backend | http://localhost:5000 |
| Firebase Console | https://console.firebase.google.com |

---

## 📚 Resources

| Resource | Link |
|----------|------|
| Next.js Docs | https://nextjs.org/docs |
| Express Docs | https://expressjs.com |
| Firebase Docs | https://firebase.google.com/docs |
| Zustand Docs | https://github.com/pmndrs/zustand |
| Tailwind Docs | https://tailwindcss.com/docs |

---

## 💡 Pro Tips

1. **Use React DevTools** - Debug components easily
2. **Check Network Tab** - See API calls
3. **Use Firestore Console** - Test database queries
4. **Enable Source Maps** - Better debugging
5. **Use .env files** - Never commit secrets
6. **Test in DevTools** - Mobile responsive

---

## ⚠️ Common Mistakes

❌ Don't commit `.env` files
❌ Don't hardcode API URLs
❌ Don't forget to install packages
❌ Don't run both on same port
❌ Don't leave Firebase rules open

---

## 🔄 Workflow

```
1. Code changes
   ↓
2. Save file
   ↓
3. Next.js hot-reloads (frontend)
   ↓
4. Check in browser
   ↓
5. Test in console
   ↓
6. Commit to git
```

---

## 📞 Quick Help

**Products not showing?**
→ Check Firestore has products → Check backend running

**Can't add to cart?**
→ Check console for errors → Check Zustand installed

**WhatsApp not opening?**
→ Check phone number format → Check URL encoding

**API errors?**
→ Check backend running → Check Firebase credentials

---

## 🎓 Learning Path

1. Understand the architecture (read ARCHITECTURE.md)
2. Setup everything (follow SETUP.md)
3. Test API endpoints (read API_TESTING.md)
4. Modify components
5. Add features
6. Deploy

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Ready to Use ✅
