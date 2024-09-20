import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../components/client/outils/Loadable';
import PubliciteDetails from '../components/admin/publicites/PubliciteDetails';

/* ***Layouts**** */
const FallLayoutClient = Loadable(lazy(() => import('../components/client/outils/FullLayoutClient')));
const FallLayoutPub = Loadable(lazy(() => import('../components/publicitaire/outils/FallLayoutPub')));
const FallLayoutAdmin = Loadable(lazy(() => import('../components/admin/outils/FallLayoutAdmin')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));

/* ****Pages***** */
// Admin pages
const Dashboard = Loadable(lazy(() => import('../components/admin/outils/dashboard/Dashboard')));
const ModifierUser = Loadable(lazy(() => import('../components/admin/adminCrud/ModifierUser')));
const ConsulterUser = Loadable(lazy(() => import('../components/admin/adminCrud/ConsulterUser')));
const ChangePassword = Loadable(lazy(() => import('../components/admin/adminCrud/ChangePassword')));
const FirstUpdate = Loadable(lazy(() => import('../components/admin/adminCrud/FirstUpdate')));
const UsersManagement = Loadable(lazy(() => import('../components/admin/adminCrud/userManagement')));
const AddEspacePublic = Loadable(lazy(() => import('../components/admin/espacePublic/addEspacePublic')));
const EspacePublicManagement = Loadable(lazy(() => import('../components/admin/espacePublic/espacePuclicManagement')));
const StationsManagement = Loadable(lazy(() => import('../components/admin/station/stationsManagement')));
const AddStation = Loadable(lazy(() => import('../components/admin/station/addStations')));
const CreateClient = Loadable(lazy(() => import('../components/admin/clients/createClient')));
const CreatePublicite = Loadable(lazy(() => import('../components/admin/publicites/createPublicitaire')));
const DemandesManagement = Loadable(lazy(() => import('../components/admin/demande/demandeManagement')));
const CassierManagement = Loadable(lazy(() => import('../components/admin/cassier/cassierManagement')));
const CorbeilleDemande = Loadable(lazy(() => import('../components/admin/corbeille/corbeilleDemande')));
const AddAdmin = Loadable(lazy(() => import('../components/admin/adminCrud/addAdmin')));
const ReclamationsManagement = Loadable(lazy(() => import('../components/admin/reclamation/reclamationManagement')));
const CathegorieManagement = Loadable(lazy(() => import('../components/admin/reclamation/cathegorie/cathegorieManagemen')));
const AddCathegorie = Loadable(lazy(() => import('../components/admin/reclamation/cathegorie/addCathegorie')));
const UpdateEspacePublic = Loadable(lazy(() => import('../components/admin/espacePublic/updateEspacePublic')));
const UpdateStation = Loadable(lazy(() => import('../components/admin/station/updateStation')));
const UpdateReclamationStat = Loadable(lazy(() => import('../components/admin/reclamation/updateReclamationStat')));
const UpdateCategorie = Loadable(lazy(() => import('../components/admin/reclamation/cathegorie/updateCategorie')));
const UpdateUser = Loadable(lazy(() => import('../components/admin/adminCrud/updateUser')));
const ArchiveUsers = Loadable(lazy(() => import('../components/admin/archive/archiveUser')));
const PublicitesManagement = Loadable(lazy(() => import('../components/admin/publicites/publicitesManagement')));
const DecisionPub = Loadable(lazy(() => import('../components/admin/publicites/decisionPub')));

// Client pages
const AddReclamation = Loadable(lazy(() => import('../components/client/reclamations/addReclamation')));
const ReclamationsManagementClient = Loadable(lazy(() => import('../components/client/reclamations/reclamationMnagementClient')));
const EspacesManagementClient = Loadable(lazy(() => import('../components/client/espacePublic/espaceManagement')));
const StationsManagementClient = Loadable(lazy(() => import('../components/client/station/stationsManagementClient')));
const AddQuestion = Loadable(lazy(() => import('../components/client/question/addQuestion')));
const Publicitee = Loadable(lazy(() => import('../components/client/publicite/publicitee')));
const ChangePasswordClient = Loadable(lazy(() => import('../components/client/clientCrud/changePasswordClient')));
const ConsulterClient = Loadable(lazy(() => import('../components/client/clientCrud/consulterClient')));
const ModifierClient = Loadable(lazy(() => import('../components/client/clientCrud/modifierClient')));
const UpdateReclamation = Loadable(lazy(() => import('../components/client/reclamations/updateReclamation')));
const DashboardClient = Loadable(lazy(() => import('../components/client/outils/dashboard/dashboardClient')));
const QuestionManagementClient = Loadable(lazy(() => import('../components/client/question/questionManagement')));

// Publicitaire pages
const AddPublicite = Loadable(lazy(() => import('../components/publicitaire/publicite/addPublicite')));
const PublicitesManagementPub = Loadable(lazy(() => import('../components/publicitaire/publicite/publiciteManagementPub')));
const UpdatePub = Loadable(lazy(() => import('../components/publicitaire/publicite/updatePub')));
const ChangePasswordPub = Loadable(lazy(() => import('../components/publicitaire/pubCrud/changePasswordPub')));
const ConsulterPublicitaire = Loadable(lazy(() => import('../components/publicitaire/pubCrud/consulterPub')));
const ModifierPublicitaire = Loadable(lazy(() => import('../components/publicitaire/pubCrud/modifierPub')));
const UpdateReclamationPub = Loadable(lazy(() => import('../components/publicitaire/reclamations/updateReclamationPub')));
const AddReclamationPub = Loadable(lazy(() => import('../components/publicitaire/reclamations/addReclamationPub')));
const ReclamationsManagementPub = Loadable(lazy(() => import('../components/publicitaire/reclamations/reclamationMnagementPub')));
const DashboardPub = Loadable(lazy(() => import('../components/publicitaire/outils/dashboard/dashboardPub')));
const EspacesManagementPub = Loadable(lazy(() => import('../components/publicitaire/espacePublic/espaceManagementPub')));

// Authentication and errors
const Home = Loadable(lazy(() => import('../pages/index')));
const SigninPage = Loadable(lazy(() => import('../pages/signin')));
const SignupPage = Loadable(lazy(() => import('../pages/signup')));
const ResetPassword = Loadable(lazy(() => import('../components/accueil/resetPassword/ResetPassword')));
const RequestResetPassword = Loadable(lazy(() => import('../components/accueil/resetPassword/RequestResetPassword')));
 const EmailVerify = Loadable(lazy(() => import('../components/admin/outils/emailVerification/verification')));
const DemandeClients = Loadable(lazy(() => import('../components/admin/demande/demandeClients')));
const DemandePub = Loadable(lazy(() => import('../components/admin/demande/demandePub')));
const NotFound = Loadable(lazy(() => import('../components/notFound')));

/* ****Routes Configuration**** */
const Router = [
  
    {path:'/', element: <Home/>},
    {path:'/signin', element: <SigninPage/>},
    {path:'/signup', element: <SignupPage/>},
    {path:"/resetPassword/:token" ,element:<ResetPassword />},
    { path:"/requestResetPassword" ,element:<RequestResetPassword />},
    {path:"/users/:id/verify/:token" ,element:<EmailVerify />} ,
    { path:"/demandeClient" ,element:<DemandeClients />},
    { path:"/demandePub", element:<DemandePub />}
    ,
  
  {
    path: '/admin',
    element: <FallLayoutAdmin />,
    children: [
     
      { path: 'dashboard/:email', element: <Dashboard /> },
      { path: 'modifierUser/:email', element: <ModifierUser /> },
      { path: 'consulterUser/:email', element: <ConsulterUser /> },
      { path: 'password', element: <ChangePassword /> },
      { path: 'firstUpdate/:email', element: <FirstUpdate /> },
      { path: 'cassierManagement/:email', element: <CassierManagement /> },
      { path: 'dashboard/:email', element: <Dashboard /> },
      { path: 'pubsManagement/:email', element: <PublicitesManagement /> },
      { path: 'decisionPub/:pubId', element: <DecisionPub /> },
      { path: 'updateStation/:id', element: <UpdateStation /> },
      { path: 'updateCategorie/:id', element: <UpdateCategorie /> },
      { path: 'updateReclamationStat/:id', element: <UpdateReclamationStat /> },
      { path: 'usersManagement/:email', element: <UsersManagement /> },
      { path: 'addAdmin/:email', element: <AddAdmin /> },
      { path: 'archiveUsers/:email', element: <ArchiveUsers /> },
      { path: 'corbeilleDemande/:email', element: <CorbeilleDemande /> },
      { path: 'cathegorieManagement/:email', element: <CathegorieManagement /> },
      { path: 'addCathegorie/:email', element: <AddCathegorie /> },
      { path: 'updateUser/:userId', element: <UpdateUser /> },
      { path: 'addEspacePublic/:email', element: <AddEspacePublic /> },
      { path: 'espacePublicManagement/:email', element: <EspacePublicManagement /> },
      { path: 'updateEspacePublic/:espaceId', element: <UpdateEspacePublic /> },
      { path: 'stationsManagement/:email', element: <StationsManagement /> },
      { path: 'addStation/:email', element: <AddStation /> },
      { path: 'decisionClient/:id', element: <CreateClient /> },
      { path: 'decisionPublicite/:id', element: <CreatePublicite /> },
      { path: 'demandeManagement/:email', element: <DemandesManagement /> },
      { path: 'reclamationsManagement/:email', element: <ReclamationsManagement /> },
      { path: "publicite/:id/details", element:<PubliciteDetails />},
      { path: '*', element: <NotFound /> },
    ],
  },
  
    {
      path: '/client',
      element: <FallLayoutClient />,
      children: [
        { path: 'addReclamation/:email', element: <AddReclamation /> },
        { path: 'reclamationsClient/:email', element: <ReclamationsManagementClient /> },
        { path: 'espacesClient/:email', element: <EspacesManagementClient /> },
        { path: 'stationsClient/:email', element: <StationsManagementClient /> },
        { path: 'addQuestion/:email', element: <AddQuestion /> },
        { path: 'Publicitee/:email', element: <Publicitee /> },
        { path: 'passwordClient', element: <ChangePasswordClient /> },
        { path: 'consulterClient/:email', element: <ConsulterClient /> },
        { path: 'modifierClient/:email', element: <ModifierClient /> },
        { path: 'updateReclamation/:id', element: <UpdateReclamation /> },
        { path: 'dashboardClient/:email', element: <DashboardClient /> },
        { path: 'questionManagement/:email', element: <QuestionManagementClient /> },
        { path: '*', element: <NotFound /> },
      ],
    },
    
  {
    path: '/pub',
    element: <FallLayoutPub />,
    children: [
      { path: 'addPublicite/:email', element: <AddPublicite /> },
      { path: 'publicitesManagementPub/:email', element: <PublicitesManagementPub /> },
      { path: 'updatePublicite/:id', element: <UpdatePub /> },
      { path: 'passwordPub', element: <ChangePasswordPub /> },
      { path: 'consulterPubliciaire/:email', element: <ConsulterPublicitaire /> },
      { path: 'modifierPubliciaire/:email', element: <ModifierPublicitaire /> },
      { path: 'updateReclamationPub/:id', element: <UpdateReclamationPub /> },
      { path: 'addReclamationPub/:email', element: <AddReclamationPub /> },
      { path: 'reclamationsPub/:email', element: <ReclamationsManagementPub /> },
      { path: 'dashboardPub/:email', element: <DashboardPub /> },
      { path: 'espacesPub/:email', element: <EspacesManagementPub /> },
      { path: '*', element: <NotFound /> },
    ],
  },

];

export default Router;
