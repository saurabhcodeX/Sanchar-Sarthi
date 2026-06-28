export async function checkLiveStatus(trainNo, startDay = 1) {
  const response = await fetch(`/api/live-train-status?trainNo=${trainNo}&startDay=${startDay}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch live train status.");
  }
  return data;
}