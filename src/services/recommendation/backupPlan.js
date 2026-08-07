import { getRecommendedTrains } from "./trainRecommendation";

/**
 * Generate backup plan when primary booking fails.
 * TODO: replace with -> POST /api/recommend/backup-plan
 */
export async function generateBackupPlan({ failedTrainNo, trains, route, date, failureReason }) {
  await new Promise(r => setTimeout(r, 400));

  const ranked     = await getRecommendedTrains({ trains });
  const alternates = ranked.filter(t => t.number !== failedTrainNo);
  const nextBest   = alternates[0];

  const plans = [];

  // Plan A — next best train on same route
  if (nextBest) {
    plans.push({
      priority: 1,
      type:     "ALTERNATE_TRAIN",
      label:    "Next Best Train",
      desc:     `${nextBest.name} — ${nextBest.successProbability}% success probability`,
      action:   `Book ${nextBest.name}`,
      train:    nextBest,
      badge:    "Best Option",
      badgeColor: "green",
    });
  }

  // Plan B — waitlist on same train
  plans.push({
    priority: 2,
    type:     "WAITLIST",
    label:    "Join Waitlist",
    desc:     `Waitlist on original train — auto-upgrades to confirmed if cancellations occur`,
    action:   "Join Waitlist",
    badge:    "Low Risk",
    badgeColor: "blue",
  });

  // Plan C — nearby date
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("en-GB");

  plans.push({
    priority: 3,
    type:     "NEXT_DAY",
    label:    "Travel Next Day",
    desc:     `Same route on ${tomorrowStr} — typically higher availability`,
    action:   `Search ${tomorrowStr}`,
    badge:    "High Availability",
    badgeColor: "orange",
  });

  return {
    failureReason,
    route,
    plans,
  };
}