function forceRadius() {
  let nodes,
      starts,
      ends,
      radii;

  let start = defaultFunc;
  let end = defaultFunc;
  let radius = defaultFunc;
  let direction = defaultFunc;
  
  if (typeof radius !== "function") radius = +radius;
  start = start == null ? 0 : start;
  end = end == null ? 0 : end;

  function force(alpha) {
    for (let i = 0, n = nodes.length; i < n; ++i) {
      let node = nodes[i],
          dir = [-1, 1].indexOf(direction()) != -1 ? direction() : Math.abs(starts[i] - ends[i]) <= Math.PI ? 1 : -1,
          cx = (Math.cos(starts[i] + (starts[i] - dir * ends[i] * (1 - alpha))) * radii[i] - node.x) * alpha,
          cy = (Math.sin(starts[i] + (starts[i] - dir * ends[i] * (1 - alpha))) * radii[i] - node.y) * alpha
      node.vx += cx;
      node.vy += cy;
    }
  }

  function defaultFunc(d) {
    return function() {
      return d;
    };
  }
  
  function initialize() {
    if (!nodes) return;
    let i, n = nodes.length;
    radii = new Array(n);
    starts = new Array(n);
    ends = new Array(n);
    for (i = 0; i < n; ++i) {
      radii[i] = +radius(nodes[i], i, nodes);
      starts[i] = +start(nodes[i], i, nodes);
      ends[i] = +end(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _, initialize();
  };

  force.direction = function(_) {
    return arguments.length ? (direction = typeof _ === "function" ? _ : defaultFunc(+_), initialize(), force) : direction;
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

