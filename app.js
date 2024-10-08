const express = require('express');
const cors = require('cors');
const customRoute = require('./helper/router');

const app = express();
app.use(express.json());
app.use(cors());

customRoute(app);

// const PORT = 5005;
// app.listen(PORT, () => {
//     console.log(`Server is listening PORT : ${PORT}`);
// });

app.listen(process.env.PORT);
