module.exports = (function() {
  let totalNoObjects = 0;
  let totalNoKeys = 0;

  // Traverse expected json
  function traverse(obj) {
    let prop;
    if (obj instanceof Array) {
      totalNoObjects = totalNoObjects + 1;
      obj.forEach(function (value) {
        if (typeof value === 'object' && value) {
          traverse(value);
        } else {
          totalNoKeys = totalNoKeys + 1;
        }
      });
    } else {
      totalNoObjects = totalNoObjects + 1;
      for (prop in obj) {
        if (typeof obj[prop] === 'object' && obj[prop]) {
          traverse(obj[prop]);
        } else {
          totalNoKeys = totalNoKeys + 1;
        }
      }
    }
    return {
      totalNoObjects: totalNoObjects,
      totalNoKeys: totalNoKeys
    };
  }

  return {
    traverse: traverse
  };
}());
