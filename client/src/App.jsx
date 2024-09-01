import React from "react";

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
import StationsManagementClient from "./components/client/station/stationsManagementClient";
import PublicitesManagement from "./components/admin/publicites/publicitesManagement";
import DecisionPub from "./components/admin/publicites/decisionPub";
import AddQuestion from "./components/client/question/addQuestion";
import UpdateStation from "./components/admin/station/updateStation";
import UpdateReclamation from "./components/client/reclamations/updateReclamation";
import UpdateReclamationStat from "./components/admin/reclamation/updateReclamationStat";
import UpdateCategorie from "./components/admin/reclamation/cathegorie/updateCategorie";
import AddPublicite from "./components/publicitaire/publicite/addPublicite";
import PublicitesManagementPub from "./components/publicitaire/publicite/publiciteManagementPub";
import UpdatePub from "./components/publicitaire/publicite/updatePub";
import DashboardClient from "./components/client/outils/dashboard/dashboardClient";
import ConsulterPublicitaire from "./components/publicitaire/pubCrud/consulterPub";
import ModifierPublicitaire from "./components/publicitaire/pubCrud/modifierPub";
import ChangePasswordPub from "./components/publicitaire/pubCrud/changePasswordPub";
import UpdateReclamationPub from "./components/publicitaire/reclamations/updateReclamationPub";
import AddReclamationPub from "./components/publicitaire/reclamations/addReclamationPub";
import ReclamationsManagementPub from "./components/publicitaire/reclamations/reclamationMnagementPub";
import DashboardPub from "./components/publicitaire/outils/dashboard/dashboardPub";
import EspacesManagementPub from "./components/publicitaire/espacePublic/espaceManagementPub";
import Publicitee from "./components/client/outils/publicitee";

function App() {

  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/requestResetPassword" element={<RequestResetPassword />}/>
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/demandeClient" element={<DemandeClients />} />
          <Route path="/demandePub" element={<DemandePub />} />

           {/* Autorisation pour les roles superAdmin , adminPub , adminClient et adminDemande */}

          <Route path="/dashboard/:email" element={<Dashboard />} />
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
          <Route path="/pubsManagement/:email" element={<PublicitesManagement />} />
          <Route path="/decisionPub/:pubId" element={<DecisionPub />} />
          <Route path="/updateStation/:id" element={<UpdateStation />} />
          <Route path="/updateCategorie/:id" element={<UpdateCategorie />} />
          <Route path="/updateReclamationStat/:id" element={<UpdateReclamationStat />} />

         

          {/* Autorisation pour les role client et publicitaire */}

          <Route path="/addReclamation/:email" element={<AddReclamation />} />
          <Route path="/reclamationsClient/:email" element={<ReclamationsManagementClient />} />
          <Route path="/espacesClient/:email" element={<EspacesManagementClient />} />

          <Route path="/stationsClient/:email" element={<StationsManagementClient />} />
          <Route path="/addPublicite/:email" element={<AddPublicite />} />
          <Route path="/publicitesManagementPub/:email" element={<PublicitesManagementPub/>} />
          <Route path="/addQuestion/:email" element={<AddQuestion />} />
          <Route path="/updatePublicite/:id" element={<UpdatePub />} />
          <Route path="/Publicitee/:email" element={<Publicitee />} />
 
          <Route path="/passwordClient" element={<ChangePasswordClient />} />
          <Route path="/consulterClient/:email" element={<ConsulterClient />} />
          <Route path="/modifierClient/:email" element={<ModifierClient />} />
          <Route path="/updateReclamation/:id" element={<UpdateReclamation />} />
          <Route path="/passwordPub" element={<ChangePasswordPub />} />


          {/* Autorisation pour le role superadmin */}

            
          <Route path="/usersManagement/:email" element={<UsersManagement />} />
          <Route path="/addAdmin/:email" element={<AddAdmin />} />
          <Route path="/archiveUsers/:email" element={<ArchiveUsers />} />
          <Route path="/corbeilleDemande/:email" element={<CorbeilleDemande />} />
          <Route path="/cathegorieManagement/:email" element={<CathegorieManagement />} />
          <Route path="/addCathegorie/:email" element={<AddCathegorie />} />
          <Route path="/updateUser/:userId" element={<UpdateUser />} />
          <Route path="/dashboardClient/:email" element={<DashboardClient />} />

<Route path="/consulterPubliciaire/:email" element={<ConsulterPublicitaire />} />
<Route path="/modifierPubliciaire/:email" element={<ModifierPublicitaire />} />
<Route path="/updateReclamationPub/:id" element={<UpdateReclamationPub />} />
<Route path="/addReclamationPub/:email" element={<AddReclamationPub />} />
<Route path="/ReclamationsPub/:email" element={<ReclamationsManagementPub />}></Route>
<Route path="/dashboardPub/:email" element={<DashboardPub />} />
<Route path="/espacesPub/:email" element={<EspacesManagementPub />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
     
    </Router>
  );
}

export default App;