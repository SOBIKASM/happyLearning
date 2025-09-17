import { useEffect, useState } from 'react'
import './Pages.css'
import SearchBox from '../components/SearchBox'
import { fetchData } from '../utils/api'

const Constellations = () => {

  const [input, setInput] = useState('')
  const [constellations, setConstellation] = useState([])
  const [topMatches, setTopMatches] = useState([])

  useEffect(() => {
    fetchData("constellations", setConstellation)
  }, [])

  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([])
    } else {
      const filtered = constellations.filter(c =>
        c.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 4) // Top 4 matches
      setTopMatches(filtered)
    }
  }, [input, constellations])

  const topMatchIds = new Set(topMatches.map(c => c.name))
  const remainingConstellations = constellations.filter(c => !topMatchIds.has(c.name))

  return (
    <>
      <SearchBox
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
        placeholder="Enter the Constellation name"
      />

      <div className='body'>
        {/* Top matches */}
        {topMatches.map((constellation, index) => (
          <div key={`top-${index}`} className='card-container'>
            <img src={constellation.image} alt={`${constellation.name} image`} />
            <h1>{constellation.name}</h1>
            <p>Family: {constellation.constellationGroup}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}

        {/* Remaining constellations */}
        {remainingConstellations.map((constellation, index) => (
          <div key={`rest-${index}`} className='card-container'>
            <img src={constellation.image} alt={`${constellation.name} image`} />
            <h1>{constellation.name}</h1>
            <p>Family: {constellation.constellationGroup}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Constellations
