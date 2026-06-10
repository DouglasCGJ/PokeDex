import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../../services/PokeApi.js';
import PokemonCard from '../../components/PokemonCard.jsx';
import styles from './style.module.css';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error,   setError]           = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        const data = await fetchPokemonList(50);
        setPokemonList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadPokemon();
  }, []);

  return (
    <div className={styles.page}>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul className={styles.grid}>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.id}>
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default Home;