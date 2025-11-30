require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Konek'))
    .catch(err => console.log(err));

const createAdmin = async () => {
    await User.deleteMany({});

    const passwordAsli = "admin123";
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordAsli, salt);

    const newAdmin = new User({
        username: "admin",
        password: hashedPassword 
    });

    await newAdmin.save();
    console.log("🎉 Sukses! Admin dibuat.");
    console.log("Username: admin");
    console.log("Password Asli: admin123");
    console.log("Password di DB: " + hashedPassword);
    
    mongoose.connection.close();
};

createAdmin(); 