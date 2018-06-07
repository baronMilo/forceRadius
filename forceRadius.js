function forceRadius(start, end, radius) {
  var nodes,
      starts,
      ends,
      radiuses;

  if (typeof radius !== "function") radius = +radius;
  start = start == null ? 0 : start;
  end = end == null ? 0 : end;

  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i],
          ext = d3.extent([starts[i], ends[i]]),
          mult = ext[1] - ext[0] <= Math.PI ? 1 : -1,
          cx = (Math.cos(starts[i] + mult * (starts[i] - ends[i] * (1 - alpha))) * radiuses[i] - node.x) * alpha,
          cy = (Math.sin(starts[i] + mult * (starts[i] - ends[i] * (1 - alpha))) * radiuses[i] - node.y) * alpha
      node.vx += cx;
      node.vy += cy;
    }
  }

  function defaultFunc(x) {
    return function() {
      return x;
    };
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    radiuses = new Array(n);
    starts = new Array(n);
    ends = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      starts[i] = +start(nodes[i], i, nodes);
      ends[i] = +end(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _, initialize();
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : defaultFunc(+_), initialize(), force) : radius;
  };

  force.start = function(_) {
    return arguments.length ? (start = typeof _ === "function" ? _ : defaultFunc(+_), initialize(), force) : start;
  };

  force.end = function(_) {
    return arguments.length ? (end = typeof _ === "function" ? _ : defaultFunc(+_), initialize(), force) : end;
  };

  return force;

}
