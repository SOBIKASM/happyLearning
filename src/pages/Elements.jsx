import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { fetchData } from '../utils/api';
import { categoryColors } from '../utils/categoryColors';

const Elements = () => {
  const [input, setInput] = useState('');
  const [elements, setElements] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  // Fetch all elements on mount
  useEffect(() => {
    fetchData("elements", setElements);
  }, []);

  // Update top matches when input changes
  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([]);
    } else {
      const filtered = elements
        .filter(el => el.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 4);
      setTopMatches(filtered);
    }
  }, [input, elements]);

  // Separate remaining elements from top matches
  const topMatchIds = new Set(topMatches.map(e => e.name));
  const remainingElements = elements.filter(e => !topMatchIds.has(e.name));

  // Navigate to universal detail page
  const handleLearnMore = (name) => {
    navigate(`/detail/element/${encodeURIComponent(name)}`);
  };

  // Render single element card
  const renderCard = (element, index, keyPrefix) => {
    const bgColor = categoryColors[element.category] || "#fff";

    return (
      <div key={`${keyPrefix}-${index}`} className='card-container'>
        <div className='image-container' style={{ backgroundColor: bgColor }}>
          <p className='an'>{element.atomicNumber}</p>
          <h1 className='symbol'>{element.symbol}</h1>
          <p className='am'>{Math.round(element.atomicMass)}</p>
        </div>
        <div className='root'>
          <h1>{element.name}</h1>
          <p>AN: {element.atomicNumber}</p>
          <p>MN: {element.atomicMass}</p>
          <button
            className='more-btn'
            onClick={() => handleLearnMore(element.name)}
          >
            Learn more
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <SearchBox
        type="text"
        placeholder='Enter the Element name'
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
      />

      <div className='body'>
        {topMatches.map((element, index) => renderCard(element, index, 'top'))}
        {remainingElements.map((element, index) => renderCard(element, index, 'rest'))}
      </div>
    </>
  );
};

export default Elements;
