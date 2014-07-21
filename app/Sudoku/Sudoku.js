(function () {

    function sudokuController($scope) {
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
    }

    learningJavascriptApp.controller('SudokuCtrl', sudokuController);
})();


