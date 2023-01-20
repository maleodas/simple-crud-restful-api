const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const Genres = [

    {id: 1 , name: "hollywood"},
    {id: 2 , name: "bollywood"},
    {id: 3 , name: "kdrama"},
    {id: 4 ,name: "cdrama"},
    {id: 5 , name: "tollywood"}

];

app.get('/vinely.com/api/movies/genres' , (req,res) => {

    res.send(Genres);

});

app.get('/vinely.com/api/movies/genres/:id' , (req,res) =>{
    
    const genre = Genres.find( g => g.id == parseInt(req.params.id));
    if(!genre) res.status(404).send("object is not found ");
    res.send(genre);

});

app.post('/vinely.com/api/movies/genres' , (req,res) => {
    
    const schema = {
        name: Joi.string().min(5).required()
    };

    const result = Joi.validate(req.body , schema);

    if(result.error){ 
    res.status(400).send("minimum lenght required 5");
    return;
    }

    const genre = {
        id: Genres.length + 1,
        name: req.body.name
    };

    Genres.push(genre);
    res.send(genre);

});

app.put('/vinely.com/api/movies/genres/:id' , (req,res) => {
    
    const genre = Genres.find( g => g.id == parseInt(req.params.id));
    if(!genre) res.status(404).send("object is not found ");

    const schema = {
        name: Joi.string().min(5).required()
    };

    const result = Joi.validate(req.body , schema);

    if(result.error){ 
    res.status(400).send("minimum lenght required 5");
    return;
    }
    
    genre.name = req.body.name;
    res.send(genre);

});

app.delete('/vinely.com/api/movies/genres/:id' , (req,res) => {

    const genre = Genres.find( g => g.id == parseInt(req.params.id));
    if(!genre) res.status(404).send("object is not found ");
    
    const index = Genres.indexOf(genre);
    Genres.splice(index ,1);

});

const Port = process.env.PORT || 3000;

app.listen(Port , () => (console.log("listign on port ${Port} ")) );