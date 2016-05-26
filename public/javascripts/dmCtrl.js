var dmCtrl = angular.module('dmCtrl', []);
	
	dmCtrl.controller('dmCtrl', ['$scope', 'DMAudits', 
		function($scope, DMAudits){

			$scope.formData = {};
			$scope.results 	= {};
			$scope.diabetes = {};
			$scope.code_alert = true;
			$scope.success_alert = true;

			var codeAlert = function(){
				$scope.code_alert = false;
			};

			var successAlert = function(){
				$scope.success_alert = false;
			};

			var closeAlert = function(){
				$scope.code_alert = true;
				$scope.success_alert = true;
			};
		
			$scope.openModal = function(){
				if($scope.diabetes.code){
					closeAlert();
					$("#diabetesM").modal("show");
				} else { 
					//alert("Unijeti šifru!"); 
					codeAlert();
				}
			};

			$scope.openResults = function(){
				if($scope.diabetes.code){
					closeAlert();
					clearResults();
					
					DMAudits.get($scope.diabetes.code).success(function(data){
						//$("#diabetesResults").modal("show");
						$scope.results.broj_kartona = data.length;
						data.forEach(function(audit){
							if(audit.spol==="M") { $scope.results.muski++; }
							if(audit.spol==="Ž") { $scope.results.zenski++; }
							if(audit.porodicna_anamneza) { $scope.results.porodicna_anamneza_dm_poz++; }
							if(audit.tipDM==="E10") { $scope.results.e10++; }
							if(audit.tipDM==="E11") { $scope.results.e11++; }
							if(audit.tipDM==="Drugi") { $scope.results.e_drugo++; }
							if(audit.hospitalizacija > 0) { $scope.results.hospitalizirani_poz++; }
							if(audit.hba1c) {
								$scope.results.hba1c++;
								if(audit.ValHbA1C==="+7") { $scope.results.hba1c_vece_7++; }
							}
							if(audit.glukoza) {
								$scope.results.glukoza++;
								if(audit.ValGlukoza==="+7") { $scope.results.glukoza_vece_7++; }
							}
							if(audit.glukoza2) {
								$scope.results.glukoza2++;
								if(audit.ValGlukoza2==="+11") { $scope.results.glukoza2_vece_11++; }
							}
							if(audit.ttv) { $scope.results.ttv++; }
							if(audit.bmi) { $scope.results.bmi++; }

						});

						$("#diabetesResults").modal("show");

					});
					
				} else { codeAlert(); }
			};

			$scope.clear = function(){
				clearFields();
			};

			$scope.sacuvaj = function(){
				
				closeAlert();

				postData = {
					auditCode: $scope.diabetes.code,
					godiste: $scope.formData.godiste,
					spol: $scope.formData.spol,
					porodicna_anamneza: $scope.formData.porodicna_anamneza,
					tipDM: $scope.formData.tipDM,
					hospitalizacija: $scope.formData.hospitalizacija,
					hba1c: $scope.formData.hba1c,
					glukoza: $scope.formData.glukoza,
					glukoza2: $scope.formData.glukoza2,
					ttv: $scope.formData.ttv,
					bmi: $scope.formData.bmi
				};

				if(postData.hba1c){
					postData.ValHbA1C = $scope.formData.ValHbA1C;
				}

				if(postData.glukoza){
					postData.ValGlukoza = $scope.formData.ValGlukoza;
				}

				if(postData.glukoza2){
					postData.ValGlukoza2 = $scope.formData.ValGlukoza2;
				}

				//console.log(postData);
				DMAudits.create(postData);
				clearFields();
				successAlert();
				$("#diabetesM").scrollTop(0);

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

			var clearResults = function(){
				$scope.results 	= {
					broj_kartona: 0,
					muski: 0,
					zenski: 0,
					porodicna_anamneza_dm_poz: 0,
					e10: 0,
					e11: 0,
					e_drugo: 0,
					hospitalizirani_poz: 0,
					hba1c: 0,
					hba1c_vece_7: 0,
					glukoza: 0,
					glukoza_vece_7: 0,
					glukoza2: 0,
					glukoza2_vece_11: 0,
					ttv: 0,
					bmi: 0
				};
			}

			$scope.savePDF = function(){
				//
			};

			$scope.printPDF = function(){
				//
			};

			
	}]);