export const fetchData = async (endpoint, setState = null, name = null) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "https://happylearning.onrender.com";
    let url = `${API_URL}/${endpoint}`;

    // If name is provided, fetch single item
    if (name) {
      if(endpoint === 'country') {
        url = `${API_URL}/getCountry?name=${encodeURIComponent(name)}`;
      } else {
        url = `${API_URL}/${endpoint}?name=${encodeURIComponent(name)}`;
      }
    }

    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, body: ${errorText}`);
    }

    const data = await res.json();

    if (setState) setState(data); // update state only if provided
    return data;                  // always return data
  } catch (err) {
  console.error("API Fetch Error:", err);
  if (setState) setState([]); // Set to empty array so .map() doesn't crash
  return []; 
}
};
