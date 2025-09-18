export const fetchData = async (endpoint, setState) => {
  try {
    const res = await fetch(`https://happylearning.onrender.com/${endpoint}`);
    if (!res.ok) { // Check if the response status is in the 200-299 range
      const errorText = await res.text(); // Get the response as text
      throw new Error(`HTTP error! status: ${res.status}, body: ${errorText}`);
    }
    const data = await res.json();
    setState(data);
  } catch (err) {
    console.error(err);
  }
  
};
