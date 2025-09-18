import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { fetchData } from '../utils/api';

const Galaxy = () => {
  const [input, setInput] = useState('');
  const [galaxies, setGalaxy] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("galaxy", setGalaxy);
  }, []);

  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([]);
    } else {
      const filtered = galaxies
        .filter(g => g.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 4);
      setTopMatches(filtered);
    }
  }, [input, galaxies]);

  const topMatchIds = new Set(topMatches.map(g => g.name));
  const remainingGalaxies = galaxies.filter(g => !topMatchIds.has(g.name));

  const handleLearnMore = (name) => {
    navigate(`/detail/galaxy/${name}`);
  };

  const renderCard = (galaxy, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className='card-container'>
      <img src={galaxy.image} alt={`${galaxy.name} image`} />
      <h1>{galaxy.name}</h1>
      {galaxy.type && <p>Type: {galaxy.type}</p>}
      <button
        className='more-btn'
        onClick={() => handleLearnMore(galaxy.name)}
      >
        Learn more
      </button>
    </div>
  );

  return (
    <>
      <SearchBox
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
        placeholder="Enter the galaxy name"
      />

      <div className='body'>
        {topMatches.map((galaxy, index) => renderCard(galaxy, index, 'top'))}
        {remainingGalaxies.map((galaxy, index) => renderCard(galaxy, index, 'rest'))}
      </div>
    </>
  );
};

export default Galaxy;
