export const fetchData = async (endpoint, setState = null, name = null) => {
  try {
    let data;
    
    // Determine which file to load based on the endpoint
    switch (endpoint.toLowerCase()) {
      case 'country':
      case 'countries':
        const countriesModule = await import('../data/learningdb.countries.json');
        data = countriesModule.default || countriesModule;
        break;
      case 'constellation':
      case 'constellations':
        const constellationsModule = await import('../data/learningdb.constellations.json');
        data = constellationsModule.default || constellationsModule;
        break;
      case 'element':
      case 'elements':
        const elementsModule = await import('../data/learningdb.elements.json');
        data = elementsModule.default || elementsModule;
        break;
      case 'galaxy':
      case 'galaxies':
        const galaxiesModule = await import('../data/learningdb.galaxies.json');
        data = galaxiesModule.default || galaxiesModule;
        break;
      case 'wonder':
      case 'wonders':
        const wondersModule = await import('../data/learningdb.wonders.json');
        data = wondersModule.default || wondersModule;
        break;
      default:
        console.warn(`Unknown endpoint: ${endpoint}, returning empty array.`);
        data = [];
    }

    // Convert MongoDB _id.$oid to simple string _id if necessary
    if (Array.isArray(data)) {
      data = data.map(item => {
        if (item._id && item._id.$oid) {
          return { ...item, _id: item._id.$oid };
        }
        return item;
      });
    }

    // If name is provided, find that specific item
    if (name) {
      const singleItem = data.find(item => 
        item.name && item.name.toLowerCase() === name.toLowerCase()
      );
      if (setState) setState(singleItem || null);
      return singleItem || null;
    }

    if (setState) setState(data);
    return data;
  } catch (err) {
    console.error("Local Data Fetch Error:", err);
    if (setState) setState(name ? null : []);
    return name ? null : []; 
  }
};
