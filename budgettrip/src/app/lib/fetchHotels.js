"use server";

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = "booking-com15.p.rapidapi.com";

export const fetchHotelsFromAPI = async (city) => {
  if (!API_KEY) throw new Error("Missing API Key.");

  try {
    const locationUrl = `https://${API_HOST}/api/v1/hotels/searchDestination?query=${encodeURIComponent(
      city
    )}`;

    const locationRes = await fetch(locationUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    if (!locationRes.ok) throw new Error("Location fetch failed.");

    const locationData = await locationRes.json();
    const bestMatch = locationData.data?.find(
      (item) => item.search_type === "city"
    );

    if (!bestMatch) {
      console.warn("City not found.");
      return [];
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const checkinDate = tomorrow.toISOString().split("T")[0];
    const checkoutDate = dayAfter.toISOString().split("T")[0];

    const searchUrl = `https://${API_HOST}/api/v1/hotels/searchHotels?dest_id=${bestMatch.dest_id}&search_type=CITY&arrival_date=${checkinDate}&departure_date=${checkoutDate}&adults=1&children_age=0&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=PLN`;

    const searchRes = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    if (!searchRes.ok) throw new Error("Hotels fetch failed.");

    const searchData = await searchRes.json();
    const hotels = searchData.data?.hotels || [];

    return hotels.map((item) => {
      const prop = item.property;

      return {
        location_id: prop.id,
        name: prop.name,
        latitude: prop.latitude,
        longitude: prop.longitude,
        rating: prop.reviewScore || "N/A",
        num_reviews: prop.reviewCount || 0,
        price: prop.priceBreakdown?.grossPrice?.value
          ? `${Math.round(prop.priceBreakdown.grossPrice.value)} PLN`
          : "Check price",
        web_url: `https://www.booking.com/hotel/pl/${prop.name}.html`,
        address: prop.wishlistName || "See details",
        photo: {
          images: {
            large: {
              url:
                prop.photoUrls?.[0] ||
                "https://via.placeholder.com/300x200?text=No+Image",
            },
          },
        },
      };
    });
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Request failed.");
  }
};
