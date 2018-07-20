const API = "https://api.foursquare.com/v2";
const CLIENT_ID = "FDH5MVKGIBXO1FQRMNUBENZ4H50KU1TD21FFIINDBP2VOC1T";
const CLIENT_SECRET = "THERCPZMOLRQEQO0BF50I3NXEMOTO1WTCXLLCKOOKDVLO1XR";

const convertObjectToUrlParam = params => {
  const urlParams = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    query: "lunch",
    near: params,
    limit: 3,
    v: 20180719
  };
  return Object.keys(urlParams)
    .map(i => encodeURIComponent(i) + "=" + encodeURIComponent(urlParams[i]))
    .join("&");
};

const getVenueRecommendations = params => {
  const urlParams = convertObjectToUrlParam(params);
  return fetch(`${API}/venues/explore?${urlParams}`)
    .then(response => response.json())
    .then(responseJSON => responseJSON);
};

const getVenueDetails = data => {
  const { meta, response } = data;
  let details = { error: null, data: null };
  if (
    meta.code === 200 &&
    response.groups &&
    response.groups[0].items &&
    response.groups[0].items.length === 3
  ) {
    const venues = response.groups[0].items.map(venue => {
      const info = {};
      info["name"] = venue.venue.name;
      info["url"] =
        (venue.venue.delivery && venue.venue.delivery.url) ||
        "https://en.wikipedia.org/wiki/HTTP_404";
      info["rating"] = (Math.random() * (9 - 5) + 5).toFixed(1);
      info["category"] =
        (venue.venue.categories && venue.venue.categories[0].name) ||
        "Not Available";
      info["voteCount"] = 0;
      info["isWinning"] = false;
      return info;
    });
    details.data = venues;
  } else {
    details.error = meta.error || "Some error";
  }
  return details;
};

export { getVenueRecommendations, getVenueDetails };
