const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OK',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
