import { useEffect, useState } from 'react'
import './Pages.css'
import SearchBox from '../components/SearchBox'
import { fetchData } from '../utils/api'

const Wonders = () => {

  const [input, setInput] = useState('')
  const [wonders, setWonders] = useState([])
  const [topMatches, setTopMatches] = useState([])

  useEffect(() => {
    fetchData("wonders", setWonders)
  }, [])

  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([])
    } else {
      const filtered = wonders.filter(w =>
        w.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 4) // Top 4 matches
      setTopMatches(filtered)
    }
  }, [input, wonders])

  const topMatchIds = new Set(topMatches.map(w => w.name))
  const remainingWonders = wonders.filter(w => !topMatchIds.has(w.name))

  return (
    <>
      <SearchBox
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
        placeholder="Enter the Wonder name"
      />

      <div className='body'>
        {/* Top matches */}
        {topMatches.map((wonder, index) => (
          <div key={`top-${index}`} className='card-container'>
            <img src={wonder.image} alt={`${wonder.name} image`} />
            <h1>{wonder.name}</h1>
            <p>Location: {wonder.location.country}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}

        {/* Remaining wonders */}
        {remainingWonders.map((wonder, index) => (
          <div key={`rest-${index}`} className='card-container'>
            <img src={wonder.image} alt={`${wonder.name} image`} />
            <h1>{wonder.name}</h1>
            <p>Location: {wonder.location.country}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Wonders
