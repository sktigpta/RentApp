import React from 'react';

export const Product = () => {
    const [reviews, setReviews] = React.useState([
        { user: 'John Doe', rating: 4, comment: 'Great product! I\'m very satisfied with my purchase.' },
        { user: 'Jane Smith', rating: 4, comment: 'Excellent quality and fast delivery.' }
        // Add more reviews as needed
    ]);

    const calculateAverageRating = () => {
        const totalRatings = reviews.length;
        if (totalRatings === 0) return 0;

        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / totalRatings;
    };

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < filledStars) {
                stars.push(<span key={i} style={{ color: "#ffc107" }}>&#9733;</span>);
            } else if (hasHalfStar && i === filledStars) {
                stars.push(<span key={i} style={{ color: "#ffc107" }}>&#9734;</span>);
            } else {
                stars.push(<span key={i}>&#9734;</span>);
            }
        }
        return stars;
    };

    return (
        <>
            <div style={{ width: "100%" }} className="hero">
                <section className='w-100'>
                    <div className="d-clmn">
                        <div className="productImage">
                            <img src="https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?t=st=1715895369~exp=1715898969~hmac=8991a5224c49c8fa1386ad60227922a29103d646c153503a83fa833d4d03ff67&w=1060" alt="" />
                        </div>
                        <div className='d-row priceContainer'>

                        </div>
                    </div>
                    <div className="productSection">
                        <div className='d-clmn productDetails'>
                            <h1>Product Name</h1>
                            <p className="clr-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ipsam blanditiis laboriosam, deserunt fuga, ipsa perferendis facere doloribus esse deleniti distinctio quod laborum facilis? Impedit, eaque at? Alias, debitis id. Qui, recusandae, temporibus voluptate reiciendis explicabo ipsum animi officia exercitationem minus eos earum dolores dolorum!</p>

                            <p className="clr-gray">Location here</p>

                            <h2>Ratings and reviews</h2>

                            <div className="container">
                                <div className="d-clmn">
                                    <div>{calculateAverageRating().toFixed(1)}</div>
                                    <div className="stars">
                                        {renderStars(calculateAverageRating())}
                                    </div>
                                </div>
                            </div>

                            <div className="container d-clmn">
                                {reviews.map((review, index) => (
                                    <div key={index} className="review">
                                        <div className="user">{review.user}</div>
                                        <div className="rating">{renderStars(review.rating)}</div>
                                        <div className="comment">{review.comment}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="d-clmn">
                                <h2>Business policies</h2>
                            </div>
                        </div>
                        <div className="d-row productBooking">
                            <h2 style={{ fontSize: "1.5em" }}>Book call</h2>
                            <div>
                                <button>Book Now</button>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    );
};
