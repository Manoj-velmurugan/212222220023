import React, { useEffect, useState } from 'react';
import { Log } from '../../../logging-middleware/logger';
import {
  Box,
  Typography,
  Paper,
  Link,
  Divider,
  Stack
} from '@mui/material';

const Statistics = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    Log("frontend", "info", "page", "Statistics Page Loaded");

    const data = JSON.parse(localStorage.getItem("shortened-urls")) || [];
    setUrls(data);
  }, []);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No shortened URLs found.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {urls.map((url) => (
            <Paper key={url.id} elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Short URL:</strong>{' '}
                <Link href={url.shortUrl} target="_blank" rel="noreferrer">
                  {url.shortUrl}
                </Link>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Long URL:</strong> {url.longUrl}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Created At:</strong> {new Date(url.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Expires At:</strong> {new Date(url.expiresAt).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="caption" color="text.secondary">
                Click Count: {Math.floor(Math.random() * 50)}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Statistics;
