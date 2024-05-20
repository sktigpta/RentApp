import React, { useEffect, useState } from "react";
import { useAuth } from "../storeing-data/auth";
import addProduct from "../assets/add-product.png";



export const ProductsList = () => {
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
                        {product.productImage ?
                            <>
                                <img src={`${sourceLink}${product.productImage}`} />
                            </>
                            :
                            <>
                                <img src={addProduct} alt="" />
                            </>

                        }
                        <p className="li-name">{product.name}</p>
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

