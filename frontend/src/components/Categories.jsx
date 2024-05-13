let category = ["Furniture", "Car", "Electronics", "Watches", "Health", "Camera", "Room", "Beauty", ""]

export const Categories = () => {
    return (
        <>
            <div style={{ cursor: "pointer" }} className="container-card">
                {category.map((category, index) => (
                    <div className="container">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <p style={{ margin: "0.3em  0 0 0.3em" }} key={index}>
                            {category}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}
