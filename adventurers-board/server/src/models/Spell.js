import { Model, DataTypes } from 'sequelize';
import sequelize from '../config'; // Adjust the path as necessary
import Character from './Character'; // Import Character model

class Spell extends Model {}

Spell.init({
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
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Spell',
});

// Define associations
Character.hasMany(Spell, { foreignKey: 'character_id' });
Spell.belongsTo(Character, { foreignKey: 'character_id' });

export default Spell;