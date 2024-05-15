import React, { useState, useEffect } from 'react';
import { useAuth } from '../storeing-data/auth';

export const MiddleHeroSection = () => {
    // Define state to store the fetched products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Function to fetch products
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:2005/api/business/6644219a30945e5b7b4e6256/products`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products); // Set the fetched products in state
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Call the fetchProducts function when component mounts
        fetchProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]); // Empty dependency array to run effect only once

    return (
        <section className="DJKE84WKJ">
            {products.map(product => (
                <div className="card-MW" key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price Per Day: {product.pricePerDay}</p>
                    <p>Price Per Week: {product.pricePerWeek}</p>
                    <p>Price Per Month: {product.pricePerMonth}</p>
                </div>
            ))}
        </section>
    );
};
