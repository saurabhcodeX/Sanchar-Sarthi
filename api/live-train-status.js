export default async function handler(req, res) {
  const { trainNo, startDay } = req.query;

  if (!trainNo || !/^\d{4,5}$/.test(trainNo)) {
    return res.status(400).json({ error: "Enter a valid train number." });
  }

  try {
    const response = await fetch(
      `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainNo}&startDay=${startDay || 1}`,
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
      return res.status(response.status).json({ error: data.message || "Live status lookup failed." });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}