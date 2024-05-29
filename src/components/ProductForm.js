import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave }) => {
  const [title, setName] = useState('');
  const [body, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.title);
      setPrice(product.body);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, body });
    setName('');
    setPrice('');
  };

  return (
    <div>
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="text" 
            value={body}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
