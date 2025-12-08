"use server";

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = "travel-advisor.p.rapidapi.com";

export const fetchAttractions = async (lat, long) => {
  if (!API_KEY) throw new Error("Missing API Key.");

  try {
    const url = `https://${API_HOST}/attractions/list-by-latlng?latitude=${lat}&longitude=${long}&lunit=km&currency=PLN&lang=pl_PL`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    if (!response.ok) throw new Error("Attractions fetch failed.");

    const data = await response.json();
    const attractions =
      data.data?.filter((item) => item.name && item.num_reviews) || [];

    return attractions.slice(0, 5).map((item) => ({
      name: item.name,
      rating: item.rating || "Brak",
      ranking: item.ranking || "",
      photo: item.photo?.images?.medium?.url || null,
      description: item.description || "Brak opisu",
      web_url: item.web_url,
    }));
  } catch (error) {
    console.error("TripAdvisor API Error:", error);
    return [];
  }
};
