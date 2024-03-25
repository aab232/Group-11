Week 7

1. Make sure you are in the correct directory.

Follow the next commands. 

move to the src directory
cd src 

nmp install pug
move back to the previous directory
cd ..

2. For pug integration, the following lines were added to index.js

//Use the pug template engine
app.set("view engine", "pug");
app.set("views","./views");

//Add a static file location
app.use(express.static("static"));

/* Landing route */
app.get("/",(req, res) => {
  res.render("index1",
    { 'title': 'My index page', 'heading': 'My heading' });
});

This part is from the week six presentation.
//Dinamic route example
app.get("/city/:id", function (req, res) {
  //req.params contains any parametres in the request
  //We can examinit in the console for debugging purpose
  console.log(req, res);
  //Retrive the name paramentre and use it in a dinamic generated 
  res.send("Id is " + req.params.id);

});

3. Create a new folder, 'views'  inside the src folder for pug files, was created.

4. Run  docker-compose up --build  and check your localhost3000.




