import React, { useState } from "react";
import HomePage from "../components/accueil/HomePage";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDemandeClients, setShowDemandeClients] = useState(false);
  const [showDemandePubs, setShowDemandePubs] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showDemandeClientsHandler = () => {
    setShowDemandeClients(true);
    setShowDemandePubs(false);
  };

  const showDemandePubsHandler = () => {
    setShowDemandePubs(true);
    setShowDemandeClients(false);
  };

  return (
    <>
    
    
     
     <HomePage/>
        
    </>
  );
};

export default Home;
