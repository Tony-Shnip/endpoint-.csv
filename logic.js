var showData = function (amenity, reservations) {
  let list = [];
  reservations.sort((a, b) => {
    return a ? (a[3] - b[3]) : b;
  })
  reservations.forEach((item, i) => {
    let HH = (parseInt(item[3]) > 600) ? Math.trunc(parseInt(item[3]) / 60) : ('0' + (Math.trunc(parseInt(item[3]) / 60)).toString());
    let MM = (parseInt(item[3]) % 60) > 10 ? parseInt(item[3]) % 60 : '0' + (parseInt(item[3]) % 60).toString();
    list[i] = [item[0], item[2], HH + ':' + MM, parseInt(item[4]) - parseInt(item[3]), amenity[1]];
  })
  return list;
}

module.exports.showData = showData;