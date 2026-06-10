import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ id, name, image }) {
  const navigate = useNavigate();
  const formattedId = String(id).padStart(3, '0');

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <span className={styles.number}>#{formattedId}</span>
      <div className={styles.imageWrapper}>
        <img src={image} alt={`Imagem de ${name}`} className={styles.image} />
      </div>
      <h2 className={styles.name}>{name}</h2>
    </article>
  );
}

export default PokemonCard;
