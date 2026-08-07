import { paymentMethodStats } from "./mockData";

/**
 * Recommend payment method based on remaining seat-lock TTL.
 * TODO: replace with -> GET /api/recommend/payment-method?lockTtlRemaining=X
 */
export async function getPaymentMethodRecommendation(lockTtlRemainingMs = 300000) {
  await new Promise(r => setTimeout(r, 100));

  const safetyMarginMs = 30000; // 30s buffer
  const usableTimeMs   = lockTtlRemainingMs - safetyMarginMs;

  const viable = paymentMethodStats
    .filter(p => p.avgCompletionMs < usableTimeMs)
    .sort((a, b) => b.successRate - a.successRate);

  if (!viable.length) {
    return { recommended: null, message: "Seat lock expired — please retry" };
  }

  const best = viable[0];

  return {
    recommended: best,
    all: paymentMethodStats.map(p => ({
      ...p,
      isRecommended: p.method === best.method,
      isViable:      p.avgCompletionMs < usableTimeMs,
      completionTime: `${Math.round(p.avgCompletionMs / 1000)}s avg`,
      reason: p.method === best.method
        ? `Recommended — ${Math.round(p.avgCompletionMs / 1000)}s avg, ${Math.round(p.successRate * 100)}% success`
        : p.avgCompletionMs >= usableTimeMs
          ? "Too slow for remaining lock time"
          : `${Math.round(p.avgCompletionMs / 1000)}s avg, ${Math.round(p.successRate * 100)}% success`,
    })),
  };
}