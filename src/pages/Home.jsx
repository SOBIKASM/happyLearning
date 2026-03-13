import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Countries', desc: 'Explore culture, geography, and fun facts about countries across the globe.', path: '/country' },
    { title: 'Periodic Table', desc: 'Learn about elements, their properties, and their uses in everyday life.', path: '/elements' },
    { title: 'World Wonders', desc: 'Uncover the stories, architecture, and significance of wonders around the world.', path: '/wonders' },
    { title: 'Galaxies', desc: 'Discover the beauty and mysteries of galaxies beyond our solar system.', path: '/galaxy' },
    { title: 'Constellations', desc: 'Identify star patterns and learn their names, myths, and origins.', path: '/constellations' },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Happy Learning</h1>
      
      <p className="home-subtitle">
        Discover fascinating facts about our world and the universe beyond. 
        Interactive education designed to make learning fun, engaging, and accessible for everyone.
      </p>
      
      <div className="home-categories">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-card" onClick={() => navigate(cat.path)}>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
          </div>
        ))}
      </div>

      <button className="explore-button" onClick={() => navigate('/country')}>
        Start Exploring
      </button>

      <div className="about-section">
        <h2>About This Project</h2>
        <p>
          Happy Learning is a passion project aimed at providing easily digestible educational content. 
          Whether you're a student, a curious learner, or someone who loves to explore new topics, 
          this platform brings knowledge closer to you with simple explanations and engaging layouts.
        </p>
      </div>
    </div>
  );
};

export default Home;
