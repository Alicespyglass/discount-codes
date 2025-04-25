import React, { useState } from 'react';
import { Button, Grid, Card, CardContent, Typography, TextField, Box } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

// Helper function to safely encode the link for the URI
const safeEncodeURI = (url) => {
  try {
    return encodeURIComponent(url); // Ensures special characters are encoded properly
  } catch (e) {
    console.error('Error encoding URL:', url);
    return url; // Fallback to the original URL if encoding fails
  }
};

// Helper function to safely decode the link from URI encoding
const safeDecodeURI = (url) => {
  try {
    return decodeURIComponent(url); // Decodes encoded URI
  } catch (e) {
    console.error('Error decoding URL:', url);
    return url; // Fallback to the original URL if decoding fails
  }
}

const discounts = [
  {
    company: "ZOE",
    code: null,
    offer: "10% off",
    logo: "/zoe.png",
    link: "https://zoe.com/get-referral?campaign=GB_REF_1M10P&username=1hx61kbh13&source=app-menu&firstname=Alice&utm_medium=zoe_referral&utm_content=link_share&utm_campaign=GB_REF_1M10P&utm_source=whatsapp"
  },
  {
    company: "Classpass",
    code: null,
    offer: "20 bonus credits on your £1 trial",
    logo: "/classpass.png",
    link: "https://classpass.com/refer/541UUPN726"
  },
  {
    company: "Task Rabbit",
    code: null,
    offer: "£10 off your first task",
    logo: "/taskrabbit.png",
    link: "https://www.taskrabbit.co.uk/s/2uyon/try?utm_source=trycode"
  },
];

export default function DiscountCodesPage() {
  const [query, setQuery] = useState('');

  const filtered = discounts.filter((item) =>
    item.company.toLowerCase().includes(query.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Box sx={{ width: '50%', mx: 'auto', marginBottom: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom >
          Ace Discount Codes
        </Typography>
  
        <TextField
          label="Search company..."
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            marginBottom: 4,
            backgroundColor: '#fff',
            borderRadius: '999px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
            },
          }}
        />
  
        <Grid container spacing={4} justifyContent="center">
          {filtered.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                    <Typography
                      variant="h6"
                      component="a"
                      href={safeDecodeURI(item.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {item.company}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {item.offer}
                  </Typography>
                  {item.code ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        variant="body1"
                        sx={{ backgroundColor: '#f1f1f1', padding: 1, borderRadius: 1 }}
                      >
                        {item.code}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => copyToClipboard(item.code)}
                        startIcon={<FileCopy />}
                      >
                        Copy
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      href={safeDecodeURI(item.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Referral Link
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}