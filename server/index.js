var http = require('http');
const express = require('express');
var cors = require('cors')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();             
const port = 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())


/**
 * Get method to the spaces 
 */
app.get('/spaces', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    console.log(req.query);
    console.log(content.spaces);
    res.status(200).send(content.spaces);
})

/**
 * Get method with a param of the id in the spaces data
 */
app.get('/spaces/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    console.log(req.params)
    let id = Number(req.params.id)
    const find = content.spaces.find(ele => ele.id === id);
    if(find){
        res.status(200).send(find);
    }
    else{
        res.status(404).send(`{
            method: 'GET',
            param: ${id},
            message: "space with the id ${id} is not found"}`);
    }
})

/**
 * Get the reservations data
 */
app.get('/reservations', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    console.log(req.query)
    console.log(content.reservation);
    res.status(200).send(content.reservation);
})

/**
 * Create a space
 */
app.post('/spaces', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let body = req.body;
    body['id'] = uuidv4();
    body['state'] = 'free';
    console.log(body);
    content.spaces.push(body);
    fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
    res.status(200).send(`{
        method: 'POST',
        message: "The data is completely save",
        body: ${body}}`);    
})

/**
 * Method for create a new reservation
 */
app.post('/reservations', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'))
    let body = req.body;
    body['id'] = uuidv4();
    body['time'] = Date.now();
    let index = content.spaces.findIndex(elem => elem.state === 'free');
    if(index === -1){
        res.status(404).send(`{
            method: 'POST',
            message: "There is not space for create a reservation",
            body: ${body}}`)
    }else{
        body.space = content.spaces[index].id;
        content.spaces[index].state = "in use";
        content.reservation.push(body);
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send(`{
            method: 'POST',
            message: "The data is completely save",
            body: ${body}}`);
    }
})

/**
 * Method for update data in a space id
 */
app.put('/spaces/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let id = Number(req.params.id)
    const found = content.spaces.find(ele => ele.id === id);
    if(found){
        found.state = req.body['state'];
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send(`{
            method: 'PUT',
            message: "The data is completely save",
            body: ${found}}`);
    }else{
        res.status(404).send(`{
            method: 'PUT',
            message: "There is not space with the id ${id}",
            param: ${id}}`);
    }
})

/**
 * Method to delete the an space
 */
app.delete('/spaces/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let id = Number(req.params.id)
    const found = content.spaces.find(ele => ele.id === id);
    console.log(id, found);
    if(found){
        let index = content.spaces.findIndex(ele => ele.id === id);
        content.spaces.splice(index, 1);
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send(`{
            method: 'DELETE',
            message: "The data is completely delete",
            body: ${found}}`);
    }else{
        res.status(404).send(`{
            method: 'DELETE',
            message: "There is not space with the id ${id}",
            param: ${id}}`);
    }
})

/**
 * Delete the reservation item
 */
app.delete('/reservations/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let id = Number(req.params.id)
    const found = content.reservation.find(ele => ele.id === id);
    if(found){
        let index = content.reservation.findIndex(ele => ele.id === id);
        let spaceChange = content.spaces.find(ele => ele.id === found.space);
        console.log(spaceChange)
        spaceChange.state = "free";
        content.reservation.splice(index, 1);
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send(`{
            method: 'DELETE',
            message: "The data is completely delete",
            body: ${found}}`);
    }else{
        res.status(404).send(`{
            method: 'DELETE',
            message: "There is not reservation with the id ${id}",
            param: ${id}}`);
    }
})



app.listen(port, ()=>{
    console.log('Node.js web server at port 5000 is running..')
});