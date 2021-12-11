const express = require('express')
const app = express()
const fs = require('fs')
const Papa = require('papaparse')
const logic = require('./logic')


//Endpoint
app.get('/:id/:timestamp', (req, res) => {
  let amenityId = req.params.id;
  let reservationTime = new Date(parseInt(req.params.timestamp));
  let amenity = [];
  let reservations = [];

  fs.readFile(__dirname + '/' + 'Amenity.csv', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.end(err);
    }

    Papa.parse(data, {
      complete: results => {
       amenity.push(results.data[amenityId][0], results.data[amenityId][1]);
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
                              //checking if its same Date and adding to reservations list
           let reservDate = new Date(parseInt(item[5]));
           if (item[1] === amenityId && reservationTime.getFullYear() === reservDate.getFullYear() && reservationTime.getMonth() === reservDate.getMonth() && reservationTime.getDate() === reservDate.getDate()) {
            reservations.push(item);
           }
         })
         res.send(logic.processDataAndShow(amenity, reservations));  //showData sorts and adding to list reservations for choosen amenity
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