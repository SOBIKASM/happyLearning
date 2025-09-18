import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { fetchData } from '../utils/api';

const Galaxy = () => {
  const [input, setInput] = useState('');
  const [galaxies, setGalaxies] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  // Fetch all galaxies on mount
  useEffect(() => {
    fetchData("galaxies", setGalaxies); // make sure endpoint matches your backend collection name
  }, []);

  // Update top matches when input changes
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

  // Separate remaining galaxies from top matches
  const topMatchIds = new Set(topMatches.map(g => g.name));
  const remainingGalaxies = galaxies.filter(g => !topMatchIds.has(g.name));

  // Navigate to universal detail page
  const handleLearnMore = (name) => {
    navigate(`/detail/galaxy/${encodeURIComponent(name)}`);
  };

  // Render a single galaxy card
  const renderCard = (galaxy, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className='card-container'>
      <img 
        src={galaxy.image || '/placeholder.jpg'} 
        alt={`${galaxy.name} image`} 
        className='card-image'
      />
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
        {topMatches.map((g, index) => renderCard(g, index, 'top'))}
        {remainingGalaxies.map((g, index) => renderCard(g, index, 'rest'))}
      </div>
    </>
  );
};

export default Galaxy;
