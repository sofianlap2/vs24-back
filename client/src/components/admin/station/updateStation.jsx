import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateStation = () => {
    const navigate = useNavigate();
    const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    const { email, id } = useParams();
    const [numero, setNumero] = useState("");
    const [espacePublic, setEspacePublic] = useState("");
    const [modelStation, setModelStation] = useState("");
    const [dateFab, setDateFab] = useState("");
    const [dateEntretient, setDateEntretient] = useState("");
    const [dateFinLoc, setDateFinLoc] = useState("");
    const [status, setStatus] = useState("");
    const tokenValue = Cookies.get("token");

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${appUrl}/station/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tokenValue}`,
                        },
                    });
                    const station = response.data;
                    setNumero(station.numero);
                    setDateFab(station.dateFab);
                    setDateEntretient(station.dateEntretient);
                    setDateFinLoc(station.dateFinLoc);
                    setModelStation(station.modelStation);
                    setStatus(station.status);
                } catch (error) {
                    toast.error("Erreur lors de la récupération des données de la station.");
                }
            };
            fetchData();
        }
    }, [id, appUrl, tokenValue]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                `${appUrl}/station/updateStation/${id}`,
                {
                    numero,
                    
                    modelStation,
                    dateFab,
                    dateEntretient,
                    dateFinLoc,
                    status,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenValue}`,
                    },
                }
            );

            toast.success("La station a été mise à jour avec succès.");
            setTimeout(() => {
                navigate(`/admin/dashboard/${window.btoa(email)}`);
            }, 6500);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(`Erreur: ${error.response.data.error}`);
            } else {
                toast.error("Une erreur s'est produite lors de la mise à jour de la station.");
            }
        }
    };

    return (
        <main id="updateStation" className="updateStation">
            <div style={{ display: "flex" }}>
                <div className="row">
                    <div style={{ width: "50vw" }}>
                        <form
                            className="row g-3 p-3 form-group"
                            onSubmit={handleFormSubmit}
                            style={{ marginTop: "12vh", marginLeft: "8vw" }}
                        >
                            <h3 style={{  fontWeight: 'bold' }}>Modification la station</h3>
                            <br />
                            <ToastContainer />
                            <div className="col-md-4">
                                <label className="form-label" style={{  fontWeight: 'bold' }}>Référence:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label" style={{  fontWeight: 'bold' }}>Date d'Installation:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateFab}
                                    onChange={(e) => setDateFab(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{  fontWeight: 'bold' }}>Modèle:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={modelStation}
                                    onChange={(e) => setModelStation(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{  fontWeight: 'bold' }}>Date de l'entretien:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateEntretient}
                                    onChange={(e) => setDateEntretient(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{  fontWeight: 'bold' }}>Date de fin de location:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateFinLoc}
                                    onChange={(e) => setDateFinLoc(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{  fontWeight: 'bold' }}>Statut:</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option style={{ fontFamily: 'Constantia' }} value="" disabled>Sélectionnez un statut</option>
                                    <option style={{ fontFamily: 'Constantia' }} value="LIBRE">Libre</option>
                                    <option style={{ fontFamily: 'Constantia' }} value="LOUE">Loué</option>
                                    <option style={{ fontFamily: 'Constantia' }} value="ENMAINTENANCE">En Maintenance</option>
                                </select>
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

export default UpdateStation;