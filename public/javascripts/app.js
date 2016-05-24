var app = angular.module('chartRevApp', ['dmCtrl', 'auditService', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/diabetes', {
				templateUrl: 'partials/dm.html',
				controller: 'dmCtrl'				
			}).otherwise({redirectTo: '/diabetes'});
	}]);