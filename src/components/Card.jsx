import "./card.css"
const Card = (props) => {
  const { pokemonData, onClick, handlePokemonSelected } = props

  return <>
    <div className="card" onClick={() => {
      handlePokemonSelected(pokemonData)
      onClick()
    }}>
      <img src={pokemonData.image} alt="" />
      <p className="pokemon_id">{pokemonData.id}</p>
      <p className="pokemon_name">{pokemonData.name}</p>
      <div className="pokemon_class_wrapper">
        {
          pokemonData.types.map((type_, index) => {
            return (
              <span className={type_} key={index}>{type_}</span>
            )
          })
        }
      </div>
    </div>
  </>
}

export default Card

