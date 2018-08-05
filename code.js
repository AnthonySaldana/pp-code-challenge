// Program Control Paramters
const generations = 20;

let OGgrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,1,0,0,0,0,0,0],
  [0,0,0,0,2,0,0,0,0,0],
  [0,0,0,1,2,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,2,1,0,0,0,0,0,0,0],
  [0,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

document.getElementById('initial-state').innerHTML = "<p style='width: 200px;'>" + JSON.stringify(OGgrid) + "</p>";

let emptyGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

const neighborCount = function(grid, row, cell) {
  let neighbors = 0;
  let adultCount = 0;
  const preRow = row - 1;
  const postRow = row + 1;

  const preCell = cell - 1;
  const postCell = cell + 1;
  if( grid[preRow] ){
    if( grid[preRow][preCell] > 0 && preCell > 0 ){ neighbors++; if( grid[preRow][preCell] == 2 ){ adultCount++; }}
    if( grid[preRow][cell] > 0 ){ neighbors++; if( grid[preRow][cell] == 2 ){ adultCount++ } }
    if( grid[preRow][postCell] > 0 && postCell <= grid[row].length ){ neighbors++; if( grid[preRow][postCell] == 2){ adultCount++; } }
  }
  if( grid[postRow] ){
    if( grid[postRow][preCell] > 0 && preCell > 0 ){ neighbors++; if( grid[postRow][preCell] == 2){ adultCount++; } }
    if( grid[postRow][cell] > 0 ){ neighbors++; if( grid[postRow][cell] == 2 ){ adultCount++; } }
    if( grid[postRow][postCell] > 0 && postCell <= grid[row].length ){ neighbors++; if( grid[postRow][postCell] == 2){ adultCount++; } }
  }
  if( grid[row][preCell] > 0 && preCell > 0 ){ neighbors++; if( grid[row][preCell] == 2 ) { adultCount++; } }
  if( grid[row][postCell] > 0 && postCell <= grid[row].length ){ neighbors++; if( grid[row][postCell] == 2){ adultCount++; } }
  return {
    count: neighbors,
    adults: adultCount
  };
}

const iterator = function( grid, nextGrid, generation ){
  for( let row = 0; row < grid.length; row++ ){
    for( let cell = 0; cell < grid[row].length; cell++ ){
      let ncount = neighborCount(grid, row, cell);
      let value = grid[row][cell];
      // Empty Cell Rules
      // 1. has Exactly 2 adult neighbors - replace with one : reproduction
      // 2. Otherwise - nothing : No Change
      if( value == 0 && ncount.adults == 2 ){
        nextGrid[row][cell] = 1;
      }

      // Newborn (1) cell rules
      // 1. >= 5 neighbors - replace with 0 : overcrowding
      // 2. <= 1 neighbors - replace with 0 : isolation
      // 3. otherwise - replace cell with 2 : growing up
      if( value == 1 ){
        if(ncount.count >= 5 || ncount.count <= 1){
          nextGrid[row][cell] = 0;
        }else{
          nextGrid[row][cell] = 2;
        }
      }

      // Adult (2) cell rules
      // 1. >= 3 total neighbors - replace with 0 : overcrowding
      // 2. 0 neighbors - replace with 0 : isolation
      // 3. otherwise - replace with 3 : growing up
      if( value == 2 ){
        if( ncount.count >= 3 || ncount.count < 1 ){
          nextGrid[row][cell] = 0;
        }else{
          nextGrid[row][cell] = 3;
        }
      }

      // Elder (3) cell rules
      // 1. replace with 0 : natural causes
      if( value == 3 ){
        nextGrid[row][cell] = 0;
      }
    }
  }
  document.getElementById('final-state').innerHTML += "<p><b>Generation #"+ generation +"</b></p><p style='width: 200px;'>" + JSON.stringify(nextGrid) + "</p>";
  if( generation >= generations ){
    return true;
  }else{
    let reEmptyGrid = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];
    return iterator(nextGrid, reEmptyGrid, generation + 1);
  }
}

iterator(OGgrid, emptyGrid, 1);
