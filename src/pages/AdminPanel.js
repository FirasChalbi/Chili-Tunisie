import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: 0, description: '', image: null });
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const createFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  };

  const fetchMenuItems = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/menu')
      .then(handleResponse)
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => console.error('Error fetching menu items:', error))
      .finally(() => setLoading(false));
  };

  const addMenuItem = () => {
    const { name, price, description, image } = newMenuItem;
    if (name.trim() === '' || price <= 0 || description.trim() === '' || image === null) return;

    const formData = createFormData(newMenuItem);

    fetch('http://localhost:5000/api/menu', {
      method: 'POST',
      body: formData,
    })
      .then(handleResponse)
      .then((data) => {
        console.log('Response Data:', data);
        setMenuItems([...menuItems, data]);
        setNewMenuItem({ name: '', price: 0, description: '', image: null });
      })
      .catch((error) => console.error('Error adding menu item:', error.message));
  };

  const deleteMenuItem = (id) => {
    fetch(`http://localhost:5000/api/menu/${id}`, {
      method: 'DELETE',
    })
      .then(handleResponse)
      .then(() => setMenuItems(menuItems.filter((item) => item._id !== id)))
      .catch((error) => console.error('Error deleting menu item:', error));
  };

  const editMenu = (id) => {
    setEditMenuItem(id);
    const selectedItem = menuItems.find((item) => item._id === id);
    setNewMenuItem({ ...selectedItem, image: null });
  };

  const updateMenuItem = (id) => {
    const { name, price, description, image } = newMenuItem;
    if (name.trim() === '' || price <= 0 || description.trim() === '' || image === null) return;

    const formData = createFormData(newMenuItem);

    fetch(`http://localhost:5000/api/menu/${id}`, {
      method: 'PUT',
      body: formData,
    })
      .then(handleResponse)
      .then(() => {
        const updatedMenuItems = [...menuItems];
        const index = updatedMenuItems.findIndex((item) => item._id === id);
        updatedMenuItems[index] = { _id: id, ...newMenuItem };
        setMenuItems(updatedMenuItems);
        setNewMenuItem({ name: '', price: 0, description: '', image: null });
        setEditMenuItem(null);
      })
      .catch((error) => console.error('Error updating menu item:', error));
  };

  const handleImageChange = (e) => {
    setNewMenuItem({ ...newMenuItem, image: e.target.files[0] });
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <form encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: parseFloat(e.target.value) || 0 })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="button" onClick={addMenuItem}>
          Add Item
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {menuItems.map((item) => (
            <li key={item._id}>
              {item.name}{' '}
              <button onClick={() => editMenu(item._id)}>Edit</button>
              <button onClick={() => deleteMenuItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editMenuItem !== null && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newMenuItem.name}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, price: parseFloat(e.target.value) || 0 })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMenuItem.description}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={() => updateMenuItem(editMenuItem)}>Update Item</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
