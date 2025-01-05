import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'; // Adjust the path as necessary
import User from './User.js'; // Import User model

class Character extends Model {}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    class: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    background: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    race: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    alignment: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    skin: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    hair: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    strength: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dexterity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    constitution: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    intelligence: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wisdom: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    charisma: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Character',
});

// Define associations
User.hasMany(Character, { foreignKey: 'user_id' });
Character.belongsTo(User, { foreignKey: 'user_id' });

export default Character;