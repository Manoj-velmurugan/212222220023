import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import { Log } from '../../../logging-middleware/logger.js';
import { v4 as uuidv4 } from 'uuid';

const MAX_ENTRIES = 5;

function URLShortener() {
  const [entries, setEntries] = useState([
    { longUrl: '', expiry: '', customCode: '' }
  ]);
  const [shortened, setShortened] = useState([]);

  useEffect(() => {
    Log("frontend", "info", "page", "URL Shortener Page Loaded");
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    if (entries.length < MAX_ENTRIES) {
      setEntries([...entries, { longUrl: '', expiry: '', customCode: '' }]);
    }
  };

  const handleShorten = () => {
    const results = [];

    entries.forEach((entry, index) => {
      const { longUrl, expiry, customCode } = entry;

      if (!longUrl) {
        Log("frontend", "warn", "component", `Entry ${index + 1} missing long URL`);
        return;
      }

      const shortCode = customCode || uuidv4().slice(0, 6);
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + (expiry ? expiry : 30) * 60000);
      const shortUrl = `http://localhost:3000/${shortCode}`;

      const item = {
        id: shortCode,
        longUrl,
        shortUrl,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString()
      };

      Log("frontend", "info", "component", `Shortened URL ${longUrl} to ${shortCode}`);
      results.push(item);
    });

    setShortened(results);
    const existing = JSON.parse(localStorage.getItem("shortened-urls")) || [];
const all = [...existing, ...results];
localStorage.setItem("shortened-urls", JSON.stringify(all));

  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔗 URL Shortener
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        {entries.map((entry, index) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={index}
            sx={{ mb: 1 }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Long URL"
                value={entry.longUrl}
                onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                label="Expiry (min)"
                type="number"
                value={entry.expiry}
                onChange={(e) => handleChange(index, 'expiry', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={entry.customCode}
                onChange={(e) => handleChange(index, 'customCode', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={addEntry}
            disabled={entries.length >= MAX_ENTRIES}
          >
            + Add More
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShorten}
          >
            Shorten URLs
          </Button>
        </Box>
      </Paper>

      {shortened.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
        Shortened URLs
          </Typography>
          {shortened.map((url) => (
            <Card key={url.id} sx={{ mb: 2 }} elevation={2}>
              <CardContent>
                <Typography variant="subtitle1">
                  <strong>Short URL:</strong>{' '}
                  <a href={url.shortUrl} target="_blank" rel="noreferrer">
                    {url.shortUrl}
                  </a>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Long URL:</strong> {url.longUrl}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  <strong>Expires At:</strong> {new Date(url.expiresAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default URLShortener;
