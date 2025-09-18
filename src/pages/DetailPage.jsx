import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/api';
import './Pages.css';

const DetailPage = () => {
  const { type, name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const endpoint = type === 'element' ? 'elements' : type;
        const result = await fetchData(endpoint, null, name); 
        setData(result);
      } catch (err) {
        console.error('Error fetching detail:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [type, name]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!data) return <p className="error">No data found for {name}</p>;

  return (
    <div className="detail-page">
      <h1 className="detail-title">{data.name}</h1>

      {/* Display image if available */}
      {data.image && (
        <div className="detail-image-container">
          <img src={data.image} alt={data.name} className="detail-image" />
        </div>
      )}

      <div className="detail-content">
        {/* Country specific */}
        {type === 'country' && (
          <>
            <p><strong>Capital:</strong> {data.capital}</p>
            <p><strong>Continent:</strong> {data.continent}</p>
            <p><strong>Population:</strong> {data.population?.toLocaleString()}</p>
            <p><strong>Area:</strong> {data.area?.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> {data.languages.join(', ')}</p>
            <p><strong>Currency:</strong> {data.currency?.name} ({data.currency?.code})</p>
            <p><strong>National Symbols:</strong> Animal: {data.nationalSymbols?.animal}, Bird: {data.nationalSymbols?.bird}, Flower: {data.nationalSymbols?.flower}</p>
            <p><strong>Landmark:</strong> {data.landmark}</p>
            <p><strong>Fun Fact:</strong> {data.funFact}</p>
          </>
        )}

        {/* Element specific */}
        {type === 'element' && (
          <>
            <p><strong>Symbol:</strong> {data.symbol}</p>
            <p><strong>Atomic Number:</strong> {data.atomicNumber}</p>
            <p><strong>Atomic Mass:</strong> {data.atomicMass}</p>
            <p><strong>Category:</strong> {data.category}</p>
            <p><strong>State at Room Temp:</strong> {data.stateAtRoomTemp}</p>
            <p><strong>Electronegativity:</strong> {data.electronegativity}</p>
            <p><strong>Ionization Energy:</strong> {data.ionizationEnergy}</p>
            <p><strong>Oxidation States:</strong> {data.oxidationStates?.join(', ')}</p>
            <p><strong>Major Compounds:</strong> {data.majorCompounds?.join(', ')}</p>
            <p><strong>Uses:</strong> {data.commonUses?.join(', ')}</p>
            <p><strong>Fun Fact:</strong> {data.funFacts}</p>
          </>
        )}

        {/* Galaxy specific */}
        {type === 'galaxy' && (
          <>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Constellation:</strong> {data.constellation}</p>
            <p><strong>Distance:</strong> {data.distance}</p>
            <p><strong>Diameter:</strong> {data.diameter}</p>
            <p><strong>Stars:</strong> {data.stars}</p>
            <p><strong>Black Hole:</strong> {data.blackHole}</p>
            <p><strong>Mass:</strong> {data.mass}</p>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Notable Features:</strong> {data.notableFeatures?.join(', ')}</p>
            <p><strong>Fun Fact:</strong> {data.funFact}</p>
          </>
        )}

        {/* Constellation specific */}
        {type === 'constellation' && (
          <>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Family:</strong> {data.constellationGroup}</p>
            <p><strong>Brightest Stars:</strong> {data.brightestStars?.join(', ')}</p>
            <p><strong>Deep Sky Objects:</strong> {data.deepSkyObjects?.join(', ')}</p>
            <p><strong>Mythology:</strong> {data.mythology}</p>
            <p><strong>Best Viewing Season:</strong> {data.bestViewingSeason}</p>
            <p><strong>Fun Fact:</strong> {data.funFact}</p>
          </>
        )}

        {/* Wonder specific */}
        {type === 'wonder' && (
          <>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Location:</strong> {data.location?.country}, {data.location?.region}</p>
            <p><strong>Built Year:</strong> {data.builtYear}</p>
            <p><strong>Architectural Style:</strong> {data.architecturalStyle}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Significance:</strong> {data.significance}</p>
            <p><strong>Visitors Per Year:</strong> {data.visitorsPerYear}</p>
            <p><strong>Materials:</strong> {data.materials?.join(', ')}</p>
            <p><strong>Conservation Status:</strong> {data.conservationStatus}</p>
            <p><strong>Fun Fact:</strong> {data.funFact}</p>
            <p><strong>More Info:</strong> {data.moreInfoLinks?.map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            ))}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
