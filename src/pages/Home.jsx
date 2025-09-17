import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartExploring = () => {
    navigate('/country');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', minHeight: '80vh' }}>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#ff6f91' }}>
        Welcome to Happy Learning
      </h1>
      
      <p style={{ maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '1.1rem', color: '#333' }}>
        Discover fascinating facts about countries, explore the elements of the periodic table, learn about world wonders, galaxies, constellations, and more — all in one place! Happy Learning is designed to make education fun, interactive, and easy to access for everyone.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h3>Countries</h3>
          <p>Explore culture, geography, and fun facts about countries across the globe.</p>
        </div>
        <div style={cardStyle}>
          <h3>Periodic Table</h3>
          <p>Learn about elements, their properties, and their uses in everyday life.</p>
        </div>
        <div style={cardStyle}>
          <h3>World Wonders</h3>
          <p>Uncover the stories, architecture, and significance of wonders around the world.</p>
        </div>
        <div style={cardStyle}>
          <h3>Galaxy</h3>
          <p>Discover the beauty and mysteries of galaxies beyond our solar system.</p>
        </div>
        <div style={cardStyle}>
          <h3>Constellation</h3>
          <p>Identify star patterns and learn their names, myths, and origins.</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#ff6f91' }}>About This Project</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '1rem', color: '#000000ff' }}>
          Happy Learning is a passion project aimed at providing easily digestible educational content. Whether you're a student, a curious learner, or someone who loves to explore new topics, this platform brings knowledge closer to you with simple explanations and engaging layouts.
        </p>
      </div>

      <button style={buttonStyle} onClick={handleStartExploring}>
        Start Exploring
      </button>

    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  width: '220px',
  textAlign: 'center'
};

const buttonStyle = {
  backgroundColor: '#ff6f91',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default Home;
