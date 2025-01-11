const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from "./config/connection.js";
import routes from './routes/index.js';
import Userroutes from './routes/api/userroutes.js';
// import authMiddleware from './middleware/auth.js'; 


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static('../client/src'));
app.use(express.json());
app.use('/api/users', Userroutes);
// app.use(authMiddleware);
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});