import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material';
import URLShortener from './pages/URLShortener';
import Statistics from './pages/Statistics';
import RedirectHandler from './pages/RedirectHandler';

function App() {
  return (
    <Router>
      <Box sx={{ p: 2, borderBottom: '1px solid #ccc', mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" component={Link} to="/">
            URL Shortener
          </Button>
          <Button variant="outlined" component={Link} to="/stats">
            Statistics
          </Button>
        </Stack>
      </Box>

      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
