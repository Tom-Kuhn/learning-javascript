(function() {

  function sudokuController($scope, SudokuPuzzleService, RandomNumberService) {
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
      [4, , , , , , 8, , 5],
      [, 3, , , , , , , ],
      [, , , 7, , , , , ],
      [, 2, , , , , , 6, ],
      [, , , , 8, , 4, , ],
      [, , , , 1, , , , ], 
      [, , , 6, , 3, , 7, ],
      [5, , , 2, , , , , ],
      [1, , 4, , , , , , ]
    ];

    $scope.hoverColumn = -1;

    $scope.selectedCell = null;

    $scope.MarkupCells = false;

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

    };

    $scope.NewGame = function(){
      $scope.init();

      $scope.solution = SudokuPuzzleService.NewGame( -1 );

      $scope.puzzle = SudokuPuzzleService.GeneratePuzzle( $scope.solution, -1, $scope.puzzleDifficulty );
    };

    $scope.RandomNewGame = function(difficulty){

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

      $scope.NewGame();
    };

    $scope.ToggleCellMarkup = function () {
      $scope.MarkupCells = !$scope.MarkupCells;
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
    };

    /*
     * Handles keyboard input to enter values on the board
     */
    $scope.handleKeyboardEntry = function ($event) {
      // If a number has been pressed
      if ($event.keyCode > 48 && $event.keyCode < 58) {
        $scope.SetSelectedCellValue($event.keyCode - 48);
      };
    };

    /*
     * Handles the request to toggle on/off the board markup
     */
    $scope.handleKeyboardKeyDown = function ($event) {
      // If Control has been pressed to toggle markup
      if ($event.keyCode == 17) {
        $scope.ToggleCellMarkup();
        return;
      };


      // If the cell should be deleted
      if ($event.keyCode == 46 || $event.keyCode == 8) {
        $scope.SetSelectedCellValue(null);

        // Stop the page from navigating backwards
        if ($event.keyCode == 8) {
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

  function randomNumberService(){

    var m_w = 123456789;
    var m_z = 987654321;
    var mask = 0xffffffff;

    // Takes any integer
    this.SetSeed = function(i) {
      m_w = i;
    }

    // Returns number between 0 (inclusive) and 1.0 (exclusive),
    // just like Math.random().
    this.Random = function(useMathRandom)
    {
      useMathRandom = useMathRandom || false;

      if(useMathRandom){
        return Math.random();
      };

      m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
      var result = ((m_z << 16) + m_w) & mask;
      result /= 4294967296;
      return result + 0.5;
    }

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    this.GetRandomInt = function(min, max) {
      return Math.floor(this.Random() * (max - min)) + min;
    }  
  };

  function sudokuPuzzleService(RandomNumberService){
    this.DifficultyLevel = {
      EASY: "Easy",
      MEDIUM: "Medium",
      HARD: "Hard"
    };

    function getValidPuzzleTargetSwapIndex (puzzleSourceIndex){
      var puzzleBlockIndex = puzzleSourceIndex % 3;
      var result = puzzleBlockIndex;

      while(result == puzzleBlockIndex)
      {
        result = RandomNumberService.GetRandomInt(0,2);
      }

      result = (puzzleSourceIndex - puzzleBlockIndex) + result;
      return result;
    };

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

    function swapRow(puzzle){
      var sourceIndex = RandomNumberService.GetRandomInt(0,8);
      var targetIndex = getValidPuzzleTargetSwapIndex(sourceIndex);

      var temp = puzzle[sourceIndex];
      puzzle[sourceIndex] = puzzle[targetIndex];
      puzzle[targetIndex] = temp;
      
    };

    function swapColumn(puzzle){
      var sourceIndex = RandomNumberService.GetRandomInt(0,8);
      var targetIndex = getValidPuzzleTargetSwapIndex(sourceIndex);

      for(var j = 0; j < 9; j++){
        var buffer = puzzle[j][sourceIndex];
        puzzle[j][sourceIndex] = puzzle[j][targetIndex];
        puzzle[j][targetIndex] = buffer;
      };
    };

    this.NewGame = function(seed){
      if(seed < 1){
        seed = Math.floor(RandomNumberService.Random(true) * (65535 - 1)) + 1;
      };

      RandomNumberService.SetSeed(seed);

      initialPuzzle = [
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
      
      var maxGenerations  = RandomNumberService.GetRandomInt(400,800);

      for(var i = 0; i < maxGenerations; i++){
        var transformOption = RandomNumberService.GetRandomInt(0,4);

        switch(transformOption){
        case 0 :
          swapRow(initialPuzzle);          
          break;
        case 1 :
          swapColumn(initialPuzzle);          
          break;
        case 2:
          swapBlock(initialPuzzle, true);
          break;
        case 3:
          swapBlock(initialPuzzle, false);
          break;
        };
      };

      return initialPuzzle;
    };

    this.GeneratePuzzle = function( solution, seed, puzzleDifficulty ){
      if(seed < 1){
        seed = Math.floor(RandomNumberService.Random(true) * (65535 - 1)) + 1;
      };

      RandomNumberService.SetSeed(seed);

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

  learningJavascriptApp.service('RandomNumberService', randomNumberService);
  learningJavascriptApp.service('SudokuPuzzleService', ['RandomNumberService', sudokuPuzzleService]);
  learningJavascriptApp.controller('SudokuCtrl', [ '$scope', 'SudokuPuzzleService', 'RandomNumberService',  sudokuController]);
 })();


