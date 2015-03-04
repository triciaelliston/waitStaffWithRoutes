angular.module('WSWRApp', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider.when('/NewMeal', {
			templateUrl : './new-meal.html',
			controller : 'NewMealCtrl'
		}).when('/MyEarnings', {
			templateUrl : './my-earnings.html',
			controller : 'MyEarningsCtrl'
		}).when('/error', {
			template : '<p>Error Page Not Found</p'
		//}).otherwise( {
		//	redirectTo : '/error'
		});
	})
	.run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function() {
			$location.path('/error');
		});

	})
	.controller('NewMealCtrl', function($scope, $rootScope) {
		
		$scope.base_meal_price;
		$scope.tax_rate;
		$scope.tip_percentage;
		$scope.cust_sub_total = 0;
		$scope.cust_tip = 0;
		$scope.cust_total = 0;
		$scope.tip_total = 0;
		$scope.meal_count = 0;
		$scope.avg_tip = 0;
		$scope.show_error = false;

		$scope.submit = function() {
			$scope.show_error = true;
			if ($scope.mealForm.$valid) {
				$scope.cust_sub_total = $scope.base_meal_price + ($scope.base_meal_price * $scope.tax_rate/100);
				$scope.cust_tip = $scope.base_meal_price * $scope.tip_percentage/100;
				$scope.cust_total = $scope.cust_sub_total + $scope.cust_tip;
				$scope.tip_total = $scope.tip_total + $scope.cust_tip;
				$scope.meal_count++;
				$scope.avg_tip = $scope.tip_total/$scope.meal_count;
				$scope.cancel();
				$scope.displayEarnings();
			};
		};

		$scope.cancel = function() {
			delete $scope.base_meal_price;
			delete $scope.tax_rate;
			delete $scope.tip_percentage;
			$scope.show_error = false;
		};

		$scope.displayEarnings = function() {
			$rootScope.$broadcast('displayData', $scope.tip_total, $scope.avg_tip, $scope.meal_count )
		};
	})

	.controller('MyEarningsCtrl', function($scope) {
		$scope.$on('displayData', function(event, tip_total, avg_tip, meal_count) {
			$scope.tip_total = tip_total;
			$scope.avg_tip = avg_tip;
			$scope.meal_count = meal_count;
		})
		
		$scope.reset = function() {
			$scope.cancel();
			$scope.tip_total = 0;
			$scope.avg_tip = 0;
			$scope.meal_count = 0;
			delete $scope.cust_sub_total;
			delete $scope.cust_tip;
			delete $scope.cust_total;
		};

	})