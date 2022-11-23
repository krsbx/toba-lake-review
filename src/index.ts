import { config } from 'dotenv';
import express from 'express';
import root from 'utils/root';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started @ ${PORT}`));

root(app);
