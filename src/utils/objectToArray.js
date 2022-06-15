const objectToArray = data => {
  let arr = [];
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      arr.push(data[k]);
    }
  }
  return arr;
};

export default objectToArray;
