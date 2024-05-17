import React, { useEffect, useState } from "react";
import { useAuth } from "../storeing-data/auth";

const ProductsList = () => {
    const { business, authorizationToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:2005/api/business/${business._id}/products`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (business && business._id) {
            fetchProducts();
        }
    }, [business, authorizationToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const sourceLink = "http://localhost:2005/"
    return (
        <>
            {products.length > 0 ? (
                products.map((product) => (
                    <div className="list-div" key={product._id}>
                        <p className="li-name">{product.name}</p>
                        <img style={{ height: "100%" }} src={`${sourceLink}${product.productImage}`} />
                    </div>
                ))
            ) : (
                <div>
                    Add your first product
                </div>
            )}
        </>
    );
};

export default ProductsList;
