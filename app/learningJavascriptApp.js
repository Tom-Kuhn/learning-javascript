var learningJavascriptApp = angular.module('learningJavascriptApp', ['ngRoute']);

learningJavascriptApp.config(function ($routeProvider) {
    $routeProvider

    // Home page routing
    .when('/', {
        templateUrl: 'app/Home/home.html',
        controller: 'HomeCtrl'
    })

    .when('/Sudoku', {
        templateUrl: 'app/Sudoku/sudoku.html',
        controller: 'SudokuCtrl',
        caseInsensitiveMatch: true
    })

    .when('/ShapePacking', {
        templateUrl: 'app/ShapePacking/ShapePacking.html',
        controller: 'ShapePackingCtrl',
        caseInsensitiveMatch: true
    })

    .when('/Sudoku/Test', {
        templateUrl: 'app/Sudoku/sudoku-test.html',
        controller: 'SudokuTestCtrl',
        caseInsensitiveMatch: true
    });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});