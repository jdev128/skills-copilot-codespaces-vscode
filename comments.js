// Create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Comment added');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});