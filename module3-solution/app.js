(function(){
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  MenuSearchService.$inject = ['$http'];

  function NarrowItDownController ($scope, MenuSearchService) {
    var narrowItDown = this;
    narrowItDown.error = false;
    narrowItDown.loader = false;


    narrowItDown.removeMenuItem = function (index) {
      narrowItDown.found.splice(index, 1);
    };


    narrowItDown.showListMenu = function () {
      var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
      narrowItDown.loader = true;

      promise.then(function (response) {
        narrowItDown.found = response;
        narrowItDown.loader = false;
        if(narrowItDown.found.length < 1) {
          narrowItDown.error = true;
        } else {
          narrowItDown.error = false;
        }
      }).catch(function (error) {
        console.log('Error: ',error);
      })
    }
  }

  function MenuSearchService($http) {
    var service = this;


    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {

        var menu_items = result.data.menu_items;
        var foundItems = [];

        for(var i=0; i < menu_items.length; i++){
          if (menu_items[i].description.indexOf(searchTerm) > 0) {
            foundItems.push(menu_items[i]);
          }
        }

        // return processed items
        return foundItems;
      });
    };

  }


  // Declare and create foundItems directive.
  function FoundItems () {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      replace: true,
      scope: {
        foundItems: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

}());
