import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { fetchData } from '../utils/api';

const Constellations = () => {
  const [input, setInput] = useState('');
  const [constellations, setConstellation] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("constellations", setConstellation);
  }, []);

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

  const topMatchIds = new Set(topMatches.map(c => c.name));
  const remainingConstellations = constellations.filter(c => !topMatchIds.has(c.name));

  const handleLearnMore = (name) => {
    navigate(`/detail/constellation/${name}`);
  };

  const renderCard = (constellation, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className='card-container'>
      <img src={constellation.image} alt={`${constellation.name} image`} />
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
        {topMatches.map((constellation, index) => renderCard(constellation, index, 'top'))}
        {remainingConstellations.map((constellation, index) => renderCard(constellation, index, 'rest'))}
      </div>
    </>
  );
};

export default Constellations;
