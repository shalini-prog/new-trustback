require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Admin Auth Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});