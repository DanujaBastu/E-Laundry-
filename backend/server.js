require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia_negara_laundry';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path'); 
const bcrypt = require('bcryptjs'); 
const User = require('./models/User'); 

const Order = require('./models/order');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Konek'))
    .catch(err => console.log(err));

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: "Username tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Password salah" });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.get('/api/orders', async (req, res) => { 
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
});
app.get('/api/orders/:orderId', async (req, res) => { 
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json("Order tidak ditemukan");
    res.status(200).json(order);
});
app.post('/api/orders', async (req, res) => { 
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) { res.status(500).json(err); }
});
app.delete('/api/orders/:id', async (req, res) => { 
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
});
app.put('/api/orders/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = {
            status: req.body.status
        };

        if (req.file) {
            updateData.proofImage = req.file.filename;
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server jalan di port ${PORT}`));