let suggetion = ["Furniture", "Car", "Electronics", "Watches", "Health", "Camera", "Room", "Beauty"]


export const RightHeroSection = () => {
    return (
        <>
            <aside className="OIJFD8GFD">
                <div className="card-QW">
                    <p style={{ fontSize: "0.8em" }}>Needs attention</p>
                    <p style={{ margin: "1em 0em" }}>What are you looking for?</p>

                    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "0.3em" }}>
                        {suggetion.map((sugge, index) => (
                            <div className="graybtn" key={index}>
                                {sugge}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ height: "50vh" }} className="card-QW">

                    <p> More Cards as per needed</p>
                </div>
            </aside>
        </>
    )
}