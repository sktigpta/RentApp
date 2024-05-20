import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import addProduct from "../../assets/add-product.png";


const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:2005/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  console.log(product);

  return (
    <>
      <section>
        <div className="name">
          <h1>{product.name}</h1>
        </div>


        <div style={{ marginTop: "0.5em" }} className="d-row spc-between">
          <div className="Information">
            <p style={{ minHeight: "3em", maxHeight: "4em" }} className='clr-gray'>{product.description}</p>

            <div style={{ gap: "0.5em" }} className="d-clmn">
              <div className="container d-clmn">


                {
                  product.productImage ? (
                    <img src={productImage} alt="Selected Product" />
                  ) : (
                    <img src={addProduct} />
                  )}


              </div>
              <div className="container d-row">

                <h3>From : </h3>
                <h1>{product.pricePerDay}</h1>

              </div>

              {product.categories &&
                product.categories.map((category, index) => (
                  < div className="container d-clmn">
                    <div key={index}>{category}</div>
                  </div>
                ))
              }
            </div>

          </div>


          <div style={{ width: "62%" }} className="d-clmn">
            <h2> Products Details</h2>
            <div className="items-list">



            </div>
          </div>
        </div>

      </section >

    </>
  );
};

export default ProductPage;
