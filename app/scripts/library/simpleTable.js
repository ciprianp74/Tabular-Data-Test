(function(window, angular, undefined) {'use strict';

var simpleTable = angular.module('simple-table', []);

simpleTable.controller('simpleTableController', ['$scope', '$parse', '$filter', '$attrs', function SimpleTableController($scope, $parse, $filter, $attrs) {
    
    var collectionName = $attrs.simpleTable;
    var syncCollectionName = $attrs.syncCollection;
    var $get = $parse(collectionName);
    var $syncGet = $parse(syncCollectionName);
    var $set = $get.assign;
    
    $scope.tableData = $get($scope);
    var ctrl = this;

    $scope.tableParams = {
      sort: {},
      search: {}
    };

    
    $scope.$watch(function () {
      var sDt = $syncGet($scope);
      return sDt ? sDt.length: -1;
    }, function (newValue) {
      if (newValue !== -1 && newValue !== $scope.tableData.length) {
        $scope.tableData = $syncGet($scope);
        ctrl.clearFilters();
      }
    });
    
    /**
     * sort the rows
     * @param [field] - the field to sort by
     * @param [order] - sort order - asc(ending) or desc(ending)
     */
    this.sortBy = function sortBy(field, order) {
      if(field){
        $scope.tableParams.sort = {sortProperty: field, property: (order === 'desc' ? '-' : '+') + field};
      }
      return this.process();
    };

    /**
     * clear/reset filters
     */
    this.clearFilters = function clearFilters() {
      $scope.tableParams.sort = {property:''};
      $scope.tableParams.search = {};
      return this.process();
    };

    /**
     * reset/remove sorting
     */
    this.clearSort = function clearSort() {
      $scope.tableParams.sort = {property:''};
      return this.process();
    };

    /**
     * reset/remove search 
     */
    this.clearSearch = function clearSearch() {

      $scope.tableParams.search = {};
      return this.process();
    };

    /**
     * search matching rows - all properties/fields
     * @param {String} criteria - the search criteria
     */
    this.search = function search(criteria) {
      $scope.tableParams.search.searchExpression = {$: criteria};
      return this.process();
    };

    /**
     * process sorting and filtering
     */
    this.process = function process() {

      var filteredCol = $scope.tableParams.search.searchExpression ? $filter('filter')($scope.tableData, $scope.tableParams.search.searchExpression) : $scope.tableData;
      if ($scope.tableParams.sort.property) {
        filteredCol = $filter('orderBy')(filteredCol, $scope.tableParams.sort.property);
      }
      $set($scope, filteredCol);
    };
}]);

simpleTable.directive('simpleTable', function () {
    return {
      restrict: 'A',
      controller: 'simpleTableController'
    };
});

simpleTable.directive('sortable', function () {
    return {
      restrict: 'A',
      require: '^simpleTable',
      link: function (scope, element, attrs, ctrl) {
        var sortProperty = attrs.sortby;
        var stateIdx = -1;
        var states = ['asc', 'desc'];
        var stateClasses = ['row-sort-asc', 'row-sort-desc'];

        //view --> table state
        function sort() {
          stateIdx++;
          sortProperty = attrs.sortby;
          if (stateIdx > 1) {
            //reset sort state
            stateIdx = -1;
            ctrl.clearSort();
          } else {
            ctrl.sortBy(sortProperty, states[stateIdx]);
            element
              .removeClass(stateClasses[stateIdx-1])
              .addClass(stateClasses[stateIdx]);
          }
        }

        element.bind('click', function sortClick() {
          if (sortProperty) {
            scope.$apply(sort);
          }
        });

        //table state --> view
        scope.$watch(function () {
          return scope.tableParams.sort;
        }, function (newValue) {
          if (newValue.sortProperty !== sortProperty) {
            stateIdx = -1;
            element
              .removeClass(stateClasses[0])
              .removeClass(stateClasses[1]);
          }
        }, true);
      }
    };
});
simpleTable.directive('simpleSearch', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        require: '^simpleTable',
        link: function (scope, element, attrs, ctrl) {
            var exResult = null;
            var delay = 400;

            element.bind('input', function (evt) {
                evt = evt.originalEvent || evt;
                if (exResult !== null) {
                    $timeout.cancel(exResult);
                }
                exResult = $timeout(function () {
                  ctrl.search(evt.target.value);
                  exResult = null;
                }, delay);
            });
        }
    };
}]);
simpleTable.directive('clearSearch', function () {
    return {
        restrict: 'A',
        require: '^simpleTable',
        link: function (scope, element, attrs, ctrl) {
          
          function clearSearch(){
            ctrl.clearSearch();
          }

          element.bind('click', function clearSearchClick() {
            scope.$apply(clearSearch);
          });
        }
    };
});
simpleTable.directive('clearSort', function () {
    return {
        restrict: 'A',
        require: '^simpleTable',
        link: function (scope, element, attrs, ctrl) {
          
          function clearSort(){
            ctrl.clearSort();
          }
          
          element.bind('click', function clearSortClick() {
            scope.$apply(clearSort);
          });
        }
    };
});
simpleTable.directive('sortParam', function () {
    return {
      restrict: 'A',
      require: '^simpleTable',
      link: function (scope, element) {
        
        scope.$watch('tableParams.sort.property', function (newValue) {
          element.text(newValue);
        });
      }
    };
});
})(window, window.angular);