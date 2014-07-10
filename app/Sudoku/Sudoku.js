(function () {

    function sudokuController($scope) {
        $scope.board = [
        [, 999, , , , , , , ],
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

        /*
         * Function to get a range of numbers for angular
         */
        $scope.range = function (x) {
            return new Array(x);
        };

        /*
         * Function to get a board value based on user input and the puzzle
         */
        $scope.getBoardValue = function (x, y) {
            var result = $scope.puzzle[x][y];

            if (!result) {
                result = $scope.board[x][y];
            };

            return result;
        };

        /*
         * Determine whether a board position was part of the original puzzle
         */
        $scope.isPuzzleNumber = function (x, y) {
            return !($scope.puzzle[x][y] == null);
        };

        /*
         * Sets the HoverColumn field
         */
        $scope.setHoverColumn = function (x) {
            $scope.hoverColumn = x;
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
            // only the centre square should be filled in
            if (isInCenterBlock(x)) {
                // if both x & y are in the centre 1/3 of the board
                return isInCenterBlock(y);
            }
            else {
                // only the first and last 1/3 should be shaded
                return !isInCenterBlock(y);
            }

            return false;
        };

        /*
         * Function to determine if co-ordinate is in the center 1/3 of the sudoku line
         */
        var isInCenterBlock = function (x) {
            if (x > 2 && x < 6) {
                // If the number is in cell 3, 4, or 5 (zero based)
                return true;
            }
            return false;
        };
    }

    learningJavascriptApp.controller('SudokuCtrl', sudokuController);
})();


