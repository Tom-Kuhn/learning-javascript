(function() {

  function sudokuController($scope, SudokuPuzzleService, RandomNumberService) {
    
    $scope.board =  null; // Stores the values entered by the user    
    $scope.markings = null; // Stores up any markup entered by the user
    $scope.puzzle = null; // Stores the initial puzzle state
    $scope.solution = null; // Stores the complete solution to the puzzle

    $scope.hoverColumn = -1;
    $scope.selectedCell = null;
    $scope.MarkupCells = false;
    $scope.completed = false;
    $scope.completionTimeMinutes = 0;
    $scope.startTime = new Date();

    /*
     * Initialises the board variables to be empty
     */
    $scope.init = function(){
      // Stores the values entered by the user
      $scope.board = [
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ]
      ];

      // Stores up any markup entered by the user
      $scope.markings = [
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ]
      ];

      $scope.puzzle = [
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ]
      ];

      $scope.solution = [
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ]
      ];

      $scope.completed = false;
      $scope.startTime = new Date();
    };

    /*
     * Creates a new game based on the selected difficulty (or a
     *  random difficulty if none was selected).
     */
    $scope.RandomNewGame = function(difficulty){
      $scope.init();

      // Generate a random difficulty level if none was selected
      var rand = RandomNumberService.GetRandomInt(0,3);
      var randDifficulty =  SudokuPuzzleService.DifficultyLevel.EASY;      
      switch(rand){
      case 0:
        randDifficulty = SudokuPuzzleService.DifficultyLevel.HARD;
        break;
      case 1:
        randDifficulty = SudokuPuzzleService.DifficultyLevel.MEDIUM;
        break;
      default:
        randDifficulty = SudokuPuzzleService.DifficultyLevel.EASY;
        break;
      }

      $scope.puzzleDifficulty = difficulty || randDifficulty;      

      $scope.solution = SudokuPuzzleService.NewGame( -1 );

      $scope.puzzle = SudokuPuzzleService.GeneratePuzzle( $scope.solution, -1, $scope.puzzleDifficulty );
    };

    /*
     * Toggles the ability to edit the puzzle's markup
     */
    $scope.ToggleCellMarkup = function () {
      $scope.MarkupCells = !$scope.MarkupCells;
    };

    /*
     * Function to get a board value based on user input and the puzzle
     */
    $scope.getBoardValue = function (x, y) {
      // Show the puzzle value
      var result = $scope.puzzle[x][y];

      // If no puzzle value, show any entries by the user
      if (!result) {
        result = $scope.board[x][y];
      };

      // If no entries by the user, show any user markings
      if (!result) {

        if ($scope.markings[x][y] == null) {
          return '';
        };

        result = $scope.markings[x][y].sort().join(' ');
      };

      return result;
    };

    /*
     * Checks the game for a completed state and sets the 'Completed'
    * flag if true.
     */
    $scope.CheckBoardForCompletion = function(){
      for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
          if(!$scope.getBoardValue(i,j)){
            return;
          }
        };
      };
      
      $scope.completed = true;
      
      var completionTime = new Date();
      var milliseconds = (completionTime - $scope.startTime);
      var seconds = milliseconds / 1000;

      // Get completion time to nearest 1 decimal place
       $scope.completionTimeMinutes = Math.round(seconds / 6) / 10;
    };

    /*
     * Add a hint to the board
     */
    $scope.AddHint = function(){
      var availableHints = [];

      for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
          if($scope.getBoardValue(i,j) == ""){
            availableHints.push({x: i, y: j});
          }
        };
      };

      if(availableHints.length > 0){
        var rand = RandomNumberService.GetRandomInt(0, availableHints.length - 1);
        var hint = availableHints[rand];

        $scope.board[hint.x][hint.y] = $scope.solution[hint.x][hint.y];

        $scope.CheckBoardForCompletion();
      };        
    };

    /*
     * Function to get a range of numbers for angular
     */
    $scope.range = function (x) {
      if (x < 0) {
        return new Array(0);
      };

      return new Array(x);
    };
 
    /*
     * Sets the Selected Cell value on the board
     */
    $scope.SetSelectedCellValue = function (value) {
      if ($scope.selectedCell == null) {
        // No cell has been selected
        return;
      };

      var x = $scope.selectedCell[0];
      var y = $scope.selectedCell[1];

      if ($scope.MarkupCells) {
        // If we don't have any markings for the cell OR, are clearing the cell of markings
        if ($scope.markings[x][y] == null || value == null) {
          $scope.markings[x][y] = [value];
          return;
        }

        // If have the value in the markings, remove it                
        var index = $.inArray(value, $scope.markings[x][y]);
        if (index > -1) {
          $scope.markings[x][y].splice(index, 1);
          return;
        }

        // Add the markup to the cells
        $scope.markings[x][y].push(value);
        return;
      };

      $scope.board[x][y] = value;

      // If the board has been filled ...
      $scope.CheckBoardForCompletion();
    };

    /*
     * Handles keyboard input to enter values on the board
     */
    $scope.handleKeyboardEntry = function ($event) {
      var value = $event.keyCode;
      
      if(value == 0){
        // Handle firefox input
        value = $event.charCode;
      };

      // If a number has been pressed
      if (value > 48 && value < 58) {
        $scope.SetSelectedCellValue(value - 48);
      };
    };

    /*
     * Handles the request to toggle on/off the board markup
     */ 
    $scope.handleKeyboardKeyDown = function ($event) {
      var value = $event.keyCode;
      
      if(value == 0){
        // Handle firefox input
        value = $event.charCode;
      };

      // If Control has been pressed to toggle markup
      if (value == 17) {
        $scope.ToggleCellMarkup();
        return;
      };

      // If the cell should be deleted
      if (value == 46 || value == 8) {
        $scope.SetSelectedCellValue(null);

        // Stop the page from navigating backwards
        if (value == 8) {
          $event.preventDefault();
        };
      };
    };

    /*
     * Determine whether a board position was part of the original puzzle
     */
    $scope.isPuzzleNumber = function (x, y) {
      return !($scope.puzzle[x][y] == null);
    };

    /*
     * Determine whether a board position was part of the original puzzle
     */
    $scope.isMarkingNumber = function (x, y) {
      return !$scope.isPuzzleNumber(x, y) && !$scope.board[x][y] && $scope.markings[x][y];
    };

    /*
     * Sets the HoverColumn field
     */
    $scope.setHoverColumn = function (x) {
      $scope.hoverColumn = x;
    };

    /*
     * Sets the Selected Cell field
     */
    $scope.setSelectedCell = function (x, y) {
      if ($scope.isPuzzleNumber(x, y)) {
        // Can't select a puzzle number cell
        return;
      };

      $scope.selectedCell = [x, y];
    };

    /*
     * Determines if the cell at co-ordinates (x,y) has been selected by the user
     */
    $scope.isCellSelected = function (x, y) {
      if ($scope.selectedCell == null) {
        // No cell has been selected
        return false;
      };

      if ($scope.selectedCell[0] == x && $scope.selectedCell[1] == y) {
        // The cell is selected!
        return true;
      }

      return false;
    };

    /*
     * Determines if the specified column should be in the hover state
     */
    $scope.isColumnSelected = function (colIndex) {
      return $scope.hoverColumn == colIndex;
    };

    /*
     * Function to determine if a sudoku cell should be shaded
     */
    $scope.isCellShaded = function (x, y) {
      // only the center square should be filled in
      if ($scope.isInCenterBlock(x)) {
        // if both x & y are in the center 1/3 of the board
        return $scope.isInCenterBlock(y);
      }
      else {
        // only the first and last 1/3 should be shaded
        return !$scope.isInCenterBlock(y);
      }

      return false;
    };

    /*
     * Function to determine if co-ordinate is in the center 1/3 of the sudoku line
     */
    $scope.isInCenterBlock = function (x) {
      if (x > 2 && x < 6) {
        // If the number is in cell 3, 4, or 5 (zero based)
        return true;
      }
      return false;
    };

    // Call this to initialize a new game
    RandomNumberService.SetSeed(1);
    $scope.RandomNewGame();
  }

  /*
   * A service that is responsible for generating Sudoku puzzles and solutions
   */
  function sudokuPuzzleService(RandomNumberService){
    // Enum defining the difficulty levels available
    this.DifficultyLevel = {
      EASY: "Easy",
      MEDIUM: "Medium",
      HARD: "Hard"
    };

    /*
     * Gets a valid swap target index based on the source index. I.e.
     * If swapping column 1, then the only other valid columns to swap
     * with are 0 and 2. If any other columns are selected, then this
     * would produce an invalid Sudoku board.
     */
    function getValidPuzzleTargetSwapIndex (puzzleSourceIndex){
      // Gets the index of the source within the 3x9 block
      // e.g. if col 8 is the source, then the index in the 3rd block
      // would be 2
      var puzzleBlockIndex = puzzleSourceIndex % 3; 
      var result = puzzleBlockIndex;

      // Generate a target index that is different from the source index
      while(result == puzzleBlockIndex)
      {
        result = RandomNumberService.GetRandomInt(0,2);
      }

      // Convert the target index back into the puzzle index
      result = (puzzleSourceIndex - puzzleBlockIndex) + result;
      return result;
    };

    /*
     * Swaps two 3x9 columnm or row blocks within the Sudoku puzzle
     */
    function swapBlock(puzzle, isColumn){
      
      var sourceBlock = RandomNumberService.GetRandomInt(0,2);
      var targetBlock = getValidPuzzleTargetSwapIndex(sourceBlock);

      if(isColumn){
        swapColumn(puzzle, (sourceBlock * 3),  (targetBlock * 3));
        swapColumn(puzzle, (sourceBlock * 3) + 1,  (targetBlock * 3) + 1);
        swapColumn(puzzle, (sourceBlock * 3) + 2,  (targetBlock * 3) + 2);
      }
      else{
        swapRow(puzzle, (sourceBlock * 3),  (targetBlock * 3));
        swapRow(puzzle, (sourceBlock * 3) + 1,  (targetBlock * 3) + 1);
        swapRow(puzzle, (sourceBlock * 3) + 2,  (targetBlock * 3) + 2);
      }
    };

    /*
     * Swaps two rows within the Sudoku puzzle
     */
    function swapRow(puzzle){
      var sourceIndex = RandomNumberService.GetRandomInt(0,8);
      var targetIndex = getValidPuzzleTargetSwapIndex(sourceIndex);

      var temp = puzzle[sourceIndex]; // Store the source row temporarily
      puzzle[sourceIndex] = puzzle[targetIndex];
      puzzle[targetIndex] = temp;
      
    };

    /*
     * Swaps two columns within the Sudoku puzzle
     */
    function swapColumn(puzzle){
      var sourceIndex = RandomNumberService.GetRandomInt(0,8);
      var targetIndex = getValidPuzzleTargetSwapIndex(sourceIndex);

      for(var j = 0; j < 9; j++){
        var buffer = puzzle[j][sourceIndex]; // Store the source col temporarily
        puzzle[j][sourceIndex] = puzzle[j][targetIndex];
        puzzle[j][targetIndex] = buffer;
      };
    };

    /*
     * Greates a new Sudoku solution for the page
     */
    this.NewGame = function(seed){
      if(seed < 1){
        seed = Math.floor(RandomNumberService.Random(true) * (65535 - 1)) + 1;
      };

      RandomNumberService.SetSeed(seed);

      // An initial valid 'default' sudoku puzzle
      result = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 1, 4, 3, 6, 5, 8, 9, 7],
        [3, 6, 5, 8, 9, 7, 2, 1, 4],
        [8, 9, 7, 2, 1, 4, 3, 6, 5],
        [5, 3, 1, 6, 4, 2, 9, 7, 8],
        [6, 4, 2, 9, 7, 8, 5, 3, 1],
        [9, 7, 8, 5, 3, 1, 6, 4, 2]
      ];
      
      var maxGenerations = RandomNumberService.GetRandomInt(400,800);

      // Transform the puzzle for 'n' number of generations
      for(var i = 0; i < maxGenerations; i++){
        var transformOption = RandomNumberService.GetRandomInt(0,4);

        // Apply the transform to the result. Each transform results
        // in a valid sudoku board
        switch(transformOption){
        case 0 :
          swapRow(result);          
          break;
        case 1 :
          swapColumn(result);          
          break;
        case 2:
          swapBlock(result, true);
          break;
        case 3:
          swapBlock(result, false);
          break;
        };
      };

      return result;
    };

    /*
     * Takes the initial Sudoku puzzle and removes a random quantity
     * of numbers in order to produce a valid puzzle. This may reesult
     * in a puzzle that is in fact impossible to solve.
     */
    this.GeneratePuzzle = function( solution, seed, puzzleDifficulty ){
      if(seed < 1){
        seed = Math.floor(RandomNumberService.Random(true) * (65535 - 1)) + 1;
      };

      RandomNumberService.SetSeed(seed);

      // Set the solution retention rate based on the difficulty selected
      var percentageOfNumbersToKeep = 45;
      if(puzzleDifficulty == this.DifficultyLevel.MEDIUM){
        percentageOfNumbersToKeep = 35;
      }
      if(puzzleDifficulty == this.DifficultyLevel.HARD){
        percentageOfNumbersToKeep = 25;
      }

      var result = [
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ],
        [, , , , , , , , ]
      ];

      // Selectivly copy values from the solution to the puzzle based
      // on the percentage of numbers to keep.
      for(var i = 0; i < 9 ; i++){
        for(var j = 0; j < 9; j++){
          var rand = RandomNumberService.GetRandomInt(1,100);
          
          if(rand <= percentageOfNumbersToKeep){
            result[i][j] = solution[i][j];
          };
        };
      };

      return result;
    };
  };

  learningJavascriptApp.service('SudokuPuzzleService', ['RandomNumberService', sudokuPuzzleService]);
  learningJavascriptApp.controller('SudokuCtrl', [ '$scope', 'SudokuPuzzleService', 'RandomNumberService',  sudokuController]);
 })();


