import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Pages.css'
import SearchBox from '../components/SearchBox'
import { fetchData } from '../utils/api'

const Country = () => {
  const [input, setInput] = useState('')
  const [countries, setCountry] = useState([])
  const [topMatches, setTopMatches] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData("country", setCountry)
  }, [])

  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([])
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 4)
      setTopMatches(filtered)
    }
  }, [input, countries])

  const topMatchIds = new Set(topMatches.map(c => c.name))
  const remainingCountries = countries.filter(c => !topMatchIds.has(c.name))

  return (
    <div>
      <SearchBox
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
        placeholder="Enter the country name"
      />

      <div className='body'>
        {topMatches.map((country, index) => (
          <div key={`top-${index}`} className='card-container'>
            <img src={country.flag} alt={`${country.name} flag`} />
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <button
              className='more-btn'
              onClick={() => navigate(`/country/${country.name}`)}
            >
              Learn more
            </button>
          </div>
        ))}

        {remainingCountries.map((country, index) => (
          <div key={`rest-${index}`} className='card-container'>
            <img src={country.flag} alt={`${country.name} flag`} />
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <button
              className='more-btn'
              onClick={() => navigate(`/detail/country/${country.name}`)}
            >
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Country
