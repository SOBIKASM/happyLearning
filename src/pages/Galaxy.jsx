import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import LoadingWrapper from '../components/LoadingWrapper';
import { fetchData } from '../utils/api';

const Galaxy = () => {
  const [input, setInput] = useState('');
  const [galaxies, setGalaxies] = useState([]);
  const navigate = useNavigate();

  // Fetch all galaxies on mount
  useEffect(() => {
    fetchData("galaxy", setGalaxies); 
  }, []);

  const filteredGalaxies = galaxies.filter(g =>
    g.name.toLowerCase().includes(input.toLowerCase())
  );

  // Navigate to universal detail page
  const handleLearnMore = (name) => {
    navigate(`/detail/galaxy/${encodeURIComponent(name)}`);
  };

  // Render a single galaxy card
  const renderCard = (galaxy, index) => (
    <div key={index} className='card-container'>
      <img 
        src={galaxy.image || '/placeholder.jpg'} 
        alt={`${galaxy.name} image`} 
        className='card-image'
        onError={(e) => e.target.src = '/placeholder.jpg'}
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

      <LoadingWrapper isLoading={galaxies.length === 0 && input === ''} dataLength={filteredGalaxies.length}>
        <div className='body'>
          {filteredGalaxies.map((g, index) => renderCard(g, index))}
        </div>
      </LoadingWrapper>
    </>
  );
};

export default Galaxy;
