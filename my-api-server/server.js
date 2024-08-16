const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// CSP header configuration
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "style-src": ["'self'", 'https://fonts.googleapis.com'],
      "font-src": ["'self'", 'https://fonts.gstatic.com']
    }
  })
);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/asm_reactjs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  stt: Number
});

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  category: Number,
  stock: Number,
  image: String,
  sold: Number,
  hot: Number,
  view: Number,
  createdAt: Date,
  updatedAt: Date
});

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  phone: String,
  address: String
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

// === Routes for categories ===
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching categories' });
  }
});

app.get('/products/hot', async (req, res) => {
  try {
    const products = await Product.find({ hot: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ id: parseInt(id) });

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching product' });
  }
});

app.get('/allproduct', async (req, res) => {
  try {
    const { sort } = req.query;
    let sortOptions = {};

    if (sort === 'priceAsc') {
      sortOptions.price = 1;
    } else if (sort === 'priceDesc') {
      sortOptions.price = -1;
    }

    const products = await Product.find().sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products' });
  }
});

app.get('/products/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { sort } = req.query;

  try {
    let sortOptions = {};

    if (sort === 'priceAsc') {
      sortOptions.price = 1;
    } else if (sort === 'priceDesc') {
      sortOptions.price = -1;
    }

    const products = await Product.find({ category: parseInt(categoryId) }).sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Đăng kí
app.post('/register', async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).send({ message: 'Email hoặc số điện thoại đã tồn tại' });
    }

    // Tạo người dùng mới
    const newUser = new User({
      fullname,
      email,
      password,
      phone,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    const savedUser = await newUser.save();

    res.status(201).send({ message: 'Người dùng đã đăng ký thành công' });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).send({ message: 'Lỗi khi đăng ký người dùng' });
  }
});

// Đăng nhập
app.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body; 

    // Tìm người dùng theo số điện thoại
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "Tài khoản không đúng !" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Mật khẩu không đúng !" })
    }
    res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        phone: user.phone, 
        address: user.address,
      }
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi khi đăng nhập" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
