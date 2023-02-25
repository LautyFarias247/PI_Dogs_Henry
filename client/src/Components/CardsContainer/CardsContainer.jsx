import style from "./CardsContainer.module.css"
import Card from "../Card/Card"


const CardsContainer = ({slicedDogs}) => {
    return (
        <div className={style.container}>
            {slicedDogs.map(dog => {
                return  <Card
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperaments.join(", ")}
                    weight={dog.weight}
                    id={dog.id}
                    key={dog.id }
                />  
            })}
        </div>
    )
}

export default CardsContainer
