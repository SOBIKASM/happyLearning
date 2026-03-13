import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import LoadingWrapper from '../components/LoadingWrapper';
import Pagination from '../components/Pagination';
import FloatingSearch from '../components/FloatingSearch';
import { fetchData } from '../utils/api';
import { categoryColors } from '../utils/categoryColors';

const Elements = () => {
  const [input, setInput] = useState('');
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  // Fetch all elements on mount
  useEffect(() => {
    setLoading(true);
    fetchData("elements", (data) => {
      setElements(data);
      setLoading(false);
    });
  }, []);

  const filteredElements = elements.filter(el =>
    el.name.toLowerCase().includes(input.toLowerCase()) ||
    el.symbol.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [input]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredElements.slice(indexOfFirstItem, indexOfLastItem);

  // Navigate to universal detail page
  const handleLearnMore = (name) => {
    navigate(`/detail/element/${encodeURIComponent(name)}`);
  };

  // Render single element card
  const renderCard = (element, index) => {
    const bgColor = categoryColors[element.category] || "#fff";

    return (
      <div key={index} className='card-container'>
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
        placeholder='Enter Element name or symbol'
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
      />

      <FloatingSearch 
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search elements..."
      />

      <LoadingWrapper isLoading={loading} dataLength={filteredElements.length}>
        <div className='body'>
          {currentItems.map((element, index) => renderCard(element, index))}
        </div>
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredElements.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </LoadingWrapper>
    </>
  );
};

export default Elements;
