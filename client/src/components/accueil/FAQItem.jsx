import React, { useState } from 'react';
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span className="question-indicator"></span>
        {question}
        <img 
          src={isOpen ? "../../../public/images/up.svg" : "../../../public/images/Down.svg"} 
          alt={isOpen ? "Close question" : "Open question"} 
          className="toggle-icon"
        />
      </button>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
}

export default FAQItem;