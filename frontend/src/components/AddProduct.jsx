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
        if (name === 'categories') {
            setCategories(value.split(',').map((category) => category.trim()).filter(Boolean));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('pricePerDay', formData.pricePerDay);
        formDataToSend.append('pricePerWeek', formData.pricePerWeek);
        formDataToSend.append('pricePerMonth', formData.pricePerMonth);
        formDataToSend.append('categories', JSON.stringify(categories));
        formDataToSend.append('productImage', formData.image); // Ensure the image file is appended here

        try {
            const response = await fetch(`http://localhost:2005/api/business/${business._id}/add-product`, {
                method: 'POST',
                headers: {
                    Authorization: authorizationToken,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const productData = await response.json();
                navigate('/dashboard');
            } else {
                console.error('Error adding product:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }} encType="multipart/form-data">
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
                            <div className="productImage" onClick={() => fileInputRef.current.click()} style={{ cursor: 'pointer' }}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Selected Product" />
                                ) : (
                                    <img src="https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?t=st=1715895369~exp=1715898969~hmac=8991a5224c49c8fa1386ad60227922a29103d646c153503a83fa833d4d03ff67&w=1060" alt="Business" />
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
                                    <label>
                                        Pricing:
                                        <div className="pricing-Inpt">
                                            <input className="AddProductInput" type="number" placeholder="Day" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} />
                                            <input className="AddProductInput" type="number" placeholder="Week" name="pricePerWeek" value={formData.pricePerWeek} onChange={handleChange} />
                                            <input className="AddProductInput" type="number" placeholder="Month" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange} />
                                        </div>
                                    </label>
                                    <label>
                                        Categories (separated by comma):
                                        <input className="AddProductInput" type="text" name="categories" value={formData.categories} onChange={handleChange} onKeyUp={handleChange} />
                                    </label>
                                </div>
                            </div>
                            <button style={{ marginTop: "2em" }} type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
}

export default AddProductForm;
