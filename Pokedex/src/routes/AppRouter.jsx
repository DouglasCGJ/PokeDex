import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/index.jsx';
import PokemonDetails from '../pages/pokemonDetails/index.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
}

export default AppRoutes;