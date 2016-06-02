var dmCtrl = angular.module('dmCtrl', []);
	
	dmCtrl.controller('dmCtrl', ['$scope', 'DMAudits', 
		function($scope, DMAudits){

			$scope.formData = {};
			$scope.results 	= {};
			$scope.diabetes = {};
			$scope.code_alert = true;
			$scope.success_alert = true;
			//$scope.invalid_alert = true;

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
							if(audit.tlak) { 
								$scope.results.tlak++;
								if(audit.ValTlak==="+130") { $scope.results.tlak_veci++; }
							}
							if(audit.holesterol) { $scope.results.holesterol++; }
							if(audit.trigliceridi) { $scope.results.trigliceridi++; }
							if(audit.mikroalb) { $scope.results.mikroalb++; }
							if(audit.stopalo) { $scope.results.stopalo++; }
							if(audit.ocno_dno) { $scope.results.ocno_dno++; }
							if(audit.monofilament) { $scope.results.monofilament++; }
							if(audit.pusac) { $scope.results.pusac++; }
							if(audit.pusac_savjetovanje) { $scope.results.pusac_savjetovanje++; }
							if(audit.alkohol) { $scope.results.alkohol++; }
							if(audit.edukacija) { $scope.results.edukacija++; }
							if(audit.samokontrola_glukoze) { $scope.results.samokontrola_glukoze++; }
							if(audit.posjeta_spec) { $scope.results.posjeta_spec++; }
							if((audit.oral_a || audit.oral_b || audit.oral_c) && !audit.inzulin) { $scope.results.samo_oral++; }
							if(!(audit.oral_a || audit.oral_b || audit.oral_c) && audit.inzulin) { $scope.results.inzulin++; }
							if((audit.oral_a || audit.oral_b || audit.oral_c) && audit.inzulin) { $scope.results.komb_inzulin_oral++; }
							if(audit.drugo_th) { $scope.results.drugo_th++; }
							if(audit.kontrola) { $scope.results.kontrola++; }

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
					bmi: $scope.formData.bmi,
					tlak: $scope.formData.tlak,
					holesterol: $scope.formData.holesterol,
					trigliceridi: $scope.formData.trigliceridi,
					mikroalb: $scope.formData.mikroalb,
					stopalo: $scope.formData.stopalo,
					ocno_dno: $scope.formData.ocno_dno,
					monofilament: $scope.formData.monofilament,
					pusac: $scope.formData.pusac,
					alkohol: $scope.formData.alkohol,
					edukacija: $scope.formData.edukacija,
					samokontrola_glukoze: $scope.formData.samokontrola_glukoze,
					posjeta_spec: $scope.formData.posjeta_spec,
					terapija_ljekar: $scope.formData.terapija_ljekar,
					oral_a: $scope.formData.oral_a,
					doza_a: $scope.formData.doza_a,
					oral_b: $scope.formData.oral_b,
					doza_b: $scope.formData.doza_b,
					oral_c: $scope.formData.oral_c,
					doza_c: $scope.formData.doza_c,
					inzulin: $scope.formData.inzulin,
					drugo_th: $scope.formData.drugo_th,
					kontrola: $scope.formData.kontrola
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

				if(postData.tlak){
					postData.ValTlak = $scope.formData.ValTlak;
				}

				if(postData.pusac){
					postData.pusac_savjetovanje = $scope.formData.pusac_savjetovanje;
				}

				if(postData.edukacija){
					postData.edukacija_edukator = $scope.formData.edukacija_edukator;
				}

				if(postData.posjeta_spec){
					postData.specijalisti = $scope.formData.specijalisti;
				}

				//console.log(postData);
				//if(validateForm()){
					DMAudits.create(postData);
					clearFields();
					successAlert();
				//} else { invalidAlert(); }
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
					$scope.formData.tlak = false;
					$scope.formData.holesterol = false;
					$scope.formData.trigliceridi = false;
					$scope.formData.mikroalb = false;
					$scope.formData.stopalo = false;
					$scope.formData.ocno_dno = false;
					$scope.formData.monofilament = false;
					$scope.formData.pusac = false;
					$scope.formData.alkohol = false;
					$scope.formData.edukacija = false;
					$scope.formData.samokontrola_glukoze = false;
					$scope.formData.posjeta_spec = false;
					$scope.formData.terapija_ljekar = "";
					$scope.formData.oral_a = "";
					$scope.formData.doza_a = "";
					$scope.formData.oral_b = "";
					$scope.formData.doza_b = "";
					$scope.formData.oral_c = "";
					$scope.formData.doza_c = "";
					$scope.formData.inzulin = "";
					$scope.formData.drugo_th = "";
					$scope.formData.kontrola = false;
					$scope.formData.ValTlak = "";
					$scope.formData.pusac_savjetovanje = false;
					$scope.formData.edukacija_edukator = "";
					$scope.formData.specijalisti = "";
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
					bmi: 0,
					tlak: 0,
					holesterol: 0,
					trigliceridi: 0,
					mikroalb: 0, 
					stopalo: 0,
					ocno_dno: 0,
					monofilament: 0,
					pusac: 0,
					alkohol: 0,
					edukacija: 0,
					samokontrola_glukoze: 0,
					posjeta_spec: 0,
					terapija_ljekar: 0,
					samo_oral: 0,
					inzulin: 0,
					komb_inzulin_oral: 0,
					drugo_th: 0,
					kontrola: 0,
					tlak_veci: 0,
					pusac_savjetovanje: 0
				};
			}

			$scope.saveCSV = function(){
				var filename = $scope.diabetes.code + '.csv';
				var csv = $('#dm-results-table').table2CSV();
				//alert(csv);
				var blob = new Blob([csv], { type: "text/csv;charset=utf-8" }); 
					saveAs(blob, filename);
			};

			var codeAlert = function(){
				$scope.code_alert = false;
			};

			var successAlert = function(){
				$scope.success_alert = false;
			};

			/*var invalidAlert = function(){
				$scope.invalid_alert = false;
			};*/

			var closeAlert = function(){
				$scope.code_alert = true;
				$scope.success_alert = true;
				//$scope.invalid_alert = true;
			};

			/*var validateForm = function(){

				$scope.alertDM = [];


				if(!$scope.formData.godiste){ $scope.alertDM[0] = true; }
				if(typeof $scope.formData.spol === "undefined"){ $scope.alertDM[1] = true; }
				if(typeof $scope.formData.porodicna_anamneza === "undefined"){ $scope.alertDM[2] = true; }
				if(typeof $scope.formData.tipDM === "undefined"){ $scope.alertDM[3] = true; }
				if(typeof $scope.formData.hospitalizacija === "undefined"){ $scope.alertDM[4] = true; }
				if(typeof $scope.formData.hba1c === "undefined"){ $scope.alertDM[5] = true; }
				if(typeof $scope.formData.glukoza === "undefined"){ $scope.alertDM[6] = true; }
				if(typeof $scope.formData.glukoza2 === "undefined"){ $scope.alertDM[7] = true; }
				if(typeof $scope.formData.ttv === "undefined"){ $scope.alertDM[8] = true; }
				if(typeof $scope.formData.bmi === "undefined"){ $scope.alertDM[9] = true; }
				if(typeof $scope.formData.tlak === "undefined"){ $scope.alertDM[10] = true; }
				if(typeof $scope.formData.holesterol === "undefined"){ $scope.alertDM[11] = true; }
				if(typeof $scope.formData.trigliceridi === "undefined"){ $scope.alertDM[12] = true; }
				if(typeof $scope.formData.mikroalb === "undefined"){ $scope.alertDM[13] = true; }
				if(typeof $scope.formData.stopalo === "undefined"){ $scope.alertDM[14] = true; }
				if(typeof $scope.formData.ocno_dno === "undefined"){ $scope.alertDM[15] = true; }
				if(typeof $scope.formData.monofilament === "undefined"){ $scope.alertDM[16] = true; }
				if(typeof $scope.formData.pusac === "undefined"){ $scope.alertDM[17] = true; }
				if(typeof $scope.formData.alkohol === "undefined"){ $scope.alertDM[18] = true; }
				if(typeof $scope.formData.edukacija === "undefined"){ $scope.alertDM[19] = true; }
				if(typeof $scope.formData.samokontrola_glukoze === "undefined"){ $scope.alertDM[20] = true; }
				if(typeof $scope.formData.posjeta_spec === "undefined"){ $scope.alertDM[21] = true; }
				if(typeof $scope.formData.kontrola === "undefined"){ $scope.alertDM[22] = true; }

				console.log($scope.alertDM);
				if ($scope.alertDM.length > 0) { return false; }
				else { return true; }
			};*/
		
			
	}]);