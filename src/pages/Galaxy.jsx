import { useEffect, useState } from 'react'
import './Pages.css'
import SearchBox from '../components/SearchBox'
import { fetchData } from '../utils/api'

const Galaxy = () => {

  const [input, setInput] = useState('')
  const [galaxies, setGalaxy] = useState([])
  const [topMatches, setTopMatches] = useState([])

  useEffect(() => {
    fetchData("galaxy", setGalaxy)
  }, [])

  useEffect(() => {
    if (input.trim() === '') {
      setTopMatches([])
    } else {
      const filtered = galaxies.filter(g =>
        g.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 4) // Top 4 matches
      setTopMatches(filtered)
    }
  }, [input, galaxies])

  const topMatchIds = new Set(topMatches.map(g => g.name))
  const remainingGalaxies = galaxies.filter(g => !topMatchIds.has(g.name))

  return (
    <>
      <SearchBox
        value={input}
        onChange={e => setInput(e.target.value)}
        onSearch={() => {}}
        placeholder="Enter the galaxy name"
      />

      <div className='body'>
        {/* Top matches */}
        {topMatches.map((galaxy, index) => (
          <div key={`top-${index}`} className='card-container'>
            <img src={galaxy.image} alt={`${galaxy.name} image`} />
            <h1>{galaxy.name}</h1>
            <p>Type: {galaxy.type}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}

        {/* Remaining galaxies */}
        {remainingGalaxies.map((galaxy, index) => (
          <div key={`rest-${index}`} className='card-container'>
            <img src={galaxy.image} alt={`${galaxy.name} image`} />
            <h1>{galaxy.name}</h1>
            <p>Type: {galaxy.type}</p>
            <button className='more-btn'>Learn more</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Galaxy
