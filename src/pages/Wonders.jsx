import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import LoadingWrapper from '../components/LoadingWrapper';
import { fetchData } from '../utils/api';

const Wonders = () => {
  const [input, setInput] = useState('');
  const [wonders, setWonders] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  // Fetch all wonders on mount
  useEffect(() => {
    fetchData("wonders", setWonders);
  }, []);

  // Filter top matches based on search input
  const filteredWonders = wonders.filter(w =>
    w.name.toLowerCase().includes(input.toLowerCase())
  );

  // Navigate to universal detail page
  const handleLearnMore = (name) => {
    // encodeURIComponent ensures special characters in name work correctly
    navigate(`/detail/wonder/${encodeURIComponent(name)}`);
  };

  // Render single wonder card
  const renderCard = (wonder, index) => (
    <div key={index} className='card-container'>
      <img 
        src={wonder.image || '/placeholder.jpg'} 
        alt={`${wonder.name} image`} 
        className='card-image'
        onError={(e) => e.target.src = '/placeholder.jpg'}
      />
      <h1>{wonder.name}</h1>
      {wonder.location?.country && <p>Location: {wonder.location.country}</p>}
      <button
        className='more-btn'
        onClick={() => handleLearnMore(wonder.name)}
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
        placeholder="Enter the Wonder name"
      />

      <div className='body'>
        {filteredWonders.map((wonder, index) => renderCard(wonder, index))}
        {filteredWonders.length === 0 && <div className="no-data">No wonders found.</div>}
      </div>
    </>
  );
};

export default Wonders;
