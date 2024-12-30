import React, { useState } from 'react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');

    const addItem = () => {
        if (itemName) {
            setItems([...items, itemName]);
            setItemName('');
        }
    };

    return (
        <div>
            <h2>Inventory</h2>
            <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                placeholder="Add new item" 
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
