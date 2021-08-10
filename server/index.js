var http = require('http');
const express = require('express');
const fs = require('fs');

const app = express();             
const port = 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// GET Methods
app.get('/spaces', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    console.log(req.query);
    console.log(content.spaces);
    res.status(200).send(content.spaces);
})

app.get('/spaces/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    console.log(req.params)
    let id = Number(req.params.id)
    const find = content.spaces.find(ele => ele.id === id);
    if(find){
        res.status(200).send(find);
    }
    else{
        res.status(404).send(`space with the id ${id} is not found`);
    }
})

app.get('/reservations', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    console.log(req.query)
    console.log(content.reservation);
    res.status(200).send(content.reservation);
})

// POST Methods
app.post('/spaces', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let body = req.body;
    body['id'] = Math.floor(Math.random() * 100)
    body['state'] = 'free';
    console.log(body);
    content.spaces.push(body);
    fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
    res.status(200).send('Post data');
    
})
app.post('/reservations', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'))
    let body = req.body;
    body['id'] = Math.floor(Math.random() * 100);
    body['time'] = Date.now();
    let index = content.spaces.findIndex(elem => elem.state === 'free');
    if(index === -1){
        res.status(404).send('There is not empty space')
    }else{
        body.space = content.spaces[index].id;
        content.spaces[index].state = "in use";
        content.reservation.push(body);
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send('Post new data');
    }

})

// PUT method
app.put('/spaces/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let id = Number(req.params.id)
    const found = content.spaces.find(ele => ele.id === id);
    if(found){
        found.state = req.body['state'];
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send('Put new data');
    }else{
        res.status(404).send(`space with the id ${id} is not found`);
    }
})

// DELETE method
app.delete('/spaces/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let id = Number(req.params.id)
    const found = content.spaces.find(ele => ele.id === id);
    console.log(id, found);
    if(found){
        let index = content.spaces.findIndex(ele => ele.id === id);
        content.spaces.splice(index, 1);
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send('Delete one space data successfully');
    }else{
        res.status(404).send(`space with the id ${id} is not found`);
    }
})

app.delete('/reservations/:id', function(req, res){
    let content = JSON.parse(fs.readFileSync('./DB/spaces.json', 'utf8'));
    let id = Number(req.params.id)
    const found = content.reservation.find(ele => ele.id === id);
    if(found){
        let index = content.reservation.findIndex(ele => ele.id === id);
        content.reservation.splice(index, 1);
        fs.writeFileSync('./DB/spaces.json', JSON.stringify(content));
        res.status(200).send('Delete one reservation data successfully');
    }else{
        res.status(404).send(`space with the id ${id} is not found`);
    }
})



app.listen(port, ()=>{

    console.log('Node.js web server at port 5000 is running..')
});