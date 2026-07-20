export const airports = [
  { code: "DEL", name: "Indira Gandhi International", city: "New Delhi", state: "Delhi" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", state: "Maharashtra" },
  { code: "BLR", name: "Kempegowda International", city: "Bangalore", state: "Karnataka" },
  { code: "MAA", name: "Chennai International", city: "Chennai", state: "Tamil Nadu" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International", city: "Kolkata", state: "West Bengal" },
  { code: "HYD", name: "Rajiv Gandhi International", city: "Hyderabad", state: "Telangana" },
  { code: "COK", name: "Cochin International", city: "Kochi", state: "Kerala" },
  { code: "PNQ", name: "Pune Airport", city: "Pune", state: "Maharashtra" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International", city: "Ahmedabad", state: "Gujarat" },
  { code: "GOI", name: "Goa International", city: "Goa", state: "Goa" },
  { code: "JAI", name: "Jaipur International", city: "Jaipur", state: "Rajasthan" },
  { code: "LKO", name: "Chaudhary Charan Singh International", city: "Lucknow", state: "Uttar Pradesh" },
  { code: "PAT", name: "Jay Prakash Narayan Airport", city: "Patna", state: "Bihar" },
  { code: "BBI", name: "Biju Patnaik International", city: "Bhubaneswar", state: "Odisha" },
  { code: "IXC", name: "Chandigarh Airport", city: "Chandigarh", state: "Punjab" },
  { code: "ATQ", name: "Sri Guru Ram Dass Jee International", city: "Amritsar", state: "Punjab" },
  { code: "SXR", name: "Sheikh ul-Alam International", city: "Srinagar", state: "J&K" },
  { code: "IXB", name: "Bagdogra Airport", city: "Siliguri", state: "West Bengal" },
  { code: "VNS", name: "Lal Bahadur Shastri International", city: "Varanasi", state: "Uttar Pradesh" },
  { code: "NAG", name: "Dr. Babasaheb Ambedkar International", city: "Nagpur", state: "Maharashtra" },
];

export function searchAirports(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return airports.filter(
    (a) =>
      a.city.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, 6);
}