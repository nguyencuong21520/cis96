import { useState } from 'react';
import './App.css'
import Card from './components/Card.jsx'
import Modal from './components/Modal.jsx';
import { Input } from 'antd';
const { Search } = Input;

function App() {

  const initialPokemons = [
    { id: "#0001", name: "Bulbasaur", types: ["Grass", "Poison"], image: "./001.png" },
    { id: "#0002", name: "Ivysaur", types: ["Grass", "Poison"], image: "./002.png" },
    { id: "#0003", name: "Venusaur", types: ["Grass", "Poison"], image: "./003.png" },
    { id: "#0004", name: "Charmander", types: ["Fire"], image: "./004.png" },
    { id: "#0005", name: "Charmeleon", types: ["Fire"], image: "./005.png" },
    { id: "#0006", name: "Charizard", types: ["Fire", "Flying"], image: "./006.png" },
    { id: "#0007", name: "Squirtle", types: ["Water"], image: "./007.png" },
    { id: "#0008", name: "Wartortle", types: ["Water"], image: "./008.png" },
    { id: "#0009", name: "Blastoise", types: ["Water"], image: "./009.png" },
    { id: "#0010", name: "Caterpie", types: ["Bug"], image: "./010.png" },
    { id: "#0011", name: "Metapod", types: ["Bug"], image: "./011.png" },
    { id: "#0012", name: "Butterfree", types: ["Bug", "Flying"], image: "./012.png" },
    { id: "#0013", name: "Weedle", types: ["Bug", "Poison"], image: "./013.png" },
    { id: "#0014", name: "Kakuna", types: ["Bug", "Poison"], image: "./014.png" },
    { id: "#0015", name: "Beedrill", types: ["Bug", "Poison"], image: "./015.png" },
  ];

  // Tạo ra 1 list các hệ từ data pokemon ban đầu
  const listClass = {};
  initialPokemons.forEach((pokemon) => {
    pokemon.types.forEach(type => {
      listClass[type] = true;
    });
  });

  const [showModal, setShowModal] = useState(false)
  const [pokemonSelected, setPokemonSelected] = useState("")
  const [pokeSearch, setPokeSearch] = useState("")
  const [pokemons, setPokemons] = useState(initialPokemons)
  const [selectedTypes, setSelectedTypes] = useState(listClass);

  const handleShowModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setPokemonSelected(null)
  }
  const handlePokemonSelected = (pokemonSelected) => {
    setPokemonSelected(pokemonSelected)
  }
  const handleSearch = () => {
    const filterPoke = initialPokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(pokeSearch.toLowerCase());
      const matchesType = pokemon.types.some(type => selectedTypes[type]);
      return matchesSearch && matchesType;
    })

    setPokemons(filterPoke)
  }
  const handleTypeChange = (type) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }

  return (
    <>
      <div className='container_'>
        <h1 style={{ textAlign: "center" }}>Pokemon</h1>
        <div className='filter'>
          <div>
            <p>
              Lọc hệ:
            </p>
            <div className='listCheckbox'>
              {Object.keys(listClass).map(key => {
                return <p className="item" key={key}>
                  <input type="checkbox" id={key} checked={selectedTypes[key]} onChange={() => handleTypeChange(key)} />
                  <label htmlFor={key}>{key}</label>
                </p>
              })
              }
            </div>
          </div>
          <div className='search_wrapper'>
            <input type="text" value={pokeSearch} onChange={(e) => setPokeSearch(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className='card_wrapper'>
          {
            pokemons.length > 0 ? pokemons.map((pokemon) => {
              return <Card pokemonData={pokemon} key={pokemon.id} onClick={handleShowModal} handlePokemonSelected={handlePokemonSelected} />
            }) : <h1>No Data</h1>
          }

        </div>
      </div>
      {showModal && <Modal pokemonSelected={pokemonSelected} handleCloseModal={handleCloseModal} />}
    </>
  )
}

export default App
