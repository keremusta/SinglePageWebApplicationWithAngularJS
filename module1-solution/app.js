(function () {
'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchController',LunchController);

  LunchController.$inject = ['$scope'];

  function LunchController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.color = "";

    $scope.check = function () {
      var newItems = $scope.items.split(",");
      var itemCount = 0;
      for(var i = 0; i < newItems.length; i++)
      {
        if(newItems[i] !== ""){
          itemCount++;
        }
      }
      if(itemCount === 0) {
        $scope.message = "Please enter the data first.";
        $scope.color = "red";
      }
      else if(itemCount <= 3) {
        $scope.message = "Enjoy!";
        $scope.color = "green";
      }
      else {
        $scope.message = "Too Much!";
        $scope.color = "green";
      }
    }

  }

})();
