angular.module('WSWRApp', ['ngRoute'])
	.value('earnings', { tipTotal: 0, mealCount: 0, avgTip: 0 } )

	.config(function($routeProvider) {
		$routeProvider.when('/Home', {
			templateUrl : './home.html',
			controller : 'HomeCtrl'
		}).when('/NewMeal', {
			templateUrl : './new-meal.html',
			controller : 'NewMealCtrl'
		}).when('/MyEarnings', {
			templateUrl : './my-earnings.html',
			controller : 'MyEarningsCtrl'
		}).when('/error', {
			template : '<p>Error Page Not Found</p'
		}).otherwise( {
			redirectTo : '/Home'
		});
	})
	.run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function() {
			$location.path('/error');
		});
	})
	.controller('HomeCtrl', function($scope){
  		$scope.explanation = "Explanation of how it works. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod...";
	})
	.controller('NewMealCtrl', function($scope, $rootScope, earnings) {

		$scope.baseMealPrice;
		$scope.taxRate;
		$scope.tipPercentage;
		$scope.custSubTotal = 0;
		$scope.custTip = 0;
		$scope.custTotal = 0;
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.avgTip = 0;
		$scope.showError = false;
		console.log("Inside NewMealCtrl");
		console.log($scope.showError);

		$scope.submit = function() {
			console.log("Inside submit");
			$scope.showError = true;
			console.log($scope.showError);
			if ($scope.mealForm.$valid) {
				console.log("Inside if mealForm valid");
				$scope.custSubTotal = $scope.baseMealPrice + ($scope.baseMealPrice * $scope.taxRate/100);
				$scope.custTip = $scope.baseMealPrice * $scope.tipPercentage/100;
				$scope.custTotal = $scope.custSubTotal + $scope.custTip;
				earnings.tipTotal = earnings.tipTotal + $scope.custTip;
				earnings.mealCount++;
				earnings.avgTip = earnings.tipTotal/earnings.mealCount;
				$scope.cancel();
				//$scope.displayEarnings();
			};
		};

		$scope.cancel = function() {
			console.log("Inside cancel");
			//delete $scope.baseMealPrice;
			//delete $scope.taxRate;
			//delete $scope.tipPercentage;
			$scope.baseMealPrice = 0;
			$scope.taxRate = 0;
			$scope.tipPercentage = 0;
			$scope.showError = false;
			console.log($scope.showError);
		};

		//$scope.displayEarnings = function() {
		//	console.log("Inside displayEarnings");
		//	$scope.$broadcast('displayData', $scope.tipTotal, $scope.avgTip, $scope.mealCount )
		//};
	})

	.controller('MyEarningsCtrl', function($scope, earnings) {
		console.log("Inside MyEarningsCtrl");
		//$scope.$on('displayData', function(event, tipTotal, avgTip, mealCount) {
		console.log("Inside scope.On");
		$scope.tipTotal = earnings.tipTotal;
		$scope.avgTip = earnings.avgTip;
		$scope.mealCount = earnings.mealCount;
		//});
		
		$scope.reset = function() {
			console.log("Inside reset");
			//$scope.cancel();
			earnings.tipTotal = 0;
			earnings.avgTip = 0;
			earnings.mealCount = 0;
			$scope.tipTotal = 0;
			$scope.avgTip = 0;
			$scope.mealCount = 0;
			//delete $scope.custSubTotal;
			//delete $scope.custTip;
			//delete $scope.custTotal;
		};

	})