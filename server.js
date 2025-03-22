const express = require("express");
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Redirect to QuickBooks for authentication
app.get("/auth/quickbooks", (req, res) => {
  const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=com.intuit.quickbooks.accounting&state=12345`;
  res.redirect(authUrl);
});

// Handle callback and get access token
app.get("/auth/callback", async (req, res) => {
  const { code, realmId } = req.query;

  const tokenUrl = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
  const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(
      tokenUrl,
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      realmId,
    });
  } catch (error) {
    res.status(500).send("Error getting access token");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
