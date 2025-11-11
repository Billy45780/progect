const { v4: uuidv4 } = require('uuid');

class Item {
    constructor() {
        this.items = [
            {
                id: uuidv4(),
                title: "Изучить React",
                description: "Освоить основы React и компонентный подход",
                completed: true,
                createdAt: new Date("2024-01-10").toISOString()
            },
            {
                id: uuidv4(),
                title: "Создать API",
                description: "Разработать бэкенд с Express.js",
                completed: true,
                createdAt: new Date("2024-01-15").toISOString()
            },
            {
                id: uuidv4(),
                title: "Интегрировать фронтенд",
                description: "Связать React приложение с бэкендом",
                completed: false,
                createdAt: new Date("2024-01-20").toISOString()
            }
        ];
    }

    getAll() {
        return this.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    getById(id) {
        return this.items.find(item => item.id === id);
    }

    create(itemData) {
        const newItem = {
            id: uuidv4(),
            title: itemData.title,
            description: itemData.description,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.items.push(newItem);
        return newItem;
    }

    update(id, updateData) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        
        if (itemIndex === -1) {
            return null;
        }

        this.items[itemIndex] = {
            ...this.items[itemIndex],
            ...updateData
        };

        return this.items[itemIndex];
    }

    delete(id) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        
        if (itemIndex === -1) {
            return false;
        }

        this.items.splice(itemIndex, 1);
        return true;
    }

    toggleComplete(id) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        
        if (itemIndex === -1) {
            return null;
        }

        this.items[itemIndex].completed = !this.items[itemIndex].completed;
        return this.items[itemIndex];
    }
}

module.exports = new Item();