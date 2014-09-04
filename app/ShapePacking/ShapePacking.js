(function () {

    function ShapePackingController($scope, RandomNumberService) {
        $scope.run = false;

        $scope.canvas;

        $scope.start = function () {
            if (!$scope.canvas) {
                $scope.canvas = document.getElementById('shape-packing-canvas');
                $scope.canvas.width = $scope.canvas.parentElement.offsetWidth;
                $scope.canvas.height = $scope.canvas.parentElement.offsetHeight;
            }

            $scope.run = true;

            $scope.clearCanvas();

            for (var i = 0; i < 20; i++) {
                var x = RandomNumberService.GetRandomInt(0, $scope.canvas.width);
                var y = RandomNumberService.GetRandomInt(0, $scope.canvas.height);
                var radius = RandomNumberService.GetRandomInt(1, 100);

                $scope.drawCircle(x, y, radius, '#1c1d21', 0, '');
            };            
        };

        $scope.clearCanvas = function () {
            var context = $scope.canvas.getContext('2d');
            context.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height)
        };

        $scope.drawCircle = function ( x, y, radius, fillColor, strokeWidth, strokeColor) {
            var context = $scope.canvas.getContext('2d');

            context.beginPath();

            context.arc(x, y, radius, 0, 2 * Math.PI, false);

            context.fillStyle = fillColor;
            context.fill();

            if(strokeWidth > 0){
                context.lineWidth = strokeWidth;
                context.strokeStyle = strokeColor;
                context.stroke();
            }
        };
    }

    learningJavascriptApp.controller('ShapePackingCtrl', ['$scope', 'RandomNumberService', ShapePackingController]);
})();


