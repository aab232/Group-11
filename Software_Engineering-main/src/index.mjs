/* Import dependencies */
import express from "express";
import mysql from "mysql2/promise";
import DatabaseService from "./services/database.service.mjs";


/* Create express instance */
const app = express();
const port = 3000;

/* Add form data middleware */
app.use(express.urlencoded({ extended: true }));

//Use the pug template engine
app.set("view engine", "pug");
app.set("views", "./views");

//Add a static files location
app.use(express.static("static"));

console.log(process.env.MODE_ENV);

const db = await DatabaseService.connect();
const { conn } = db;



// Landing route
app.get("/", (req, res) => {
    res.render("index");
});

// Gallery route
app.get("/gallery", (req, res) => {
    res.render("gallery");
});

// About route
app.get("/about", (req, res) => {
    res.render("about", { title: "Boring about page" });
});

app.get("/cities", async (req, res) => {
    const [rows, fields] = await db.getCities();
    /* Render cities.pug with data passed as plain object */
    return res.render("cities", { rows, fields });
});

app.get("/cities/:id", async (req, res) => {
    const cityId = req.params.id;
    const city = await db.getCity(cityId);
    return res.render("city", { city });
});

/* Update a city by ID */
app.post("/cities/:id", async (req, res) => {
    const cityId = req.params.id;
    const { name } = req.body;
    const sql = `
    UPDATE city
    SET Name = '${name}'
    WHERE ID = '${cityId}';
  `;
    await conn.execute(sql);
    return res.redirect(`/cities/${cityId}`);
});

// Returns JSON array of cities
app.get("/api/cities", async (req, res) => {
    const [rows, fields] = await db.getCities();
    return res.send(rows);
});

app.get("/api/countries", async (req, res) => {
    const countries = await db.getCountries();
    res.send(countries);
});

/* Authentication */

// Register
app.get("/register", (req, res) => {
    res.render("register");
});

// Login
app.get("/login", (req, res) => {
    res.render("login");
});

// Account
app.get("/account", async (req, res) => {
    const { auth, userId } = req.session;

    if (!auth) {
        return res.redirect("/login");
    }

    const sql = `SELECT id, email FROM user WHERE user.id = ${userId}`;
    const [results, cols] = await conn.execute(sql);
    const user = results[0];

    res.render("account", { user });
});

app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const sql = `INSERT INTO user (email, password) VALUES ('${email}', '${hashed}')`;
        const [result, _] = await conn.execute(sql);
        const id = result.insertId;
        req.session.auth = true;
        req.session.userId = id;
        return res.redirect("/account");
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.sqlMessage);
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).send("Missing credentials");
    }

    const sql = `SELECT id, password FROM user WHERE email = '${email}'`;
    const [results, cols] = await conn.execute(sql);

    const user = results[0];

    if (!user) {
        return res.status(401).send("User does not exist");
    }

    const { id } = user;
    const hash = user?.password;
    const match = await bcrypt.compare(password, hash);

    if (!match) {
        return res.status(401).send("Invalid password");
    }

    req.session.auth = true;
    req.session.userId = id;

    return res.redirect("/account");
});


// Run server!
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});