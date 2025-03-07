const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ⚠️ CORS WARNING: Set only trusted origins in production
app.use(cors({ origin: "*" })); // Allows all origins (Not safe for production)

// Middleware
app.use(bodyParser.json());

const items = []; // Temporary in-memory storage

// 📌 Create a new item
app.post("/items", (req, res) => {
    const { image, play, name, price, star } = req.body;
    
    if (!image || !play || !name || !price || !star) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    const newItem = { id: items.length + 1, image, play, name, price, star };
    items.push(newItem);
    res.status(201).json({ message: "Item added", item: newItem });
});

// 📌 Get all items
app.get("/items", (req, res) => {
    res.json(items);
});

// 📌 Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
