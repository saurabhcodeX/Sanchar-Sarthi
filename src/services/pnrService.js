export async function checkPNRStatus(pnr) {
  const response = await fetch(`/api/pnr-status?pnr=${pnr}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch PNR status.");
  }
  return data;
}