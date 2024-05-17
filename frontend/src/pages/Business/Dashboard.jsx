import { Link } from "react-router-dom";
import ProductsList from "../../components/ProductsList";
import { useAuth } from "../../storeing-data/auth"

export const Dashboard = () => {
    const { business } = useAuth();
    console.log(business);

    if (!business) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <section className="d-clmn">
                <div className="upper">
                    <h1>{business.name}</h1>
                    <Link to='/add-product'><button>Add Product</button></Link>
                </div>
                <div className="information">

                    <div style={{ marginTop: "0.5em" }} className="d-row spc-between">
                        <div className="business-info">
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
                            <div className="list">
                                <ProductsList />
                            </div>
                        </div>
                    </div>

                </div>
            </section >
        </>
    );
}
