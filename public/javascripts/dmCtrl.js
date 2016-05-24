var dmCtrl = angular.module('dmCtrl', []);
	
	dmCtrl.controller('dmCtrl', ['$scope', 'DMAudits', 
		function($scope, DMAudits){
		
			$scope.openModal = function(){
				$("#diabetesM").modal("show");
			};

			$scope.formData = {};

			$scope.sacuvaj = function(){
			
				postData = {
					auditCode: $scope.diabetes.code,
					godiste: $scope.formData.godiste,
					spol: $scope.formData.spol,
					porodicna_anamneza: $scope.formData.porodicna_anamneza,
					tipDM: $scope.formData.tipDM,
					hospitalizacija: $scope.formData.hospitalizacija,
					hba1c: $scope.formData.hba1c,
					glukoza: $scope.formData.glukoza,
					ttv: $scope.formData.ttv,
					bmi: $scope.formData.bmi
				};

				if(postData.hba1c){
					postData.ValHbA1C = $scope.formData.ValHbA1C;
				}

				if(postData.glukoza){
					postData.ValGlukoza = $scope.formData.ValGlukoza;
				}

				//console.log(postData);
				DMAudits.create(postData);
				clearFields();

			};

			var clearFields = function(){
					$scope.formData.godiste = "";
					$scope.formData.spol = "";
					$scope.formData.porodicna_anamneza = false;
					$scope.formData.tipDM = "";
					$scope.formData.hospitalizacija = "";
					$scope.formData.hba1c = false;
					$scope.formData.glukoza = false;
					$scope.formData.ttv = false;
					$scope.formData.bmi = false;
					$scope.formData.ValHbA1C = "";
					$scope.formData.ValGlukoza = "";
			};

			
	}]);