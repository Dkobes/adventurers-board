import { Model, DataTypes } from 'sequelize';
import sequelize from '../config'; // Adjust the path as necessary
import Character from './Character'; // Import Character model

class Inventory extends Model {}

Inventory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
            key: 'id',
        },
        onDelete: 'CASCADE', // This ensures that if a character is deleted, their inventory is also deleted
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Inventory',
});

// Define associations
Character.hasMany(Inventory, { foreignKey: 'character_id' }); //one-to-many relationship between Character and Inventory where they can have multiple items
Inventory.belongsTo(Character, { foreignKey: 'character_id' }); //sets up relationship for each item belongs to a specific character

export default Inventory;