function solve(n) {
  var ans = [];
  solver([]);
  return ans;


  
  function solver(current) {
    if (current.length === n) ans.push(current);
    else
      for (var i = 0; i < n; i++) {
        for (var j = 0, l = current.length; j < l; j++) {
          var prev = current[j];
          if (prev === i) break;
          if (prev - (l - j) === i) break;
          if (prev + (l - j) === i) break;
        }
        if (j === l) solver(current.concat([i]));
      }
  }
}
