exports.paginateResults = (model, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const results = {};
  x``
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
  
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
  
    results.results = model.slice(startIndex, endIndex);
  
    return results;
  };
  