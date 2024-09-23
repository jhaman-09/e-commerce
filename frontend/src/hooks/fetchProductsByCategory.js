import { endPoint } from "../helper/api";

const fetchProductsByCategory = async (category) => {
  const response = await fetch(endPoint.productsByCategory.url, {
    method: endPoint.productsByCategory.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category,
    }),
  });

  const jsonData = await response.json();
  return jsonData;
};

export default fetchProductsByCategory;
