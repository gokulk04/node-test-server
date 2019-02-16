const express = require("express"); 
const hbs = require("hbs"); 
const fs = require("fs"); 


const app = express(); 

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear(); 
});
hbs.registerHelper("capitalize", (text) => {
    return text.toUpperCase(); 
});

app.set("view engine", "hbs"); 

app.use((req, res, next) => {
    const now = new Date().toString(); 
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile("server.log", log + "\n", (error) => {
        if (error) {
            console.log("unable to append to server.log"); 
        }
    });
    next();     
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page 12", 
        welcomeMessage: "Welcome",
    })
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page 12", 
    }); 
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "unable to handle request"
    });
}); 


app.listen(3000);
