export const fetchData = async (endpoint, setState = null, name = null) => {
  try {
    let url = `https://happylearning.onrender.com/${endpoint}`;

    // If name is provided, fetch single item
    if (name) {
      if(endpoint === 'country') {
        url = `https://happylearning.onrender.com/getCountry?name=${encodeURIComponent(name)}`;
      } else {
        url = `https://happylearning.onrender.com/${endpoint}?name=${encodeURIComponent(name)}`;
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
    console.error(err);
    return null;
  }
};
