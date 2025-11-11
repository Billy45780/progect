const express = require("express");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.use("/api/items", itemsRouter);

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend server is running",
        timestamp: new Date().toISOString()
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    });
});

app.use((error, req, res, next) => {
    console.error("Server error:", error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
});

app.listen(PORT, () => {
    console.log("=================================");
    console.log(`Backend server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
    console.log("=================================");
});

module.exports = app;
