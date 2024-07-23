import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Stack, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import Cookies from "js-cookie";
import logoImage from "../../../../public/images/Voltwise-noir.png";
import signatureImage from "../../../../public/images/signature.png"; // Adjust the path to your signature image
import { format, isToday, parseISO } from "date-fns";
import * as XLSX from 'xlsx';
const DemandesManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const tokenValue = Cookies.get("token");
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [selectedType, setSelectedType] = useState("CLIENT");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setRole] = useState("");
  const [verified, setVerified] = useState();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleConfirmReject = async () => {
    if (selectedDemande) {
      try {
        // Update state
        setDemandes(demandes.filter((d) => d._id !== selectedDemande._id));

        // Close dialog
        handleCloseDialog();

        // Add to demandeRejet
        await axios.post(`${appUrl}/demandeRejet/demandeRejet`, selectedDemande, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });

        // Delete from demandes
        await axios.delete(`${appUrl}/demandes/${selectedDemande._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });

      } catch (error) {
        setErrorMessage("N'a pas réussi à rejeter les demandes. Veuillez réessayer.");
      }
    }
  };

  const generatePDF = (demande) => {
    const doc = new jsPDF();
  
    const marginLeft = 15;
    const marginTop = 15;
    const lineHeight = 10;
  
    // Add logo (if any)
    const logoWidth = 30; // Adjust as per your logo size
    const logoHeight = 15; // Adjust as per your logo size
    doc.addImage(logoImage, "PNG", marginLeft, marginTop, logoWidth, logoHeight);
  
    // Add signature
    const signatureWidth = 50; // Adjust as per your signature size
    const signatureHeight = 20; // Adjust as per your signature size
    const signatureX = doc.internal.pageSize.getWidth() - marginLeft - signatureWidth; // Align to right margin
    const signatureY = doc.internal.pageSize.getHeight() - marginTop - signatureHeight; // Align to bottom margin
    doc.addImage(signatureImage, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);
  
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    const title = demande.typeDemande === "CLIENT" ? "Demande Client" : "Demande Publicitaire";
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titleX, marginTop + logoHeight + lineHeight);
  
    // Draw a line under the title
    doc.setLineWidth(0.5);
    doc.line(marginLeft, marginTop + logoHeight + lineHeight + 2, doc.internal.pageSize.getWidth() - marginLeft, marginTop + logoHeight + lineHeight + 2);
  
    // Add the current date
    const currentDate = format(demande.dateDemande, 'dd/mm/yyyy');
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
  
    // Contact Information
    const contactInfo = `
    ${demande.fullName}
    ${demande.email}
    ${demande.phoneNumber}
    `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const contactLines = doc.splitTextToSize(contactInfo, doc.internal.pageSize.getWidth() - marginLeft * 2);
    doc.text(contactLines, marginLeft, marginTop + logoHeight + lineHeight * 3.5);
  
    // Company Information
    const companyInfo = `
      ${demande.nomEntreprise}
      ${demande.gouvernorat}, ${demande.ville}
      À ${demande.gouvernorat}, le ${currentDate}
    `;
    const companyLines = doc.splitTextToSize(companyInfo, doc.internal.pageSize.getWidth() - marginLeft * 2);
    let y = marginTop + logoHeight + lineHeight * 6;
    doc.text(companyLines, marginLeft, y);
  
    // Object
    y += lineHeight * 3;
    doc.setFont("helvetica", "bold");
    if (demande.typeDemande === "CLIENT") {
      doc.text('Objet: Demande d\'ajout comme Client', marginLeft, y);
    } else if (demande.typeDemande === "PUBLICITAIRE") {
      doc.text('Objet: Demande d\'ajout comme Publicitaire', marginLeft, y);
    }
  
    // Main Body Text
    y += lineHeight * 2;
    doc.setFont("helvetica", "normal");
    let demandeAjout = "";
    if (demande.typeDemande === "CLIENT") {
      demandeAjout = 'Je souhaiterais ajouter des stations de charge dans mon espace public afin de fournir à mes utilisateurs un service de recharge pratique et fiable. Je suis convaincu que les fonctionnalités de gestion en temps réel, de surveillance de l\'utilisation des stations, et de gestion des réclamations des utilisateurs amélioreront grandement l\'expérience de mes visiteurs.Pourriez-vous m\'informer des étapes à suivre pour intégrer des stations de charge dans mon espace public via votre application ? Je suis également intéressé par les options de configuration et de gestion offertes par votre plateforme.';
    } else if (demande.typeDemande === "PUBLICITAIRE") {
      demandeAjout = 'Je souhaiterais soumettre des publicités pour diffusion dans les stations de charge de votre réseau. Votre plateforme semble être un excellent moyen de promouvoir nos services auprès d\'un public ciblé et captif. Pouvez-vous me fournir des informations sur le processus de soumission des publicités, les critères d\'approbation par l\'administrateur, ainsi que les options de ciblage disponibles pour maximiser l\'impact de nos campagnes publicitaires ?';
    }
  
    const bodyText = `
      Madame, Monsieur,
  
      Je m'appelle ${demande.fullName} et je suis propriétaire de ${demande.nomEntreprise}, un espace public situé à ${demande.gouvernorat},${demande.ville}. Ayant pris connaissance de votre application innovante dédiée à la gestion des stations de charge des appareils électroniques, je suis très intéressé par les opportunités que celle-ci offre pour améliorer le service à mes utilisateurs et promouvoir mes services.
      ${demandeAjout}
      Je vous remercie par avance pour votre attention et je suis disponible pour toute information complémentaire ou pour discuter des prochaines étapes nécessaires à la réalisation de cette demande.
  
  Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
    `;
    const bodyLines = doc.splitTextToSize(bodyText, doc.internal.pageSize.getWidth() - marginLeft * 2);
    doc.text(bodyLines, marginLeft, y + lineHeight);
  
    // Add a border around the entire page
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);
  
    // Save the PDF with a specific filename
    const fileName = `demande_${demande._id}.pdf`;
    doc.save(fileName);
  };
  
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${window.atob(email)}/userRole`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setRole(response.data.role);
      } catch (error) {
      }
    };

    fetchRole();
  }, [tokenValue]);

  useEffect(() => {
    const fetchVerified = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${window.atob(email)}/userVerified`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setVerified(response.data.verified);
      } catch (error) {
      }
    };

    fetchVerified();
  }, [tokenValue]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/demandes/${window.atob(email)}/demandesManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );
        const demandeWithIds = response.data.map((row) => ({
          ...row,
          id: row._id,
        }));
        const demandesWithEspacePublic = demandeWithIds.map((demande) => ({
          ...demande,
          espacePublicD: demande.espacePublic?.length,
        }));
        setDemandes(demandesWithEspacePublic);
      } catch (error) {
      }
    };

    if (email) {
      fetchDemandes();
    }
  }, [email, tokenValue]);

  useEffect(() => {
    const filtered = demandes.filter((demande) => demande.typeDemande === selectedType);
    setFilteredDemandes(filtered);
  }, [selectedType, demandes]);

  const handleOpenDialog = (demande) => {
    setSelectedDemande(demande);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDemande(null);
    setErrorMessage("");
  };
  const renderDateDemande = (params) => {
    const date = parseISO(params.value);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    return format(date, 'dd/MM/yyyy');
  };
  const shouldShowActionsColumn = (role, verified) => {
    return (role === 'SUPERADMIN' || role === 'ADMINDEMANDE') && verified === true;
  };
  const exportToExcel = (typeDemande) => {
    const filteredDemandes = demandes.filter((demande) => demande.typeDemande === typeDemande);
    const worksheet = XLSX.utils.json_to_sheet(filteredDemandes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demandes");
    XLSX.writeFile(workbook, `demandes_${typeDemande.toLowerCase()}.xlsx`);
  };
  const exportToExcelTous = () => {
    const worksheet = XLSX.utils.json_to_sheet(demandes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demandes");
    XLSX.writeFile(workbook, "Demandes.xlsx");
  };
  const columnsClient = [
    { field: "fullName", headerName: "Full Name", flex: 0.6 },
    { field: "metier", headerName: "Metier", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "phoneNumber", headerName: "Téléphone", flex: 0.6 },
    { field: "phoneNumber2", headerName: "Téléphone 2", flex: 0.6 },

    { field: "gouvernorat", headerName: "Gouvernorat", flex: 0.6 },
    { field: "ville", headerName: "Ville", flex: 0.5 },
    { field: "typeDemande", headerName: "Type Demande", flex: 0.7 },
    { field: "nomEntreprise", headerName: "Entreprise", flex: 0.5 },
    { field: "dateDemande", headerName: "Date", flex: 0.5,renderCell: renderDateDemande },
    { field: "messageDemande", headerName: "Message", flex: 0.5 },
  ];

  const columnsPublicitaire = [
    { field: "fullName", headerName: "Full Name", flex: 0.6 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "phoneNumber", headerName: "Téléphone", flex: 0.6 },
    { field: "phoneNumber2", headerName: "Téléphone 2", flex: 0.6 },

    { field: "gouvernorat", headerName: "Gouvernorat", flex: 0.6 },
    { field: "ville", headerName: "Ville", flex: 0.5 },
    { field: "typeDemande", headerName: "Type Demande", flex: 0.7 },
    { field: "typeEspace", headerName: "Type Espace", flex: 0.6 },
    { field: "espacePublicD", headerName: "Espace", flex: 0.5 },
    { field: "nomEntreprise", headerName: "Entreprise", flex: 0.5 },
    { field: "dateDemande", headerName: "Date", flex: 0.5,renderCell: renderDateDemande  },

    { field: "messageDemande", headerName: "Message", flex: 0.4 },
  ];

  if (shouldShowActionsColumn(role, verified)) {
    columnsClient.push({
      field: "button",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              navigate(params.row.typeDemande === 'CLIENT' ? `/decisionClient/${params.row._id}` : `/decisionPublicite/${params.row._id}`);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Accepter
          </Button>
          <Button
            variant="outlined"
            class="btn btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDialog(params.row);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Rejeter
          </Button>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              generatePDF(params.row);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
          Export
          </Button>
        </Stack>
      ),
    });

    columnsPublicitaire.push({
      field: "button",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              navigate(params.row.typeDemande === 'CLIENT' ? `/decisionClient/${params.row._id}` : `/decisionPublicite/${params.row._id}`);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Accepter
          </Button>
          <Button
            variant="outlined"
            class="btn btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDialog(params.row);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Rejeter
          </Button>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              generatePDF(params.row);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Export
          </Button>
        </Stack>
      ),
    });
  }

  return (
    <main id="clients" className="clients">
      {shouldShowHeader && <Header />}
      <div style={{ display: 'flex' }}>
        {shouldShowHeader && <Sidebarrr />}
        <div className="row" style={{ marginLeft: "20vw" }}>
          <div style={{ width: "80vw" }}>
            <Stack direction="row" spacing={2} style={{ justifyContent: "center" }} m="8vh 0vw 0vw 0vw">
              <Button variant="btn btn-outline-info" onClick={() => setSelectedType("CLIENT")}  style={{fontFamily: 'Constantia'}}>
                Type Client
              </Button>
              <Button variant="btn btn-outline-info" onClick={() => setSelectedType("PUBLICITAIRE")}  style={{fontFamily: 'Constantia'}}>
                Type Publicitaire
              </Button>
             
            </Stack>
            <div style={{ width: "73vw" }}>
              <Box
                m="2vh 0vw 0 0vw"
                height="75vh"
                width="75vw"
                sx={{
                  "& .MuiDataGrid-root": { border: "none" },
                  "& .MuiDataGrid-cell": { borderBottom: "none" },
                  "& .name-column--cell": { color: colors.greenAccent[300] },
                  "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                  "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                  "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                  "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                }}
              >
                {!isMobile ? (
                  <DataGrid
                    rows={filteredDemandes}
                    columns={selectedType === "CLIENT" ? columnsClient : columnsPublicitaire}
                    style={{ justifyItems: "center" ,fontFamily: 'Constantia'}}
                    getRowId={(row) => row.email} 
                  />
                ) : (
                  <Box>
                    {filteredDemandes.map((demande) => (
                      <Box
                        key={demande.id}
                        p={2}
                        mb={2}
                        bgcolor={"transparent"}
                        borderRadius="8px"
                        boxShadow={3}
                      >
                        <Typography style={{fontFamily: 'Constantia'}} variant="h6">{demande.fullName}</Typography>
                        <Typography style={{fontFamily: 'Constantia'}}>Email: {demande.email}</Typography>
                        <Typography style={{fontFamily: 'Constantia'}}>Téléphone: {demande.phoneNumber}</Typography>
                        <Typography style={{fontFamily: 'Constantia'}}>Téléphone 2: {demande.phoneNumber2}</Typography>

                        <Typography style={{fontFamily: 'Constantia'}}>Gouvernorat: {demande.gouvernorat}</Typography>
                        <Typography style={{fontFamily: 'Constantia'}}>Ville: {demande.ville}</Typography>
                        <Typography style={{fontFamily: 'Constantia'}}>Type Demande: {demande.typeDemande}</Typography>
                        <Typography style={{fontFamily: 'Constantia'}}>Date: {renderDateDemande({ value: demande.dateDemande })}</Typography>
                        {demande.typeDemande === "CLIENT" ? (
                          <>
                            <Typography style={{fontFamily: 'Constantia'}}>Metier: {demande.metier}</Typography>
                            <Typography style={{fontFamily: 'Constantia'}}>Entreprise: {demande.nomEntreprise}</Typography>
                            <Typography style={{fontFamily: 'Constantia'}}>Message: {demande.messageDemande}</Typography>
                          </>
                        ) : (
                          <>
                            <Typography style={{fontFamily: 'Constantia'}}>Type Espace: {demande.typeEspace}</Typography>
                            <Typography style={{fontFamily: 'Constantia'}}>Espace: {demande.espacePublicD}</Typography>
                            <Typography style={{fontFamily: 'Constantia'}}>Message: {demande.messageDemande}</Typography>
                          </>
                        )
                        }
                          {shouldShowActionsColumn(role, verified) && (
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
        <Button
          variant="outlined"
          class="btn btn-outline-info"
          onClick={(e) => {
            e.stopPropagation();
            navigate(demande.typeDemande === 'CLIENT' ? `/decisionClient/${demande._id}` : `/decisionPublicite/${demande._id}`);
          }}
          style={{ marginTop: '1vh', fontSize: 'small' }}
        >
          Accepter
        </Button>
        <Button
          variant="outlined"
          class="btn btn-outline-danger"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDialog(demande);
          }}
          style={{ marginTop: '1vh', fontSize: 'small' }}
        >
          Rejeter
        </Button>
        <Button
          variant="outlined"
          class="btn btn-outline-info"
          onClick={(e) => {
            e.stopPropagation();
            generatePDF(demande);
          }}
          style={{ marginTop: '1vh', fontSize: 'small' }}
        >
          Export PDF
        </Button>
      </Stack>
    )}
                      </Box>
                      
                      
                    ))}
                  </Box>
                )}
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example" style={{ marginTop: '2vh', fontSize: 'small' }}>
  <button type="button" class="btn btn-danger" onClick={() => exportToExcel("CLIENT")}  style={{fontFamily: 'Constantia'}}>Clients</button>
  <button type="button" class="btn btn-warning" onClick={exportToExcelTous}  style={{fontFamily: 'Constantia'}}>Tous</button>
  <button type="button" class="btn btn-success" onClick={() => exportToExcel("PUBLICITAIRE")}  style={{fontFamily: 'Constantia'}}>Publicitaires</button>
</div>
              </Box>
             
        
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer le Rejet"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir rejeter cette demande?
          </DialogContentText>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
          Annuler
          </Button>
          <Button onClick={handleConfirmReject} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default DemandesManagement;
