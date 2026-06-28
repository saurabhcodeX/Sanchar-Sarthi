export default async function handler(req, res) {
  const { pnr } = req.query;

  if (!pnr || !/^\d{10}$/.test(pnr)) {
    return res.status(400).json({ error: "Enter a valid 10-digit PNR number." });
  }

  try {
    const response = await fetch(
      `https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnr}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "irctc1.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "PNR lookup failed. Try again." });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}