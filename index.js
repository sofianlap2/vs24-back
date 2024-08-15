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
app.use(cors());
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Routes
const publiciteRoutes = require('./routes/publiciteRoute');
const userRoutes = require('./routes/userRoutes');
const espacePuclicRoutes = require('./routes/espacePublicRoutes');
const stationRoutes = require('./routes/stationRoutes');
const demandeRoutes = require('./routes/demandeRoutes');
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
const globalErrorHandler = require('./security/globalErrorHandler');
const questionRoues = require('./routes/questionRoutes');

// Initialize admin account and connect to the database
adminAccount();
connectDB();

// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

io.on('connection', (socket) => {
  socket.on('subscribeToNotifications', (email) => {
    socket.join(email);
  });

  const emitNotification = (notification) => {
    io.to(notification.userEmail).emit('notification', notification);
  };

  const emitNotificationRead = (notificationId) => {
    io.to(notification.userEmail).emit('notificationRead', { notificationId });
  };

  socket.on('disconnect', () => {
    // Clean up connections
  });
});

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
app.use('/questions', questionRoues);

// Error handling middleware
app.use(globalErrorHandler);

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// Start server
const PORT = process.env.PORT;
const HOST = process.env.HOST;
server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});