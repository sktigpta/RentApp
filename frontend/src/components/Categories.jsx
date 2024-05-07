let category = ["Bike", "Car", "Gas & Stoves", "Furniture", "Tent", "Camera", "generator", "Room", "Sound System"]

export const Categories = () => {
    return (
        <>
            <div className="container-card">
                {category.map((category, index) => (
                    <div className="card">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <p style={{marginTop:"0.5em"}} key={index}>{category}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
