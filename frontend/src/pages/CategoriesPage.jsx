import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoriesPage = () => {
  const { categoryid } = useParams(); // Ensure this matches your route parameter
  const [products, setProducts] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categoryid) {
        console.error('Category ID is not defined');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:2005/api/category/${categoryid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategory(data.category || null);
        setProducts(data.products || []);
        setBusinesses(data.businesses || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Category: {category ? category.name : 'Unknown'}</h1>
      <h2>Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price per day: ${product.pricePerDay}</p>
              <p>Price per week: ${product.pricePerWeek}</p>
              <p>Price per month: ${product.pricePerMonth}</p>
              {product.productImage ? (
                <img src={product.productImage} alt={product.name} />
              ) : (
                <p>No image available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found for this category.</p>
      )}

      <h2>Businesses</h2>
      {businesses.length > 0 ? (
        <ul>
          {businesses.map(business => (
            <li key={business._id}>
              <h3>{business.name}</h3>
              <p>{business.about}</p>
              <p>Phone: {business.phone}</p>
              <p>Email: {business.email}</p>
              <p>Address: {`${business.address.street}, ${business.address.area}, ${business.address.district}, ${business.address.postalCode}, ${business.address.state}, ${business.address.country}`}</p>
              <h4>Categories</h4>
              <ul>
                {business.categories.map(cat => (
                  <li key={cat._id}>{cat.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No businesses found for this category.</p>
      )}
    </div>
  );
};

export default CategoriesPage;
