var clientModule = angular.module('client', [])
		
		// login
		.controller('loginController', function($rootScope, $scope, $http, $timeout) {
			
		    $scope.type = "Admin";
			$rootScope.loggedIn = true;
			$rootScope.whoIsLoggedIn = null;
			$rootScope.loggedInName = null;
			$rootScope.localHost = "http://localhost:8080/";
			$rootScope.projectPath = "CouponREST/rest/";
			$scope.loginResponse = null;
			
			$scope.processForm = function() {
				
				if ($scope.name != null && $scope.pass != null && $scope.type != null) {
				
					$http({
						method: 'POST',
						url: $rootScope.localHost + $rootScope.projectPath + 'connecting/login',
						data: {
									"name" : $scope.name,
									"pass" : $scope.pass,
									"type" : $scope.type.toUpperCase()
						}
					})
			
					.then(function successCallback(response) {
							
							$scope.loginResponse = response.data;
							$scope.failure = null;
							$rootScope.loggedIn = false;
							$rootScope.whoIsLoggedIn = $scope.loginResponse['role'];
							$rootScope.loggedInName = $scope.loginResponse['success'];

							$scope.name = null;
							$scope.pass = null;
							$scope.type = "Admin";
							
					}, function errorCallback(response) {
						
							$scope.loginResponse = response.data;
							$scope.failure = $scope.loginResponse['error'];

							$scope.name = null;
							$scope.pass = null;
							$scope.type = "Admin";

					});
				} else {
				    $scope.failure = "Fill in the form";
				    $timeout(function () { $scope.failure = null }, 1000);
				}
			}
		})
		
		// logout
		.controller('logout', function($rootScope, $scope, $http) {
			
			$scope.logoutResponse = null;
			
			$scope.logOut = function() {
				
				$http({
					method: 'GET',
					url: $rootScope.localHost + $rootScope.projectPath + 'connecting/logout'
				})
				
				.then(function successCallback(response) {
						
						$scope.logoutResponse = response.data;
						$rootScope.loggedIn = true;
						$rootScope.whoIsLoggedIn = null;
						$rootScope.loggedInName = null;

                    // all open divs must closed
						$rootScope.createCompany = false;
						$rootScope.getCompanyById = false;
						
				}, function errorCallback(response) {
					
						$scope.loginResponse = response.data;

				});
			}
		})
		
        // menu
		.controller('menu', function($rootScope, $scope, $http) {
			
			$scope.adminCompany = false;
			$scope.adminCustomer = false;
		})
		
        // admin menu
		.controller('adminMenu', function($rootScope, $scope, $http) {
			
            // add all ng-show = false here
			$rootScope.createCompany = false;
			$rootScope.getCompanyById = false;
			$rootScope.getAllCompanies = false;

            // create company
			$scope.openCreateCompany = function () {
			    $rootScope.createCompany = (!$rootScope.createCompany);

                // add all cross checks here
			    if ($rootScope.getCompanyById == true) $rootScope.getCompanyById = false;
			    if ($rootScope.getAllCompanies == true) $rootScope.getAllCompanies = false;
			}

            // get company by id
			$scope.openGetCompanyById = function () {
			    $rootScope.getCompanyById = (!$rootScope.getCompanyById);

                // add all cross checks here
			    if ($rootScope.createCompany == true) $rootScope.createCompany = false;
                if ($rootScope.getAllCompanies == true) $rootScope.getAllCompanies = false;
			}

            // get all companies
			$scope.openGetAllCompanies = function () {
			    $rootScope.getAllCompanies = (!$rootScope.getAllCompanies);

			    // add all cross checks here
			    if ($rootScope.createCompany == true) $rootScope.createCompany = false;
			    if ($rootScope.getCompanyById == true) $rootScope.getCompanyById = false;
			}
			
		})
		
        // customer menu
		.controller('customerMenu', function($rootScope, $scope, $http) {
		})
		
        // company menu
		.controller('companyMenu', function($rootScope, $scope, $http) {
		})
		
        // main page
		.controller('mainPage', function($rootScope, $scope, $http) {
		})
		
        // admin page
		.controller('adminPage', function ($rootScope, $scope, $http, $timeout) {

            // create company
		    $scope.submitCreateCompany = function () {

		        if ($scope.name != null && $scope.pass != null && $scope.email != null) {

		            $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/newcomp',
		                data: {
		                    "name": $scope.name,
		                    "pass": $scope.pass,
		                    "email": $scope.email
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['success'];

					    $scope.name = null;
					    $scope.pass = null;
					    $scope.email = null;
					    $scope.toRefresh = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['error'];

					    $scope.name = null;
					    $scope.pass = null;
					    $scope.email = null;

					});

		        } else {
		            $scope.result = "Fill in the form";
		        }

		        $timeout(function () { $scope.result = null }, 1000);
		    }

            // get company by id
		    $scope.submitGetCompanyById = function () {

		        if ($scope.id != null) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/company',
		                params: {
		                    "id": $scope.id
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['company'];

					    $scope.id = null;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['error'];

					    $scope.id = null;

					});
		        } else {
		            $scope.result = "Fill in the form";         
		        }

		        $timeout(function () { $scope.result = null }, 1000);
		    }

		    // get all companies

		    $scope.toRefresh = true;

		    $rootScope.submitGetAllCompanies = function () {

		        if ($scope.toRefresh) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/companies'
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.companies = $scope.loginResponse['companies'];

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];

					});

		            $scope.toRefresh = false;
		        }
		    }
		})
		
		.controller('customerPage', function($rootScope, $scope, $http) {
		})
		
		.controller('companyPage', function($rootScope, $scope, $http) {
		})
		
		