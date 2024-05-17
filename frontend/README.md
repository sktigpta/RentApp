import React, { useState, useRef } from 'react';
import { useAuth } from '../storeing-data/auth';
import { useNavigate } from 'react-router-dom';

function AddProductForm() {
    const { business, authorizationToken } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        pricePerDay: '',
        pricePerWeek: '',
        pricePerMonth: '',
        categories: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState('');
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleKeyUp = (e) => {
        if (e.key === ',') {
            const categoriesArray = e.target.value.split(',').map((category) => category.trim()).filter(Boolean);
            setCategories(categoriesArray);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data for product details
        const productData = {
            name: formData.name,
            description: formData.description,
            pricePerDay: formData.pricePerDay,
            pricePerWeek: formData.pricePerWeek,
            pricePerMonth: formData.pricePerMonth,
            categories: formData.categories,
        };

        // Prepare form data for image upload
        const imageData = new FormData();
        imageData.append('image', formData.image);

        try {
            const imageResult = await imageResponse.json();
            const imageUrl = imageResult.imageUrl;

            // Then, include the image URL in the product data
            productData.image = imageUrl;

            // Now, submit the product data to add the product
            const productResponse = await fetch(`http://localhost:2005/api/business/${business._id}/add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(productData),
            });

            if (productResponse.ok) {
                const productData = await productResponse.json();
                navigate('/dashboard');
            } else {
                console.error('Error adding product:', productResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} style={{ width: "100%" }} action="POST">
                <section className="d-clmn">
                    <div className="upper">
                        <h1>{business.name}</h1>

                    </div>

                    <div className="information">

                        <div style={{ marginTop: "0.5em" }} className="d-row spc-between">
                            <div className="business-info">
                                <label>
                                    <h3>Product Image:</h3>
                                    <input type="file" name="image" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                                <div className="productImage" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Selected Product" />
                                    ) : (
                                        <img
                                            src="https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?t=st=1715895369~exp=1715898969~hmac=8991a5224c49c8fa1386ad60227922a29103d646c153503a83fa833d4d03ff67&w=1060"
                                            alt="Business"
                                        />
                                    )}
                                </div>

                                <div style={{ marginTop: "0.5em" }}>
                                    {categories.length > 0 && (
                                        <div style={{ gap: "0.5em" }} className="d-row">
                                            {categories.map((category, index) => (
                                                <div className='gray-btn' key={index}>{category}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div style={{ width: "62%" }} className="d-clmn">
                                <div>
                                    <h1>General Information</h1>
                                    <div style={{ marginTop: "1em" }} className="d-clmn">
                                        <label>
                                            Product Name:
                                            <input className="AddProductInput" type="text" name="name" value={formData.name} onChange={handleChange} />
                                        </label>

                                        <label>
                                            Product Description:
                                            <textarea className="AddProductInput" name="description" value={formData.description} onChange={handleChange}></textarea>
                                        </label>

                                        <label >
                                            Pricing:
                                            <div className="pricing-Inpt">
                                                <input className="AddProductInput" type="number" placeholder="Day" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} />
                                                <input className="AddProductInput" type="number" placeholder="Week" name="pricePerWeek" value={formData.pricePerWeek} onChange={handleChange} />
                                                <input className="AddProductInput" type="number" placeholder="Month" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange} />
                                            </div>
                                        </label>

                                        <label>
                                            Categories (separated by comma):
                                            <input className="AddProductInput" type="text" name="categories" value={formData.categories} onChange={handleChange} onKeyUp={handleKeyUp} />
                                        </label>


                                    </div>
                                </div>
                                <button style={{marginTop:"2em"}} type="submit">Submit</button>
                            </div>
                        </div>

                    </div>
                </section>
            </form>
        </>
    );
}

export default AddProductForm;
