import express from 'express'
import {
  menuApi,
  productsApi,
  userApi
} from "./routes";

const baseApiUrl = '/api/v1'
const app = express();
const port = 8080;

app.use(express.json())

app.use(`${baseApiUrl}/products`, productsApi)
app.use(`${baseApiUrl}/users`, userApi)
app.use(`${baseApiUrl}/menu`, menuApi)

app.listen(port, () => console.log(`Running on port ${port}`));
