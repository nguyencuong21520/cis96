import { useState, useEffect } from 'react';
import './App.css'
import Card from './components/Card.jsx'
import Modal from './components/Modal.jsx';
import { Input } from 'antd';
const { Search } = Input;

function App() {
    const [showModal, setShowModal] = useState(false);
    const [pokemonSelected, setPokemonSelected] = useState("");
    const [pokeSearch, setPokeSearch] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [listClass, setListClass] = useState({});
    const [selectedTypes, setSelectedTypes] = useState({});

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
                const data = await response.json();
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return await res.json();
                    })
                );


                const formattedPokemons = pokemonDetails.map(pokemon => ({
                    id: `#${String(pokemon.id).padStart(4, '0')}`,
                    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                    types: pokemon.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)),
                    image: pokemon.sprites.front_default,
                }));

                const uniqueTypes = {};
                formattedPokemons.forEach(pokemon => {
                    pokemon.types.forEach(type => {
                        uniqueTypes[type] = true;
                    });
                });

                setPokemons(formattedPokemons);
                setFilteredPokemons(formattedPokemons);
                setListClass(uniqueTypes);
                setSelectedTypes(uniqueTypes);
            } catch (error) {
                console.error('Failed to fetch Pokémon data:', error);
            }
        };

        fetchPokemons();
    }, []);

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setPokemonSelected(null);
    };
    const handlePokemonSelected = (pokemonSelected) => {
        setPokemonSelected(pokemonSelected);
    };
    const handleSearch = () => {
        const filterPoke = pokemons.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(pokeSearch.toLowerCase());
            const matchesType = pokemon.types.some(type => selectedTypes[type]);
            return matchesSearch && matchesType;
        });

        setFilteredPokemons(filterPoke);
    };
    const handleTypeChange = (type) => {
        setSelectedTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    console.log("selectedTypes", selectedTypes);


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
                        filteredPokemons.length > 0 ? filteredPokemons.map((pokemon) => {
                            return <Card pokemonData={pokemon} key={pokemon.id} onClick={handleShowModal} handlePokemonSelected={handlePokemonSelected} />
                        }) : <h1>No Data</h1>
                    }

                </div>
            </div>
            {showModal && <Modal pokemonSelected={pokemonSelected} handleCloseModal={handleCloseModal} />}
        </>
    );
}

export default App;
