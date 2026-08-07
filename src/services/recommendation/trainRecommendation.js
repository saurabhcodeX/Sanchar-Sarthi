import { trainSuccessHistory } from "./mockData";

/**
 * Recommend trains ranked by tatkal booking success probability.
 * TODO: replace mock data fetch with -> GET /api/recommend/trains?from=X&to=Y&date=Z
 */
export async function getRecommendedTrains({ trains }) {
  await new Promise(r => setTimeout(r, 300));

  return trains.map(train => {
    const history = trainSuccessHistory.find(h => h.trainNo === train.number)
      || { successRate: 0.70, avgWaitMs: 2500, quotaSize: 50, demand: 180 };

    // Weighted score: 60% historical success, 30% seat-demand ratio, 10% speed
    const seatDemandRatio  = Math.min(1, history.quotaSize / history.demand);
    const speedScore       = Math.max(0, 1 - (history.avgWaitMs / 5000));
    const score = (history.successRate * 0.6) + (seatDemandRatio * 0.3) + (speedScore * 0.1);

    let recommendedReason = "";
    if (history.successRate > 0.88)   recommendedReason = "Very high tatkal success rate historically";
    else if (seatDemandRatio > 0.35)  recommendedReason = "Good seat-to-demand ratio";
    else if (history.successRate > 0.75) recommendedReason = "Moderate success rate — book early";
    else                              recommendedReason = "Lower success rate — consider alternatives";

    return {
      ...train,
      successProbability: Math.round(score * 100),
      seatsInQuota: history.quotaSize,
      recommendedReason,
      score,
    };
  }).sort((a, b) => b.score - a.score);
}