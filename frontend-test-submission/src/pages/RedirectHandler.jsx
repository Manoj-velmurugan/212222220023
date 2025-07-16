import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Log } from '../../../logging-middleware/logger';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const [status, setStatus] = useState("Checking...");
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("shortened-urls")) || [];
    const entry = storedData.find(item => item.id === shortcode);

    if (!entry) {
      setStatus("Short URL not found.");
      Log("frontend", "error", "component", `Shortcode ${shortcode} not found`);
      return;
    }

    const now = new Date();
    const expiryTime = new Date(entry.expiresAt);

    if (now > expiryTime) {
      setStatus("This short URL has expired.");
      Log("frontend", "warn", "component", `Shortcode ${shortcode} expired`);
      return;
    }

    Log("frontend", "info", "component", `Redirecting from shortcode ${shortcode}`);
    setStatus("Redirecting...");
    setRedirected(true);

    setTimeout(() => {
      window.location.href = entry.longUrl;
    }, 1000);
  }, [shortcode]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 2
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          {redirected ? "Redirecting..." : "Redirection Info"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {status}
        </Typography>
        {redirected && (
          <Box mt={2}>
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RedirectHandler;
