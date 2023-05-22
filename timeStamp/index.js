const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  let inputDate;
  if (date) {
    if (!isNaN(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      inputDate = new Date(date);
    }
  } else {
    inputDate = new Date();
  }

  if (isNaN(inputDate.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString()
    });
  }
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
