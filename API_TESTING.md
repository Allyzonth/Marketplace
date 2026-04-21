# 🧪 API Testing Guide

## Prerequisites
- Backend running on port 5000
- Postman or curl installed
- Sample products in Firestore

---

## 🔌 API Endpoints

### 1. Health Check
Test if backend is running

**Request:**
```bash
GET http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "Backend is running"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/health
```

---

### 2. Get All Products

**Request:**
```bash
GET http://localhost:5000/api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "doc_1",
      "name": "Sepatu Sneakers",
      "price": 250000,
      "description": "Sepatu berkualitas tinggi",
      "image": "https://...",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "doc_2",
      "name": "T-Shirt",
      "price": 75000,
      "description": "Kaos premium",
      "image": "https://...",
      "createdAt": "2024-01-02T00:00:00Z"
    }
  ]
}
```

**cURL:**
```bash
curl http://localhost:5000/api/products
```

**Postman:**
- Method: GET
- URL: http://localhost:5000/api/products
- Click Send

---

### 3. Get Single Product

**Request:**
```bash
GET http://localhost:5000/api/products/{product_id}
```

**Replace `{product_id}` with actual product ID**

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "doc_1",
    "name": "Sepatu Sneakers",
    "price": 250000,
    "description": "Sepatu berkualitas tinggi",
    "image": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**cURL:**
```bash
curl http://localhost:5000/api/products/doc_1
```

**Postman:**
- Method: GET
- URL: http://localhost:5000/api/products/doc_1
- Click Send

---

## ✅ Testing Scenarios

### Scenario 1: Get All Products
```bash
# Step 1: Get all products
curl http://localhost:5000/api/products

# Expected: Array of products
# Status: 200 OK
```

### Scenario 2: Get Specific Product
```bash
# Step 1: Get all products first
curl http://localhost:5000/api/products

# Step 2: Copy a product ID (e.g., "abc123")
# Step 3: Get that specific product
curl http://localhost:5000/api/products/abc123

# Expected: Single product object
# Status: 200 OK
```

### Scenario 3: Error Handling
```bash
# Test with invalid product ID
curl http://localhost:5000/api/products/invalid_id_xyz

# Expected:
# {
#   "success": false,
#   "message": "Product not found"
# }
# Status: 404 Not Found
```

---

## 📊 Postman Collection

Import this into Postman:

```json
{
  "info": {
    "name": "MarketPlace API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "health"]
        }
      }
    },
    {
      "name": "Get All Products",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/products",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "products"]
        }
      }
    },
    {
      "name": "Get Product by ID",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/products/:id",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "products", ":id"]
        },
        "variable": [
          {
            "key": "id",
            "value": "your_product_id_here"
          }
        ]
      }
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux

# Solution: Kill process or change PORT in .env
```

### API Returns Error
```bash
# Check backend console for errors
# Make sure .env file has correct Firebase credentials
# Verify Firestore database exists and is accessible
```

### Products Return Empty Array
```bash
# 1. Check Firestore has "products" collection
# 2. Verify products collection has documents
# 3. Check Firebase security rules allow read
```

### CORS Error
```bash
# Error: No 'Access-Control-Allow-Origin' header
# Solution: Backend has CORS enabled
# Check if backend is running and accessible
```

---

## 🔄 Frontend API Integration Test

### Test Search
1. Open http://localhost:3000
2. Products should load
3. Type in search box
4. Products should filter

### Test Add to Cart
1. Click "Add" on any product
2. Check cart counter updates
3. Open cart (click cart icon)
4. Product should be in cart

### Test Product Detail
1. Click on any product
2. Detail page should load
3. Image, name, description visible
4. Should be able to adjust quantity
5. Add to cart should work

### Test WhatsApp Checkout
1. Add products to cart
2. Go to cart page
3. Enter name
4. Click "Checkout via WhatsApp"
5. WhatsApp should open with message
6. Check message format is correct

---

## 📝 Response Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 404 | Not Found | Product not found |
| 500 | Server Error | Backend error |
| 503 | Unavailable | Firebase connection issue |

---

## 🔐 API Security

### Current Security
- ✅ Read-only endpoints
- ✅ No authentication required (for MVP)
- ✅ Firestore security rules protect writes

### Future Security
- [ ] Add authentication
- [ ] Add rate limiting
- [ ] Add request validation
- [ ] Add logging/monitoring

---

## 📚 Complete cURL Examples

### Get All Products (Pretty Print)
```bash
curl -X GET http://localhost:5000/api/products | jq .
```

### Get Product with Pretty Print
```bash
curl -X GET http://localhost:5000/api/products/abc123 | jq .
```

### Save Response to File
```bash
curl http://localhost:5000/api/products > products.json
```

### Check Response Headers
```bash
curl -i http://localhost:5000/api/products
```

### Measure Response Time
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/products
```

---

## ✨ Tips & Tricks

### Test Multiple Products
```bash
# Get all products first
curl http://localhost:5000/api/products

# For each product ID, test it
curl http://localhost:5000/api/products/id_1
curl http://localhost:5000/api/products/id_2
curl http://localhost:5000/api/products/id_3
```

### Automate Testing with Script
```bash
#!/bin/bash
# Save as test.sh
# Run: bash test.sh

echo "Testing MarketPlace API..."

echo "1. Health Check"
curl http://localhost:5000/api/health

echo ""
echo "2. Get All Products"
curl http://localhost:5000/api/products

echo ""
echo "Test Complete!"
```

---

**Happy Testing! 🚀**
