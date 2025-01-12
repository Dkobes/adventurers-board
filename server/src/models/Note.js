import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'; 
import Character from './Character.js';

class Note extends Model {}

Note.init({
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
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Note'
});

// Define associations
Character.hasMany(Note, { foreignKey: 'character_id' });
Note.belongsTo(Character, { foreignKey: 'character_id' });

export default Note;