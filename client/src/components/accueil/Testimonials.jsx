import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import TrustedBy from './TrustedBy';

const testimonialData = [
  {
    content: "Lorem ipsum dolor sit amet consectetur. Euismod porttitor consequat in fermentum posuere tincidunt. Nec egestas scelerisque mi tellus in. Gravida tortor dui eu luctus lobortis nulla. Viverra ridiculus ultricies ultrices id vitae.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/f8572ae77a4afefb45186becf290744e0f4f927b26fddc8d59e417108f179905?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07",
    name: "Title",
    role: "Description",
    rating: 4
  },
  {
    content: "Lorem ipsum dolor sit amet consectetur. Euismod porttitor consequat in fermentum posuere tincidunt. Nec egestas scelerisque mi tellus in. Gravida tortor dui eu luctus lobortis nulla. Viverra ridiculus ultricies ultrices id vitae.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/ef25b1a4daa108fe28469632f52aade55dcdc52b68297c7e2376dd209b2f7367?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07",
    name: "Title",
    role: "Description",
    rating: 5
  },
  {
    content: "Lorem ipsum dolor sit amet consectetur. Euismod porttitor consequat in fermentum posuere tincidunt. Nec egestas scelerisque mi tellus in. Gravida tortor dui eu luctus lobortis nulla. Viverra ridiculus ultricies ultrices id vitae.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1acbb5842e9969226d05ec0a04d13be62bb4d5a90387e5804a237cebfd90ffd0?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b07",
    name: "Title",
    role: "Description",
    rating: 5
  },
  {
    content: "Additional testimonial content...",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1acbb5842e9969226d05ec0a04d13be62bb4d5a90387e5804a237cebfd90ffd1?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b08",
    name: "Title 4",
    role: "Description 4",
    rating: 5
  },
  {
    content: "Another testimonial...",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1acbb5842e9969226d05ec0a04d13be62bb4d5a90387e5804a237cebfd90ffd2?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b09",
    name: "Title 5",
    role: "Description 5",
    rating: 5
  },
  {
    content: "Final testimonial...",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1acbb5842e9969226d05ec0a04d13be62bb4d5a90387e5804a237cebfd90ffd3?placeholderIfAbsent=true&apiKey=5c35c3dd778f44179e62d77341ae2b10",
    name: "Title 6",
    role: "Description 6",
    rating: 5
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3); // Default to 3 cards per page

  useEffect(() => {
    // Function to check window width and adjust number of cards per page
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1); // Show 1 card on screens <= 768px (mobile)
      } else {
        setCardsPerPage(3); // Show 3 cards on larger screens
      }
    };

    // Set initial number of cards based on screen size
    updateCardsPerPage();

    // Add event listener to update when screen is resized
    window.addEventListener('resize', updateCardsPerPage);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(testimonialData.length / cardsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonialData.slice(
    currentIndex * cardsPerPage,
    currentIndex * cardsPerPage + cardsPerPage
  );

  return (
    <section className="testimonials" id="testimonials" >
      <h2 className="section-title">Témoignages</h2>
      <div className="testimonial-grid" >
        {currentTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
      <div className="testimonial-navigation" style={{ marginTop: '20px' }}>
        <button className="nav-button prev" aria-label="Previous testimonials" onClick={handlePrev}>
          <img src="../../../public/images/leftCircle.svg" alt="Previous" />
        </button>
        <button className="nav-button next" aria-label="Next testimonials" onClick={handleNext}>
          <img src="../../../public/images/rightCircle.svg" alt="Next" />
        </button>
      </div>
      <div>
        <TrustedBy />
      </div>
    </section>
  );
}

export default Testimonials;
