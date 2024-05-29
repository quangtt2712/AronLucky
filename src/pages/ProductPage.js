import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductPage = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    console.log(product);
  };

  const handleSave = (product) => {
    if (currentProduct) {
      updateProduct(currentProduct.id, product);
      console.log(currentProduct.id + product);
    } else {
      addProduct(product);
    }
    setCurrentProduct(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductForm product={currentProduct} onSave={handleSave} />
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductPage;
