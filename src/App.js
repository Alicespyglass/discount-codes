import React, { useState } from 'react';
import { Button, Grid, Card, CardContent, Typography, TextField, Box } from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import zoeLogo from './assets/zoe.png';
import classpassLogo from './assets/classpass.svg';
import taskrabbitLogo from './assets/taskrabbit.png';
import umLogo from './assets/urbanmassage.png';
import goustoLogo from './assets/gousto.png';


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
    company: "Classpass",
    code: null,
    offer: "20 bonus credits on your £1 trial",
    logo: classpassLogo,
    link: "https://classpass.com/refer/541UUPN726"
  },
  {
    company: "Gousto",
    code: null,
    offer: "65% off your first box, PLUS 25% off all other boxes in your first two months",
    logo: goustoLogo,
    link: "https://www.gousto.co.uk/raf?promo_code=PETER44635416&utm_source=iosapp"
  },
  {
    company: "Task Rabbit",
    code: null,
    offer: "£10 off your first task",
    logo: taskrabbitLogo,
    link: "https://www.taskrabbit.co.uk/s/2uyon/try?utm_source=trycode"
  },
  {
    company: "Urban Massage",
    code: null,
    offer: "20% off your first booking",
    logo: umLogo,
    link: "https://urban.co/i/RALICECBM2"
  },
  {
    company: "ZOE",
    code: null,
    offer: "10% off",
    logo: zoeLogo,
    link: "https://zoe.com/get-referral?campaign=GB_REF_1M10P&username=1hx61kbh13&source=app-menu&firstname=Alice&utm_medium=zoe_referral&utm_content=link_share&utm_campaign=GB_REF_1M10P&utm_source=whatsapp"
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
            '& label.Mui-focused': {
              color: '#28a745', // Lime green when focused
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              '&.Mui-focused fieldset': {
                borderColor: '#32CD32', // Lime green when focused
              },
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
                      sx={{
                        backgroundColor: '#32CD32', // Lime green
                        color: 'white', // White text
                        borderRadius: '20px', // Rounded button
                        padding: '10px 20px', // Add padding for better size
                        '&:hover': {
                          backgroundColor: '#28a745', // Slightly darker lime on hover
                        },
                      }}
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