import styled from "styled-components";

export const ServicesContainer = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #010606;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 50px 0;
  }
`;

export const ServicesWrapper = styled.div`
max-width: 1000px;
        margin : 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        grid-gap: 16px;
        padding: 0 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const ServicesCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  width: 280px; /* Set the width */
  height: 340px; /* Set the height */
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 80%; /* Adjust width for mobile devices */
    height: auto; /* Allow height to adjust based on content */
    margin-bottom: 16px; /* Add margin for spacing */
  }
  @media screen and (max-width: 1459px) {
    width: 80%; /* Adjust width for mobile devices */
    height: auto; /* Allow height to adjust based on content */
    margin-bottom: 16px; /* Add margin for spacing */
  }
`;


export const ServicesIcon = styled.img`
  width: 130px;
  height: 160px;
  display: flex;
  margin-bottom: 8px;
`;

export const ServicesH1 = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 64px;
  direction: rtl;



  @media screen and (max-width: 380px) {
    font-size: 2rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  direction: rtl;
  text-align: center;


`;

export const ServicesP = styled.p`
  font-size: 0.6rem;
  text-align: center;
  direction: rtl;

`;
