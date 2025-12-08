export const getSortedHotels = (hotels, sortBy) => {
  const hot = [...hotels];
  if (sortBy === "cena_rosnaco") {
    hot.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
  } else if (sortBy === "cena_malejaco") {
    hot.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
  } else if (sortBy === "ocena_malejaco") {
    hot.sort((a, b) => {
      return parseFloat(b.rating) - parseFloat(a.rating);
    });
  }
  return hot;
};
