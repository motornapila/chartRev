angular.module('auditService', [])
	.factory('DMAudits', function($http){
		return {
			/*get: function(code){
				return $http.get('api/audits/code');
			},*/
			create: function(formData){
				return $http.post('api/audits', formData);
			}
		}
	});