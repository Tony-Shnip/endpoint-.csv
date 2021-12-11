const express = require('express')
const app = express()
const fs = require('fs')
const Papa = require('papaparse')
const logic = require('./logic')


//Endpoint
app.get('/:id/:timestamp', (req, res) => {
  let id = req.params.id;
  let time = new Date(parseInt(req.params.timestamp));
  let amenity = [];
  let reservations = [];

  fs.readFile(__dirname + '/' + 'Amenity.csv', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    Papa.parse(data, {
      complete: results => {
       amenity.push(results.data[id][0], results.data[id][1]);
      }
    });
    
    fs.readFile(__dirname + '/' + 'Reservations.csv', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      Papa.parse(data, {
        complete: results => {
         results.data.forEach((item) => {
           let reservDate = new Date(parseInt(item[5]));
           if (item[1] === id && time.getFullYear() === reservDate.getFullYear() && time.getMonth() === reservDate.getMonth() && time.getDate() === reservDate.getDate()) {
            reservations.push(item);
           }
         })
         res.send(logic.showData(amenity, reservations));
         res.end();
        }
      });
    })
  }) 
})

const server = app.listen(8080, err => {
  if (err) {
    console.log(err);
    return;
  }
  else {
    console.log('Server has been started...');
  }
})