const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));

const userRoutes = require('./routes/userRoutes');
const espacePuclicRoutes= require('./routes/espacePublicRoutes');
const stationRoutes= require('./routes/stationRoutes');
const demandeRoutes= require('./routes/demandeRoutes');
const cassierRoutes = require('./routes/cassierRoutes');
const demandeRejet = require('./routes/demandeRejetRoutes');
const authenticationRoute = require('./security/authentication');
const resetPassword = require('./security/resetPassword');
const adminAccount = require('./security/adminAccount');
const cathegorieRoutes = require('./routes/cathegorieRoutes');
const reclamationRoutes = require('./routes/reclamationRoutes');
const userDeletedRoute = require('./routes/userDeletedRoute');
const notificationRoute = require('./routes/notificationRoute');
const connectDB = require('./database');
adminAccount();

const cors = require('cors');
const globalErrorHandler = require('./security/globalErrorHandler');
connectDB();
app.use(cors());
app.use(express.json());

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Configure Socket.IO with the server
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL, // The React frontend listens on this port
    methods: ['GET', 'POST'],
  },
});

// Handle Socket.IO connection event
io.on('connection', (socket) => {

  // Listen for notifications subscriptions
  socket.on('subscribeToNotifications', (email) => {
    socket.join(email);
  });

  // Emit a notification to subscribed clients
  const emitNotification = (notification) => {
    io.to(notification.userEmail).emit('notification', notification);
  };

  // Emit a read notification to subscribed clients
  const emitNotificationRead = (notificationId) => {
    io.to(notification.userEmail).emit('notificationRead', { notificationId });
  };

  // Clean up connections
  socket.on('disconnect', () => {
  });
});

// Attach the io object to the req object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount routes
app.use('/users', userRoutes);
app.use('/cathegories', cathegorieRoutes);
app.use('/reclamations', reclamationRoutes);
app.use('/espacePublic', espacePuclicRoutes);
app.use('/station', stationRoutes);
app.use('/usersDeleted', userDeletedRoute);
app.use('/notification', notificationRoute);

// Mount routes for authentication and password reset
app.use('', authenticationRoute);
app.use('', resetPassword);
app.use('/demandes', demandeRoutes);
app.use('/cassiers', cassierRoutes);
app.use('/demandeRejet', demandeRejet);

app.use(globalErrorHandler);

// Specify the port and IP address for the server to listen on
const PORT = process.env.PORT ;
const HOST = process.env.HOST; // Your server IP
server.listen(PORT, HOST, () => {
});
