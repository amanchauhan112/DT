const express = require('express')
const router = express()
const EventModel = require("./Schema");

router.get('', (req, res) => {
  res.json("Server is Running")
});

//API to get events based on query parameters

router.get('/events', async (req, res) => {

  let {type,limit,page,id} = req.query
  let response;

  if (id !== undefined) {
    response = await EventModel.find({ _id: id });
  }
  else {

    // If type is latest=>show the last created event first

    if (type === "latest") {
      response = await EventModel.find().sort({ createdAt: -1 })
    }
    else {
      response = await EventModel.find();
    }
    
    //Show the documents with given limit per page

    if (page !== undefined)
      response = response && response.slice((page - 1) * limit, (page) * limit);

  }
  res.send(response);
})

//API to create an event

router.post('/events/', async (req, res) => {

  //We should not have event with same name
  const name = req.body.name
  
  try {

    let event = new EventModel(req.body);

    const eventExist = await EventModel.findOne({ name: name });

    //If event with same name exist , show error
    if (eventExist) {
      res.json({ error: "Event already exist" });
    } else {
      event
        .save()
        .then((result) => {
          res.json({ message: `Event successfully registered with id ${result._id}` });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  } catch (error) {
    res.status(400).send(error);
  }
})

//API to update an event based on its id

router.put('/events/:id', async (req, res) => {
  EventModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { new: true }
  )
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

//API to delete an event

router.delete('/events/:id', async (req, res) => {
  try {
    let response = await EventModel.findByIdAndDelete(req.params.id)
    res.send(response);
  }
  catch (err) {
    console.log(err);
    res.send('An Error occured while deleting document');
  }
})

module.exports = router