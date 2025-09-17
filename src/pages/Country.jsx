import { useEffect, useState } from 'react'
import './Pages.css'
import SearchBox from '../components/SearchBox'
import { fetchData } from '../utils/api'

const Country = () => {

  const [input, setInput] = useState('')
  const [countries, setCountry] = useState([])
  const [topMatches, setTopMatches] = useState([])

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

  // Create a set of IDs of top matches to filter duplicates
  const topMatchIds = new Set(topMatches.map(c => c.name))

  // Remaining countries excluding top matches
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
        {/* Display top matches first */}
        {topMatches.map((country, index) => (
          <div key={`top-${index}`} className='card-container'>
            <img src={country.flag} alt={`${country.name} flag`} />
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}

        {/* Display remaining countries */}
        {remainingCountries.map((country, index) => (
          <div key={`rest-${index}`} className='card-container'>
            <img src={country.flag} alt={`${country.name} flag`} />
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Country
