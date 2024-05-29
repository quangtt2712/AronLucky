import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ol>
        {products.map(product => (
          <li key={product.id}>
            {product.title} {product.body}
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProductList;
