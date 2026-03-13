import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import LoadingWrapper from '../components/LoadingWrapper';
import { fetchData } from '../utils/api';

const Constellations = () => {
  const [input, setInput] = useState('');
  const [constellations, setConstellations] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); 
      await fetchData("constellations", setConstellations);
      setIsLoading(false); // Stop loading after data arrives
    };
    loadData();
  }, []);

  const filteredConstellations = constellations.filter(c =>
    c.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleLearnMore = (name) => {
    // Using absolute path "/" to prevent the URL stacking bug
    navigate(`/detail/constellation/${encodeURIComponent(name)}`);
  };

  const renderCard = (constellation, index) => (
    <div key={index} className='card-container'>
      <img 
        src={constellation.image || '/placeholder.jpg'} 
        alt={`${constellation.name} image`} 
        className='card-image'
        onError={(e) => e.target.src = '/placeholder.jpg'}
      />
      <h1>{constellation.name}</h1>
      {constellation.constellationGroup && <p>Family: {constellation.constellationGroup}</p>}
      <button className='more-btn' onClick={() => handleLearnMore(constellation.name)}>
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

      <LoadingWrapper isLoading={isLoading} dataLength={filteredConstellations.length}>
        <div className="body">
          {filteredConstellations.map((c, index) => renderCard(c, index))}
        </div>
      </LoadingWrapper>
    </>
  );
};

export default Constellations;