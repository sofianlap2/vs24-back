import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {BrowserRouter as Router,Route,Routes,useParams} from "react-router-dom";
import ModifierUser from "./components/admin/adminCrud/ModifierUser";
import ConsulterUser from "./components/admin/adminCrud/ConsulterUser";
import ChangePassword from "./components/admin/adminCrud/ChangePassword";
import FirstUpdate from "./components/admin/adminCrud/FirstUpdate";
import ResetPassword from "./components/accueil/resetPassword/ResetPassword";
import RequestResetPassword from "./components/accueil/resetPassword/RequestResetPassword";
import Home from "./pages/index";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import UsersManagement from "./components/admin/adminCrud/userManagement";
import DemandeClients from "./components/admin/demande/demandeClients";
import DemandePub from "./components/admin/demande/demandePub";
import AddEspacePublic from "./components/admin/espacePublic/addEspacePublic";
import EspacePublicManagement from "./components/admin/espacePublic/espacePuclicManagement";
import StationsManagement from "./components/admin/station/stationsManagement";
import AddStation from "./components/admin/station/addStations";
import CreateClient from "./components/admin/clients/createClient";
import CreatePublicite from "./components/admin/publicites/createPublicitaire";
import DemandesManagement from "./components/admin/demande/demandeManagement";
import CassierManagement from "./components/admin/cassier/cassierManagement";
import Dashboard from "./components/admin/outils/dashboard/Dashboard";
import CorbeilleDemande from "./components/admin/corbeille/corbeilleDemande";
import AddAdmin from "./components/admin/adminCrud/addAdmin";
import EmailVerify from "./components/admin/outils/emailVerification/verification";
import FullLayout from "./components/client/outils/FullLayout";
import ReclamationsManagement from "./components/admin/reclamation/reclamationManagement";
import CathegorieManagement from "./components/admin/reclamation/cathegorie/cathegorieManagemen";
import AddCathegorie from "./components/admin/reclamation/cathegorie/addCathegorie";
import AddReclamation from "./components/client/reclamations/addReclamation";
import ReclamationsManagementClient from "./components/client/reclamations/reclamationMnagementClient";
import UpdateEspacePublic from "./components/admin/espacePublic/updateEspacePublic";
import EspacesManagementClient from "./components/client/espacePublic/espaceManagement";
import ChangePasswordClient from "./components/client/clientCrud/changePasswordClient";
import ConsulterClient from "./components/client/clientCrud/consulterClient";
import ModifierClient from "./components/client/clientCrud/modifierClient";
import UpdateUser from "./components/admin/adminCrud/updateUser";
import ArchiveUsers from "./components/admin/archive/archiveUser";
import NotFound from "./components/notFound";

function App() {
  const { email } = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const tokenValue = Cookies.get("token");

  const [role, setUserRole] = useState("");
  const [verified, setVerified] = useState();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${email}/userRole`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, [tokenValue, email]);

  useEffect(() => {
    const fetchVerified = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/users/${email}/userVerified`,
          {
            headers: {
              Authorization: `${tokenValue}`,
            },
          }
        );
        setVerified(response.data.verified);
      } catch (error) {
        console.error("Failed to fetch user verification status:", error);
      }
    };

    fetchVerified();
  }, [tokenValue, email]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/requestResetPassword" element={<RequestResetPassword />}/>
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />

           {/* Autorisation pour les roles superAdmin , adminPub , adminClient et adminDemande */}

          {(role === "SUPERADMIN" || role === "ADMINPUB"||role === "ADMINCLIENT" || role === "ADMINDEMANDE") && verified === true ? (<>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addEspacePublic/:email" element={<AddEspacePublic />} />
          <Route path="/espacePublicManagement/:email" element={<EspacePublicManagement />} />
          <Route path="/updateEspacePublic/:espaceId" element={<UpdateEspacePublic />} />
          <Route path="stationsManagement/:email" element={<StationsManagement />} />
          <Route path="/addStation/:email" element={<AddStation />} />
          <Route path="/decisionClient/:id" element={<CreateClient />} />
          <Route path="/decisionPublicite/:id" element={<CreatePublicite />} />
          <Route path="/demandeManagement/:email" element={<DemandesManagement />} />
          <Route path="/reclamationsManagement/:email" element={<ReclamationsManagement />} />
          <Route path="/modifierUser/:email" element={<ModifierUser />} />
          <Route path="/consulterUser/:email" element={<ConsulterUser />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/firstUpdate/:email" element={<FirstUpdate />} />
          <Route path="/cassierManagement/:email" element={<CassierManagement />} />
          <Route path="/dashboard/:email" element={<Dashboard />} />
          </>) : null}

          {/* Autorisation pour les role client et publicitaire */}

          {(role === "CLIENT" || role === "PUBLICITAIRE") && verified === true ? (<>
          <Route path="/addReclamation/:email" element={<AddReclamation />} />
          <Route path="/reclamationsClient/:email" element={<ReclamationsManagementClient />} />
          <Route path="/espacesClient/:email" element={<EspacesManagementClient />} />
          <Route path="/passwordClient" element={<ChangePasswordClient />} />
          <Route path="/consulterClient/:email" element={<ConsulterClient />} />
          <Route path="/modifierClient/:email" element={<ModifierClient />} />
          <Route path="/dashboardClient/:email" element={<FullLayout />} />
          </>) : null}

          {/* Autorisation pour le role superadmin */}

          {role === "SUPERADMIN" && verified === true ? (
            <>
          <Route path="/usersManagement/:email" element={<UsersManagement />} />
          <Route path="/addAdmin/:email" element={<AddAdmin />} />
          <Route path="/archiveUsers/:email" element={<ArchiveUsers />} />
          <Route path="/corbeilleDemande/:email" element={<CorbeilleDemande />} />
          <Route path="/cathegorieManagement/:email" element={<CathegorieManagement />} />
          <Route path="/addCathegorie/:email" element={<AddCathegorie />} />
          <Route path="/updateUser/:userId" element={<UpdateUser />} />
            </>) : null}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
