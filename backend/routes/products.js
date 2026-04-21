const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { db, admin } = require('../firebase');

const requireAdmin = (req, res, next) => {
  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_JWT_SECRET belum dikonfigurasi di backend .env'
    });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: token admin diperlukan'
    });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: hanya admin'
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: token admin tidak valid'
    });
  }

  next();
};

const validateProductPayload = (body) => {
  const { name, price, image, description } = body;

  if (!name || typeof name !== 'string') {
    return 'Nama produk wajib diisi';
  }

  if (price === undefined || Number.isNaN(Number(price)) || Number(price) < 0) {
    return 'Harga produk tidak valid';
  }

  if (!image || typeof image !== 'string') {
    return 'Foto produk wajib diisi';
  }

  if (!description || typeof description !== 'string') {
    return 'Deskripsi produk wajib diisi';
  }

  return null;
};

// Get all products
router.get('/', async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const products = [];

    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('products').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create product (admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const validationError = validateProductPayload(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const payload = {
      name: req.body.name.trim(),
      price: Number(req.body.price),
      image: req.body.image.trim(),
      description: req.body.description.trim(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('products').add(payload);
    const doc = await docRef.get();

    res.status(201).json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update product (admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const validationError = validateProductPayload(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const productRef = db.collection('products').doc(id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const payload = {
      name: req.body.name.trim(),
      price: Number(req.body.price),
      image: req.body.image.trim(),
      description: req.body.description.trim(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await productRef.update(payload);
    const updatedDoc = await productRef.get();

    res.status(200).json({
      success: true,
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data()
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete product (admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const productRef = db.collection('products').doc(id);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await productRef.delete();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
