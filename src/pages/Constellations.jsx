import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { fetchData } from '../utils/api';

const Constellations = () => {
  const [input, setInput] = useState('');
  const [constellations, setConstellations] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  // Fetch all constellations on mount
  useEffect(() => {
    fetchData("constellations", setConstellations);
  }, []);

  // Update top matches when input changes
  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([]);
    } else {
      const filtered = constellations
        .filter(c => c.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 4);
      setTopMatches(filtered);
    }
  }, [input, constellations]);

  // Separate remaining constellations from top matches
  const topMatchIds = new Set(topMatches.map(c => c.name));
  const remainingConstellations = constellations.filter(c => !topMatchIds.has(c.name));

  // Navigate to universal detail page
  const handleLearnMore = (name) => {
    navigate(`/detail/constellation/${encodeURIComponent(name)}`);
  };

  // Render a single constellation card
  const renderCard = (constellation, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className='card-container'>
      <img 
        src={constellation.image || '/placeholder.jpg'} 
        alt={`${constellation.name} image`} 
        className='card-image'
      />
      <h1>{constellation.name}</h1>
      {constellation.constellationGroup && <p>Family: {constellation.constellationGroup}</p>}
      <button
        className='more-btn'
        onClick={() => handleLearnMore(constellation.name)}
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
        placeholder="Enter the Constellation name"
      />

      <div className='body'>
        {topMatches.map((c, index) => renderCard(c, index, 'top'))}
        {remainingConstellations.map((c, index) => renderCard(c, index, 'rest'))}
      </div>
    </>
  );
};

export default Constellations;
