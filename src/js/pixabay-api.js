import axios from "axios";

const apiKey = "45020443-554fa7ec416e1f918b290a17c";
const url = `https://pixabay.com/api/`;

export async function fetchPixabayImages(value, page = 1) {
  const config = {
    params: {
      key: apiKey,
      q: value,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 20,
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Pixabay:", error);
    throw new Error(
      "Unable to fetch data from Pixabay at this time. Please try again later."
    );
  }
}
