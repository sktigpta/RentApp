let list = ["Furniture", "Car", "Electronics", "Watches", "Health", "Camera", "Room", "Beauty", "Furniture", "Car", "Electronics", "Watches", "Health", "Camera", "Room", "Beauty"]


export const MiddleHeroSection = () => {
    return (
        <>
            <section className="DJKE84WKJ">
                {list.map((li, index) => (
                    <div className="card-MW" key={index}>
                        {li}
                    </div>
                ))}
            </section>
        </>
    )
}