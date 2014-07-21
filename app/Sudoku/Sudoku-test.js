/// <reference path="Sudoku.js" />
(function () {

    function sudokuTestController($scope, $controller, $injector) {

        QUnit.test("Does the range function work as expected?", function (assert) {
            var _targetScope = {};
            _target = $controller('SudokuCtrl', { $scope: _targetScope });

            assert.deepEqual(_targetScope.range(6), new Array(6), "Passed! range 6 equals new Array(6)");
            assert.deepEqual(_targetScope.range(0), new Array(0), "Passed! range 0 equals new Array(0)");
            assert.deepEqual(_targetScope.range(-1), new Array(0), "Passed! range -1 returns new Array(0)");
        });

        QUnit.test("Is the column in the hover state?", function (assert) {
            var _targetScope = {};
            _target = $controller('SudokuCtrl', { $scope: _targetScope });

            _targetScope.hoverColumn = 1;

            ok(!_targetScope.isColumnSelected(0), "Passed! Column 0 should not be highlighted");
            ok(_targetScope.isColumnSelected(1), "Passed! Column 1 should be highlighted");
            ok(!_targetScope.isColumnSelected(2), "Passed! Column 2 should not be highlighted");
            ok(!_targetScope.isColumnSelected(3), "Passed! Column 3 should not be highlighted");
            ok(!_targetScope.isColumnSelected(4), "Passed! Column 4 should not be highlighted");
            ok(!_targetScope.isColumnSelected(5), "Passed! Column 5 should not be highlighted");
            ok(!_targetScope.isColumnSelected(6), "Passed! Column 6 should not be highlighted");
            ok(!_targetScope.isColumnSelected(7), "Passed! Column 7 should not be highlighted");
            ok(!_targetScope.isColumnSelected(8), "Passed! Column 8 should not be highlighted");
        });

        QUnit.test("Is index in the center 1/3 of a row or column of the board?", function (assert) {
            var _targetScope = {};
            _target = $controller('SudokuCtrl', { $scope: _targetScope });

            ok(!_targetScope.isInCenterBlock(0), "Passed! 0 is not in the center block");
            ok(!_targetScope.isInCenterBlock(1), "Passed! 1 is not in the center block");
            ok(!_targetScope.isInCenterBlock(2), "Passed! 2 is not in the center block");
            ok(_targetScope.isInCenterBlock(3), "Passed! 3 is in the center block");
            ok(_targetScope.isInCenterBlock(4), "Passed! 4 is in the center block");
            ok(_targetScope.isInCenterBlock(5), "Passed! 5 is in the center block");
            ok(!_targetScope.isInCenterBlock(6), "Passed! 6 is not in the center block");
            ok(!_targetScope.isInCenterBlock(7), "Passed! 7 is not in the center block");
            ok(!_targetScope.isInCenterBlock(8), "Passed! 8 is not in the center block");
        });

        QUnit.test("Are the correct cells shaded on the board?", function (assert) {
            var _targetScope = {};
            _target = $controller('SudokuCtrl', { $scope: _targetScope });

            ok(_targetScope.isCellShaded(0, 0), "Passed! 0,0 is a shaded cell");
            ok(_targetScope.isCellShaded(0, 1), "Passed! 0,1 is a shaded cell");
            ok(_targetScope.isCellShaded(0, 2), "Passed! 0,2 is a shaded cell");
            ok(!_targetScope.isCellShaded(0, 3), "Passed! 0,3 is NOT a shaded cell");
            ok(!_targetScope.isCellShaded(0, 4), "Passed! 0,4 is NOT a shaded cell");
            ok(!_targetScope.isCellShaded(0, 5), "Passed! 0,5 is NOT a shaded cell");
            ok(_targetScope.isCellShaded(0, 6), "Passed! 0,6 is a shaded cell");
            ok(_targetScope.isCellShaded(0, 7), "Passed! 0,7 is a shaded cell");
            ok(_targetScope.isCellShaded(0, 8), "Passed! 0,8 is a shaded cell");


            ok(_targetScope.isCellShaded(3, 3), "Passed! 3,3 is a shaded cell");
            ok(_targetScope.isCellShaded(4, 4), "Passed! 4,4 is a shaded cell");
            ok(_targetScope.isCellShaded(5, 5), "Passed! 5,5 is a shaded cell");

            ok(!_targetScope.isCellShaded(3, 2), "Passed! 3,2 is NOT a shaded cell");
            ok(!_targetScope.isCellShaded(4, 8), "Passed! 4,8 is NOT a shaded cell");
            ok(!_targetScope.isCellShaded(6, 5), "Passed! 6,5 is NOT a shaded cell");
        });
        
    }

    learningJavascriptApp.controller('SudokuTestCtrl', sudokuTestController);
})();



