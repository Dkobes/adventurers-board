import React, { useState, useEffect } from 'react';
import Chest from '/src/assets/images/treasure-chest.jpg';
import './inventory.css';
import auth from '../../utils/auth';


const Inventory = ({ characterId }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [itemName, setItemName] = useState('');
    const [error, setError] = useState(null); 

        useEffect(() => {
            // Fetch character data when the component mounts
            fetch(`/api/inventories/characters/${characterId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch character data');
                    }
                    return res.json();
                })
                .then(data => {
                    setItems(data); // Set the items from the response
                    setIsLoading(false); // Set loading to false
                })
                .catch(err => {
                    setError(err.message); // Set error message
                    setIsLoading(false); 
                  console.error(err);
                });
        }, [characterId]); 

    const addItem = () => {
        if (itemName) {
            const existingItem = items.find(item => item.name === itemName);
        
            if (existingItem) {
                // increase quantity, if one exists, number will increase
                existingItem.quantity += 1;
                setItems([...items]);
            } else {
                const newItem = { character_id: characterId, name: itemName, quantity: 1 };
                // add new item with quantity starting at 1
                setItems([...items, { name: itemName, quantity: 1 }]);

                fetch(`/api/inventories/${characterId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.getToken()}`
                    },
                    body: JSON.stringify(newItem)
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to add item');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setItems([...items, data]);
                        setItemName('');
                        console.log(data);
                    })
                    .catch(err => {
                        setError(err.message); 
                        console.error(err);
                    });
            }
        }
            setItemName('');
    };

    const handleIncrease = (itemName) => {
        const updatedItems = items.map(item => 
            item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
        );
        setItems(updatedItems);

        const itemToUpdate = updatedItems.find(item => item.name === itemName);

        // Send the updated quantity to the server
        fetch(`/api/inventories/${itemToUpdate.id}`, { 
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify({ quantity: itemToUpdate.quantity })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update item quantity');
            }
            return res.json();
        })
        .then(data => {
            console.log('Item updated:', data);
        })
        .catch(err => {
            setError(err.message);
            console.error(err);
        });
    };
    

    const handleDecrease = (itemName) => { // fix amount going into negatives
        setItems(items.map(item => 
            item.name === itemName 
            ? { ...item, quantity: Math.max(item.quantity - 1, 0)  } : item
        ));
    const updatedItems = items.map(item => 
        item.name === itemName 
        ? { ...item, quantity: Math.max(item.quantity - 1, 0)  } : item
    );
    setItems(updatedItems);

    const itemToUpdate = updatedItems.find(item => item.name === itemName);

    // Send the updated quantity to the server
    fetch(`/api/inventories/${itemToUpdate.id}`, { 
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`
        },
        body: JSON.stringify({ quantity: itemToUpdate.quantity })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update item quantity');
        }
        return res.json();
    })
    .then(data => {
        console.log('Item updated:', data);
    })
    .catch(err => {
        setError(err.message);
        console.error(err);
    });
};

    const handleRemoveItem = (itemName) => {
        setItems(items.filter(item => item.name !== itemName));

        const itemToRemove = items.find(item => item.name === itemName);
        fetch(`/api/inventories/${itemToRemove.id}`, { 
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify()
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete item');
            }
            return res.json();
        })
        .then(data => {
            console.log('Item deleted:', data);
        })
        .catch(err => {
            setError(err.message);
            console.error(err);
        });
        };
    

    return (
        <div className="inventory-page">
        <div className="image-container">
            <img src={Chest} alt="Treasure room flowing with gems and coin" className="inventory-img"></img>
            <h2 className="overlay-text">Inventory</h2>
            <div className="overlay-content">
            <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                placeholder="Add new item" 
            />
            <button onClick={addItem}>Add Item</button>
            <ul className="item-list">
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.quantity}
                        <button onClick={() => handleIncrease(item.name)}>+</button>
                        <button onClick={() => handleDecrease(item.name)}>-</button>
                        <button onClick={() => handleRemoveItem(item.name)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    </div>
    );
};

export default Inventory; 