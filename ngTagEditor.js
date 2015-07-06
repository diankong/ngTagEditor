'use strict';

angular.module('ngTagEditor', [])
	.filter('getCol', function(){
		return function (items, row){
			return items && items.map(function (item){
					return item[row];
			}).join(',');
		}
	}).directive('focusMe', ['$timeout', '$parse', function($timeout, $parse){
		return{
			link: function(scope, element, attrs){
				var model = $parse(attrs.focusMe);
				scope.$watch(model, function(value){
					if(value === true){ 
						$timeout(function(){
							element[0].focus(); 
						});
					}
				});
				element.bind('blur', function(){
					scope.$apply(model.assign(scope, false));
				});
			}
		};
	}]).directive('tagEditor', function(){
		return{
			restrict: 'AE',
			/* require: 'ngModel',*/
			scope: {
				tags: '=ngModel'
			},
			replace: true,
			templateUrl: 'template/ngTagEditor.html',
			controller: ['$scope', '$attrs', '$element', '$http', '$filter', function($scope, $attrs, $element, $http, $filter){
				
				$scope.options = {};
				console.log("$attrs.readonly is: " + $attrs.readonly);
				if ($attrs.readonly === "true")
				{
				  $scope.options.readonly = true;
				}
				else
				  $scope.options.readonly = false;
				
				$scope.options.fetch = $attrs.fetch || '';
				$scope.options.placeholder = $attrs.placeholder || '';
				$scope.options.apiOnly = $attrs.apiOnly || false;
				$scope.search = '';
				
				console.log("typeof readonly : " + typeof $scope.options.readonly);
				$scope.tagClass = $scope.options.readonly?"readonly":"tag";
				console.log("tagClass is: " + $scope.tagClass);
			
				$scope.$watch('search', function(){
				  if ($scope.options.fetch && $scope.options.fetch.length>0){
  					$http.get($scope.options.fetch + $scope.search).success(function(data){
  						$scope.suggestions = data.data;
  						/* console.log(data); */
  					});
				  }

				});
				$scope.add = function(tag){
					$scope.tags.push(tag);
					$scope.search = '';
					$scope.$apply();
				};
				$scope.remove = function(index){
					$scope.tags.splice(index, 1);
				};
				
				console.log("$scope.options.readonly: " + $scope.options.readonly);
				if (!$scope.options.readonly)
				{
				  console.log("监听");
  				$element.find('input').on('keydown', function(e){
  					var keys = [8, 13, 32];
  					if(keys.indexOf(e.which) !== -1){
  						if(e.which == 8){ /* backspace */
  							if($scope.search.length === 0 && $scope.tags.length){
  								$scope.tags.pop();
  								e.preventDefault();
  							}
  						}
  						else if(e.which == 32 || e.which == 13){ /* space & enter */
  							if($scope.search.length && !$scope.apiOnly){
  								if(!$scope.apiOnly){
  									$scope.add($scope.search);
  									e.preventDefault();
  								}
  							}
  						}
  						$scope.$apply();
  					}
  				});
				}



				
			}]
		}
	});
