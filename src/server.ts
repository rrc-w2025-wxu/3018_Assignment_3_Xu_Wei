import express from "express";
import Routes from "../src/api/v1/routes/Routes";

const app = express();

app.use(express.json());

app.use("/api/v1", Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;