import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPokemonById } from '../../services/PokeApi.js';
import styles from './style.module.css';

function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        setLoading(true);
        const data = await fetchPokemonById(id);
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadPokemon();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error)   return <p>{error}</p>;
  if (!pokemon) return null;

  return (
    <div className={styles.page}>
      <button onClick={() => navigate('/')}>← Voltar</button>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Altura: {pokemon.height / 10} m</p>
      <p>Peso: {pokemon.weight / 10} kg</p>
      <p>Tipos: {pokemon.types.join(', ')}</p>
      <p>Habilidades: {pokemon.abilities.join(', ')}</p>
    </div>
  );
}
export default PokemonDetails;