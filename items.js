const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

router.get("/", async (req, res) => {
    try {
        await simulateDelay(300);
        
        const items = Item.getAll();
        res.json({
            success: true,
            data: items,
            count: items.length
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch items"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        await simulateDelay(200);
        
        const item = Item.getById(req.params.id);
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch item"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        await simulateDelay(400);
        
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const newItem = Item.create({
            title: title.trim(),
            description: description ? description.trim() : ""
        });

        res.status(201).json({
            success: true,
            message: "Item created successfully",
            data: newItem
        });
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create item"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await simulateDelay(400);
        
        const { title, description, completed } = req.body;
        const updateData = {};

        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (completed !== undefined) updateData.completed = completed;

        const updatedItem = Item.update(req.params.id, updateData);

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        res.json({
            success: true,
            message: "Item updated successfully",
            data: updatedItem
        });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update item"
        });
    }
});

router.patch("/:id/toggle", async (req, res) => {
    try {
        await simulateDelay(300);
        
        const toggledItem = Item.toggleComplete(req.params.id);

        if (!toggledItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        res.json({
            success: true,
            message: `Item marked as ${toggledItem.completed ? "completed" : "incomplete"}`,
            data: toggledItem
        });
    } catch (error) {
        console.error("Error toggling item:", error);
        res.status(500).json({
            success: false,
            message: "Failed to toggle item"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await simulateDelay(300);
        
        const deleted = Item.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        res.json({
            success: true,
            message: "Item deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete item"
        });
    }
});

module.exports = router;
