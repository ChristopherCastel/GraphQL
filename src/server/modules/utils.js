const prepare = function(o) {
  o._id = o._id.toString();
  return o;
};

exports.prepare = prepare;
