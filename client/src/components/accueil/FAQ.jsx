import React from 'react';
import FAQItem from './FAQItem';

const faqData = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i ?",
    answer: "Answer to the first question"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i ?",
    answer: "Answer to the second question"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i ?",
    answer: "Answer to the third question"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i ?",
    answer: "Answer to the fourth question"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i ?",
    
    answer: "Answer to the fifth question"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i ?",
    answer: "Answer to the sixth question"
  }
];

function FAQ() {
  return (
    <section className="faq-section">
      <h2 className="section-title" id="FAQ">FAQ</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}

export default FAQ;