import { useState } from 'react';
import './App.css'
import Card from './components/Card.jsx'
import Modal from './components/Modal.jsx';
import { Input } from 'antd';
const { Search } = Input;

function App() {

  const initialPokemons = [
    { id: "#0001", name: "Bulbasaur", types: ["Grass", "Poison"], image: "./001.png", class: "Grass" },
    { id: "#0002", name: "Ivysaur", types: ["Grass", "Poison"], image: "./002.png", class: "Grass" },
    { id: "#0003", name: "Venusaur", types: ["Grass", "Poison"], image: "./003.png", class: "Grass" },
    { id: "#0004", name: "Charmander", types: ["Fire"], image: "./004.png", class: "Fire" },
    { id: "#0005", name: "Charmeleon", types: ["Fire"], image: "./005.png", class: "Fire" },
    { id: "#0006", name: "Charizard", types: ["Fire", "Flying"], image: "./006.png", class: "Fire" },
    { id: "#0007", name: "Squirtle", types: ["Water"], image: "./007.png", class: "Water" },
    { id: "#0008", name: "Wartortle", types: ["Water"], image: "./008.png", class: "Water" },
    { id: "#0009", name: "Blastoise", types: ["Water"], image: "./009.png", class: "Water" },
    { id: "#0010", name: "Caterpie", types: ["Bug"], image: "./010.png", class: "Bug" },
    { id: "#0011", name: "Metapod", types: ["Bug"], image: "./011.png", class: "Bug" },
    { id: "#0012", name: "Butterfree", types: ["Bug", "Flying"], image: "./012.png", class: "Bug" },
    { id: "#0013", name: "Weedle", types: ["Bug", "Poison"], image: "./013.png", class: "Bug" },
    { id: "#0014", name: "Kakuna", types: ["Bug", "Poison"], image: "./014.png", class: "Bug" },
    { id: "#0015", name: "Beedrill", types: ["Bug", "Poison"], image: "./015.png", class: "Bug" },
  ];

  // tạo ra 1 list các hệ từ data pokemon ban đầu

  const listClass = {};
  initialPokemons.forEach((pokemon) => {
    listClass[pokemon.class] = 1;
  });

  const [showModal, setShowModal] = useState(false)
  const [pokemonSelected, setPokemonSelected] = useState("")
  const [pokeSearch, setPokeSearch] = useState("")

  const handleShowModal = () => {
    setShowModal(true)
  }
  const hanleCloseModal = () => {
    setShowModal(false)
    setPokemonSelected(null)
  }
  const handlePokemonSelected = (pokemonSelected) => {
    setPokemonSelected(pokemonSelected)
  }

  const filterPoke = initialPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(pokeSearch.toLowerCase())
  })


  return (
    <>
      <div className='container_'>
        <h1 style={{ textAlign: "center" }}>Pokemom</h1>
        <div className='filter'>
          <div>
            <p>
              Lọc hệ:
            </p>
            <div className='listCheckbox'>
              {Object.keys(listClass).map(key => {
                return <p className="item" key={key}>
                  <input type="checkbox" id={key} />
                  <label htmlFor={key}>{key}</label>
                </p>
              })
              }
            </div>
          </div>
          <div className='search_wrapper'>
            <input type="text" value={pokeSearch} onChange={(e) => setPokeSearch(e.target.value)} />
            <button>Search</button>
          </div>
        </div>
        <div className='card_wrapper'>
          {
            filterPoke.length > 0 ? filterPoke.map((pokemon) => {
              return <Card pokemonData={pokemon} key={pokemon.id} onClick={handleShowModal} handlePokemonSelected={handlePokemonSelected} />
            }) : <h1>No Data</h1>
          }

        </div>
      </div>
      {showModal && <Modal pokemonSelected={pokemonSelected} hanleCloseModal={hanleCloseModal} />}
    </>
  )
}

export default App
