const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const database = require("./database.json");
const app = express();
const port = process.env.PORT || 7000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: " API",
      description: "Project API Information",
      servers: ["http://localhost:7000"]
    }
  },
  // ['.routes/*.js']
  apis: ["db.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 

app.get("/database",  (req, res) => {
  res.json(database);
});

app.get("/database/:name", (req, res) => {
  const resalt = database.filter(database => database.name == req.params.name)
  if(resalt.length > 0){
    res.json(resalt[0])
  }else{
    res.json({})
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
