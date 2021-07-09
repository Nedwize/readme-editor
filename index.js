const express = require('express');
const axios = require('axios');
var cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

const getURL = (username, repo, branch = 'master') => {
  return `https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`;
};

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OK',
  });
});

app.post('/readme', async (req, res) => {
  let { username, repository, branch } = req.body;
  if (!username || !repository) {
    return res.json({
      success: false,
      message: 'Username or Repo not defined',
    });
  }
  if (!branch) {
    branch = 'master';
  }

  try {
    let response = await axios.get(getURL(username, repository, branch));
    return res.json({
      success: true,
      message: 'OK',
      data: response.data,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Couldnt fetch data',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
