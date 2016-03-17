/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/ 

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  //debugger;
  //instantiate board instance
  var board = new Board({n:n});
  var solution = undefined;
  
  //toggle a piece at row 0, col 0
  board.togglePiece(0,0);
  //loop through all the rows starting at row 1, 
  for (var i = 1; i < n; i++) {
    //for each element, check if there is a RookConflict
    for (var j = 0; j < board.get(i).length; j++) {
      //place piece on (row, column)
      board.togglePiece(i,j);
      //check if the current column has a conflict
      if (board.hasColConflictAt(j) || board.hasRowConflictAt(i)) {
        board.togglePiece(i,j);
      }
    }
  }
  //set the solution equal to the whole board array
  solution = board.rows();
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var board = new Board({n:n});
  
  var findSolution = function(row) {
    
    if ( row === n ) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row+1);
      }
      board.togglePiece(row, i);
    }
    
  }; 
  findSolution(0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  debugger;
  //instantiate board instance
  var board = new Board({n:n});
  var solution = board.rows();
  
  if(n === 0){
    return solution; 
  }
  //toggle a piece at row 0, col 0
  board.togglePiece(0,0);
  //loop through all the rows starting at row 1, 
  for (var i = 1; i < n; i++) {
    //for each element, check if there is a RookConflict
    for (var j = 0; j < board.get(i).length; j++) {
      //place piece on (row, column)
      board.togglePiece(i,j);
      //check if the current column has a conflict
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(i,j);
      }
    }
  }
  //set the solution equal to the whole board array
  solution = board.rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  
//   //debugger;
//  var wasFound = false;
//  var board = new Board({n:n});
//  var solutions = board.rows(); 

//  var findSolution = function(row){

//   if(wasFound){
//     return;
//   }

//   if(row === n){
//     wasFound = true;
//     solutions = board.rows();
//     return;
//   }

//   if(wasFound === false){
//     for(var i = 0; i < n; i++){
//       board.togglePiece(row, i);
//       if(!board.hasAnyQueensConflicts()) {
//         findSolution(row+1);
//       }
//       board.togglePiece(row, i);
//     }
//   }
// };
  
//   findSolution(0);
//   //return all of the board possibilities
//   return solutions;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0; 

  var findSolution = function(row){
    if(row === n){
      solutionCount++;
      return;
    }
    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()){
        findSolution(row+1);
      }
      board.togglePiece(row, i);
    }
  };
  
  findSolution(0);
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
