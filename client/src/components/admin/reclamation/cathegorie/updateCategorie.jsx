import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../outils/Header";
import Sidebarrr from "../../outils/Sidebar";


const UpdateCategorie = () => {
    const navigate = useNavigate();
    const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    const { email, id } = useParams();
    const [nomCat, setNomCat] = useState("");

    const tokenValue = Cookies.get("token");

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${appUrl}/cathegories/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tokenValue}`,
                        },
                    });
                    const categorie = response.data;
                    setNomCat(categorie.nomCat);
                  
                } catch (error) {
                    toast.error("Erreur lors de la récupération des données de la categorie.");
                }
            };
            fetchData();
        }
    }, [id, appUrl, tokenValue]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                `${appUrl}/cathegories/updateCategorie/${id}`,
                {
                    nomCat
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenValue}`,
                    },
                }
            );

            toast.success("La categorie a été mise à jour avec succès.");
            setTimeout(() => {
                navigate(`/dashboard/${window.btoa(email)}`);
            }, 6500);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(`Erreur: ${error.response.data.error}`);
            } else {
                toast.error("Une erreur s'est produite lors de la mise à jour de la categorie.");
            }
        }
    };

    return (
        <main id="updateCategorie" className="updateCategorie">
            <Header onSearch={(term) => setSearchTerm(term)} />
            <div style={{ display: "flex" }}>
                <Sidebarrr />
                <div className="row">
                    <div style={{ width: "90vw" }}>
                        <form
                            className="row g-3 p-3 form-group"
                            onSubmit={handleFormSubmit}
                            style={{ marginTop: "12vh", marginLeft: "30vw" }}
                        >
                            <h3 style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>Modification la catégorie</h3>
                            <br />
                            <ToastContainer />
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>Catégorie:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nomCat}
                                    onChange={(e) => setNomCat(e.target.value)}
                                />
                            </div>

                         
                          
                           
                           
                            
                            <div className="col-md-12 text-center">
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    style={{ marginTop: "1vh", fontFamily: 'Constantia' }}
                                >
                                    Modifier
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UpdateCategorie;