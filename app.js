(function() {
"use strict";

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.provider("MenuSearchService", MenuSearchService);


NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController() {

}

function MenuSearchService() {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http(..).then(function(result) {
      // process result and only keep items that match
      var foundItems = [];

      return foundItems;
    });
  };
}
