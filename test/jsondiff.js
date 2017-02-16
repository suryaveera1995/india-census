// Compare objects in JSON
module.exports = (function() {
  return {
    compareJSONObjects: function(expectedJSON, actualJSON) {
      if (!expectedJSON || !actualJSON) {
        return;
      }

      function objValues(obj) {
        let keys = Object.keys(obj);
        let values = [];
        keys.forEach(function(keyName) {
          let val = obj[keyName];
          values.push(val);
        });

        return values;
      }

      function toObjValueHash(obj) {
        // return Object.values(obj).sort().join(';');
        return objValues(obj).sort().join(';');
      }

      function toDataMap(data) {
        return data.map(toObjValueHash);
      }

      let expectedDataSet = new Set(toDataMap(expectedJSON));
      let actualJSONObjs = actualJSON;

      let diffs = [];
      let matched = [];

      actualJSONObjs.forEach(function(obj) {
        let actual = toObjValueHash(obj);

        if (expectedDataSet.has(actual)) {
          matched.push(obj);
        } else {
          diffs.push(obj);
        }
      });

      if (diffs.length > 0) {
        // console.log("Differs by ", diffs.length);
        // console.log("Differences: ", diffs);
        return {
          diffs: diffs.length,
          diffObjs: diffs
        };
      }
      // console.log("Data is Same");
      return {
        diffs: diffs.length,
        diffObjs: []
      };
    },

    compareJSONStrings: function(expectedJSONStr, actualJSONStr) {
      if (!expectedJSONStr || !actualJSONStr) {
        return;
      }
      return compareJSONObjects(JSON.parse(expectedJSONStr), JSON.parse(actualJSONStr));
    }
  };
}());
