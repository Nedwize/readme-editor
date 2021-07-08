const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;

const getURL = (username, repo, branch = 'master') => {
  return `https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`;
};

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OK',
  });
});

app.post('/readme', async (req, res) => {
  const { username, repository, branch } = req.body;
  if (!username || !repository) {
    return res.json({
      success: false,
      message: 'Username or Repo not defined',
    });
  }
  let response = await axios.get(getURL(username, repository, branch));

  res.json({
    success: true,
    message: 'OK',
    data: response.data,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
