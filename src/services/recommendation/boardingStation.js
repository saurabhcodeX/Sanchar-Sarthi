import { stationAlternatives } from "./mockData";

/**
 * Recommend best boarding station for a city.
 * TODO: replace with -> GET /api/recommend/boarding-stations?trainNo=X&originCity=Y
 */
export async function getBoardingStationRecommendations(originCity) {
  await new Promise(r => setTimeout(r, 200));

  const cityKey = Object.keys(stationAlternatives).find(
    k => originCity.toLowerCase().includes(k.toLowerCase())
  );

  if (!cityKey) return null;

  const stations = stationAlternatives[cityKey];
  const sorted   = [...stations].sort((a, b) => b.tatkalFillRate - a.tatkalFillRate);
  const best     = sorted[0];
  const primary  = stations[0];

  return sorted.map(s => ({
    ...s,
    isBest:     s.code === best.code,
    isPrimary:  s.code === primary.code,
    successChance: Math.round(s.tatkalFillRate * 100),
    tradeOff: s.distanceKm === 0
      ? "Your nearest station"
      : s.tatkalFillRate > primary.tatkalFillRate
        ? `${s.distanceKm} km further — ${Math.round((s.tatkalFillRate / primary.tatkalFillRate - 1) * 100)}% better odds`
        : `${s.distanceKm} km further — lower success rate`,
  }));
}