const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({
  origin: '*', // Adjust this based on your front-end URL for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Database and Admin Account Initialization
const connectDB = require('./database');
const adminAccount = require('./security/adminAccount');
adminAccount();
connectDB();

// Route Imports
const publiciteRoutes = require('./routes/publiciteRoute');
const userRoutes = require('./routes/userRoutes');
const espacePuclicRoutes = require('./routes/espacePublicRoutes');
const stationRoutes = require('./routes/stationRoutes');
const demandeRoutes = require('./routes/demandeRoutes');
const cassierRoutes = require('./routes/cassierRoutes');
const demandeRejet = require('./routes/demandeRejetRoutes');
const authenticationRoute = require('./security/authentication');
const resetPassword = require('./security/resetPassword');
const cathegorieRoutes = require('./routes/cathegorieRoutes');
const reclamationRoutes = require('./routes/reclamationRoutes');
const userDeletedRoute = require('./routes/userDeletedRoute');
const notificationRoute = require('./routes/notificationRoute');
const questionRoutes = require('./routes/questionRoutes');
const globalErrorHandler = require('./security/globalErrorHandler');
const newsletterRoutes = require('./routes/newsletterRoute');
// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust this based on your front-end URL for better security
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});
module.exports = { io };
io.on('connection', (socket) => {

  socket.on('subscribeToNotifications', (email) => {
    socket.join(email);
  });

  const emitNotification = (notification) => {
    console.log(`Emitting notification to: ${notification.userEmail}`);
    io.to(notification.userEmail).emit('notification', notification);
  };

  const emitNotificationRead = (notificationId, userEmail) => {
    console.log(`Notification read for ID: ${notificationId}`);
    io.to(userEmail).emit('notificationRead', { notificationId });
  };

  socket.on('disconnect', () => {
  });

  // Attach these functions to the socket for potential usage
  socket.emitNotification = emitNotification;
  socket.emitNotificationRead = emitNotificationRead;
});

// Attach Socket.io instance to request object
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
app.use('/publicites', publiciteRoutes);
app.use('', authenticationRoute);
app.use('', resetPassword);
app.use('/demandes', demandeRoutes);
app.use('/cassiers', cassierRoutes);
app.use('/demandeRejet', demandeRejet);
app.use('/questions', questionRoutes);
app.use('/newsletters', newsletterRoutes);

// Error handling middleware
app.use(globalErrorHandler);

// Catch-all route to serve the React app (must be placed after other routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // Default to all interfaces if HOST is not set
server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
