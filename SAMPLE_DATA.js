// 📝 Sample Products for Firestore
// Copy and paste these into your Firestore "products" collection

const sampleProducts = [
  {
    name: "Sepatu Sneakers Premium",
    price: 250000,
    description: "Sepatu sneakers berkualitas tinggi dengan desain modern, bahan breathable, dan nyaman untuk aktivitas sehari-hari",
    image: "https://cdn.pixabay.com/photo/2016/12/06/18/45/sports-shoes-1886670_640.jpg",
    category: "Sepatu",
    stock: 15,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "T-Shirt Cotton Premium",
    price: 75000,
    description: "Kaos katun premium 100% dengan kenyamanan maksimal, tersedia berbagai ukuran dan warna pilihan",
    image: "https://cdn.pixabay.com/photo/2015/11/19/10/35/t-shirt-1050335_640.jpg",
    category: "Pakaian",
    stock: 32,
    rating: 4.6,
    createdAt: new Date()
  },
  {
    name: "Backpack Travel 40L",
    price: 450000,
    description: "Ransel travel dengan banyak kompartemen pintar, cocok untuk petualangan jarak jauh, material tahan air",
    image: "https://cdn.pixabay.com/photo/2016/12/11/16/34/backpack-1899619_640.jpg",
    category: "Aksesori",
    stock: 8,
    rating: 4.9,
    createdAt: new Date()
  },
  {
    name: "Smartwatch Pro Max",
    price: 1200000,
    description: "Jam tangan pintar dengan fitur kesehatan lengkap, monitoring detak jantung, tahan air hingga 50m",
    image: "https://cdn.pixabay.com/photo/2019/05/04/15/00/smartwatch-4179307_640.jpg",
    category: "Elektronik",
    stock: 12,
    rating: 4.7,
    createdAt: new Date()
  },
  {
    name: "Headphone Wireless ANC",
    price: 350000,
    description: "Headphone nirkabel dengan noise cancellation aktif, baterai 30 jam, suara ultra jernih HD",
    image: "https://cdn.pixabay.com/photo/2018/11/25/23/33/headphones-3835876_640.jpg",
    category: "Audio",
    stock: 20,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "Power Bank 20000mAh",
    price: 150000,
    description: "Power bank berkapasitas besar dengan pengisian cepat 65W, kompatibel semua perangkat, layar LED",
    image: "https://cdn.pixabay.com/photo/2018/12/08/13/37/power-bank-3864942_640.jpg",
    category: "Aksesori",
    stock: 45,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Jam Tangan Analog Mewah",
    price: 350000,
    description: "Jam tangan analog premium dengan bahan stainless steel, desain elegan, tahan lama seumur hidup",
    image: "https://cdn.pixabay.com/photo/2020/05/07/13/08/watch-5143548_640.jpg",
    category: "Aksesori",
    stock: 10,
    rating: 4.9,
    createdAt: new Date()
  },
  {
    name: "Kacamata Hitam Pria",
    price: 200000,
    description: "Kacamata hitam dengan lensa UV protection premium, frame titanium, cocok untuk aktivitas outdoor",
    image: "https://cdn.pixabay.com/photo/2019/07/07/14/33/sunglasses-4322521_640.jpg",
    category: "Aksesori",
    stock: 25,
    rating: 4.7,
    createdAt: new Date()
  }
];

// Instruction: Di Firebase Console > Firestore Database
// 1. Buat collection baru dengan nama "products"
// 2. Tambahkan dokumen baru untuk setiap produk
// 3. Gunakan field di atas sebagai referensi

export default sampleProducts;
