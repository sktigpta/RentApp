import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';


const BusinessPage = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(`http://localhost:2005/api/business/${businessId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBusiness(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching business:', error);
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <>
      <section>
        <div className="name">
          <h1>{business.name}</h1>
        </div>
        <div className="details">

          <div style={{ marginTop: "0.5em" }} className="d-row spc-between">
            <div className="Information">
              <p style={{ minHeight: "3em", maxHeight: "4em" }} className='clr-gray'>{business.about}</p>

              <div style={{ gap: "0.5em" }} className="d-clmn">
                <div className="container d-clmn">
                  <h3>Address</h3>
                  <p className="clr-gray">{business.address.street}</p>
                  <p className="clr-gray">{business.address.area}</p>
                  <p className="clr-gray">{business.address.district}</p>
                  <p className="clr-gray">{business.address.state}</p>
                  <p className="clr-gray">{business.address.country}</p>
                </div>

                <div className="container d-clmn">
                  <h3>Address</h3>
                  {business &&
                    <>
                      <div>
                        <p className="clr-gray">
                          <a href={"tel:" + business.phone}>{business.phone}</a>
                        </p>
                        <p className="clr-gray">
                          <a href={"mailto:" + business.email}>{business.email}</a>
                        </p>
                      </div>

                    </>}
                </div>
              </div>

            </div>


            <div style={{ width: "62%" }} className="d-clmn">
              <h2> Products</h2>
              <div className="items-list">
                <ProductsList />
              </div>
            </div>
          </div>

        </div>
      </section >
    </>
  );
};

export default BusinessPage;
