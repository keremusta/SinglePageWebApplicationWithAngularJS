(function () {
  'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService)

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {

      var toBuyList = this;

      toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

      toBuyList.removeItem = function(itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex);
      };



    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var alreadyBoughtList = this;
      alreadyBoughtList.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();

    }


    function ShoppingListCheckOffService() {
      var service = this;

      //List of the items to Buy
      var toBuyItems = [{name :  'Soda', quantity : '5 Bottles'},
                    {name : 'Cookies',quantity:'3 Bags'},
                    {name : 'Chocolates',quantity :'2 Pacs'},
                    {name : 'Milk',quantity:'1 Bottle'},
                    {name : 'Coffee',quantity:'100 Packs'}
                  ];

      //List for items already bought
      var alreadyBoughtItems=[];

      service.getToBuyItems = function () {
        return toBuyItems;
      }
      //this also add removed item to alreadyBoughtList
      service.removeItem = function(itemIndex) {
        alreadyBoughtItems.push(toBuyItems[itemIndex]);
        toBuyItems.splice(itemIndex,1);
      }


      //to get already bought list
      service.getAlreadyBoughtItems = function () {
        return alreadyBoughtItems;
      }

    }
})();
