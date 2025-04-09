import React from 'react';
import './Card.css';

/**
 * Card component for displaying content with title, description, date and tags
 * @param {string} title - The title of the card
 * @param {string} description - The description text
 * @param {string} date - The date to display
 * @param {array} tags - Array of tags associated with the content
 * @param {object} props - Additional props to pass to the component
 */
const Card = ({ title, description, date, tags = [], ...props }) => {
  return (
    <div className="card" {...props}>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <hr className="card-hr"/>
        <p className="card-description">{description}</p>
        <div className="card-meta">
          <div className="card-date">{date}</div>
          {tags.length > 0 && (
            <div className="card-tags">
              {tags.map((tag, index) => (
                <span key={index} className="card-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;