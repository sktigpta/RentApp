let category = ["Furniture", "Car", "Electronics", "Watches", "Health", "Camera","Room", "Beauty"]

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
