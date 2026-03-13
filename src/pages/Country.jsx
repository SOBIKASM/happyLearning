import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Pages.css'
import SearchBox from '../components/SearchBox'
import LoadingWrapper from '../components/LoadingWrapper'
import Pagination from '../components/Pagination'
import FloatingSearch from '../components/FloatingSearch'
import { fetchData } from '../utils/api'

const Country = () => {
  const [input, setInput] = useState('')
  const [countries, setCountry] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    // Assuming fetchData is an async-style helper
    fetchData("country", (data) => {
      setCountry(data)
      setLoading(false) // 2. Turn off loading when data arrives
    })
  }, [])

  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [input]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <SearchBox
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => { }}
        placeholder="Enter the country name"
      />

      <FloatingSearch 
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search countries..."
      />
      <LoadingWrapper isLoading={loading} dataLength={filteredCountries.length}>
        <div className="body">
          {currentItems.map((country, index) => (
            <div key={index} className="card-container">
              <img
                src={country.flag || "/placeholder.jpg"}
                alt={`${country.name} flag`}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <h1>{country.name}</h1>
              <p>Capital: {country.capital}</p>
              <button
                className="more-btn"
                onClick={() =>
                  navigate(`/detail/country/${encodeURIComponent(country.name)}`)
                }
              >
                Learn more
              </button>
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredCountries.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </LoadingWrapper>
    </div>
  );
};

export default Country
