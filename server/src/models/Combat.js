import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'; 
import Character from './Character.js'; // Import Character model

class Combat extends Model {}

Combat.init({
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
        onDelete: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    attack: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dc: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dieCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dieType: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Combat',
});

// Define associations
Character.hasMany(Combat, { foreignKey: 'character_id' });
Combat.belongsTo(Character, { foreignKey: 'character_id' });

export default Combat;