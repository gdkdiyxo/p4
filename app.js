const express = require('express');
const path = require('path');
const hbs = require('hbs');

const partialPath = path.join(__dirname, "./partials")
const publicDir = path.join(__dirname, "./")


const app = express()
const port = process.env.PORT || 3000
const name = "Firzan Azrai"

app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: "INTER MANA",
        name: name
    })
})

//setup express server
app.listen(port, () => {
    console.log("Server is up on port 3000")
})