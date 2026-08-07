/**
 * Predict probability of getting a tatkal seat given current queue state.
 * Formula is explainable (no black-box ML) — suitable for viva/interview explanation.
 * TODO: replace with -> GET /api/recommend/success-probability + WebSocket channel
 */
export function calculateSuccessProbability({ queuePosition, seatsRemaining, avgDropoffRate = 0.22 }) {
  if (!queuePosition || !seatsRemaining) return null;

  // avgDropoffRate = fraction of queued users who abandon or fail payment (from load-test data)
  const effectiveCompetitors = queuePosition * (1 - avgDropoffRate);
  const rawProbability       = seatsRemaining / effectiveCompetitors;
  const probability          = Math.min(0.99, Math.max(0.01, rawProbability));

  let message = "";
  let color   = "";

  if (probability >= 0.75) { message = "High chance of success";       color = "green";  }
  else if (probability >= 0.5)  { message = "Moderate — book quickly"; color = "yellow"; }
  else if (probability >= 0.25) { message = "Low — consider backup";   color = "orange"; }
  else                          { message = "Very low — backup recommended"; color = "red"; }

  return {
    probability:        Math.round(probability * 100),
    message,
    color,
    queuePosition,
    seatsRemaining,
    effectiveCompetitors: Math.round(effectiveCompetitors),
  };
}