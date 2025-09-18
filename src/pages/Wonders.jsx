import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { fetchData } from '../utils/api';

const Wonders = () => {
  const [input, setInput] = useState('');
  const [wonders, setWonders] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("wonders", setWonders);
  }, []);

  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([]);
    } else {
      const filtered = wonders
        .filter(w => w.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 4);
      setTopMatches(filtered);
    }
  }, [input, wonders]);

  const topMatchIds = new Set(topMatches.map(w => w.name));
  const remainingWonders = wonders.filter(w => !topMatchIds.has(w.name));

  const handleLearnMore = (name) => {
    navigate(`/detail/wonder/${name}`);
  };

  const renderCard = (wonder, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className='card-container'>
      <img src={wonder.image} alt={`${wonder.name} image`} />
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
        {topMatches.map((wonder, index) => renderCard(wonder, index, 'top'))}
        {remainingWonders.map((wonder, index) => renderCard(wonder, index, 'rest'))}
      </div>
    </>
  );
};

export default Wonders;
