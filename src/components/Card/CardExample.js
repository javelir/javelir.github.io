import React from 'react';
import Card from './Card';

/**
 * Example component showing different ways to use the Card component
 */
const CardExample = () => {
  // Sample data for cards
  const cardData = [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Learn the basics of React and how to create your first component.',
      date: 'January 15, 2023'
    },
    {
      id: 2,
      title: 'CSS Variables for Theming',
      description: 'How to use CSS variables to create flexible and maintainable themes for your web applications.',
      date: 'February 22, 2023'
    },
    {
      id: 3,
      title: 'Responsive Design Patterns',
      description: 'Explore common responsive design patterns and how to implement them in your projects.',
      date: 'March 10, 2023'
    }
  ];

  return (
    <div className="card-examples">
      <h2>Card Component Examples</h2>
      
      {/* Rendering multiple cards from data */}
      <div className="cards-container">
        {cardData.map(card => (
          <Card 
            key={card.id}
            title={card.title}
            description={card.description}
            date={card.date}
          />
        ))}
      </div>
      
      {/* Single card with custom styling */}
      <Card 
        title="Custom Styled Card"
        description="This card has custom styling applied through props."
        date="April 5, 2023"
        style={{ backgroundColor: 'var(--color-manilla-light)', marginTop: '2rem' }}
      />
    </div>
  );
};

export default CardExample;