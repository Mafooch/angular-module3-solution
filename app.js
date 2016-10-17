(function() {

"use strict";

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");
// .directive("FoundItemsDirective", FoundItemsDirective);

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
  var search = this;

  search.searchTerm = "";

  search.showMatchedItems = function() {
    var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);

    promise.then(function (response) {
      search.found = response;
      if(response.length === 0) {
        search.nothingFound = true;
      } else {
        search.nothingFound = false;
      }
    });
  };
}


MenuSearchService.$inject = ["$http", "ApiBasePath"];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({method: "GET", url: (ApiBasePath + "/menu_items.json")}).then(function(result) {
      var menuItems = result.data.menu_items;
      var foundItems = [];
      for(var i = 0; i < menuItems.length; i++) {
        if(searchTerm.length === 0) {
          break;
        }
        var description = menuItems[i].description;
        if(description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(menuItems[i]);
        }
      }
      return foundItems;
    });
  };
}

function FoundItemsDirective() {
  // var ddo = {
  //   scope: {
  //     found: "<"
  //   }
  // };
  //
  // return ddo;
}

})();
