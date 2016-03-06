var informationShowTimeInMillisec = 2000;
var clientModule = angular.module('client', [])
		
        // page header
		.controller('pageHeader', function($scope) {

		    

		})

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

							$rootScope.toRefreshCompanies = true;
							$rootScope.toRefreshCustomers = true;
							
					}, function errorCallback(response) {
						
							$scope.loginResponse = response.data;
							$scope.failure = $scope.loginResponse['error'];

							$scope.name = null;
							$scope.pass = null;
							$scope.type = "Admin";

					});
				} else {
				    $scope.failure = "Fill in the form";
				    $timeout(function () { $scope.failure = null }, informationShowTimeInMillisec);
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

						$rootScope.closeAllPages();
						$rootScope.nullifyResults();
						
				}, function errorCallback(response) {
					
						$scope.loginResponse = response.data;

				});
			}
		})
		
        // menu
		.controller('menu', function($rootScope, $scope, $http) {
			
			$scope.adminCompany = false;
			$scope.adminCustomer = false;

		    // add all pages here
			$rootScope.pages = {
			    "createCompany": false,
			    "removeCompany": false,
			    "getCompanyById": false,
			    "updateCompany": false,
			    "getAllCompanies": false,
			    "getCompanyByName": false,
			    "createCustomer": false,
			    "removeCustomer": false,
			    "updateCustomer": false,
			    "getCustomerById": false,
			    "getCustomerByName": false,
			    "getAllCustomers": false,
			    "createCoupon": false,
			    "getCoupons": false,
			    "updateCoupon": false
			};

		    // function that closes all admins pages
			$rootScope.closeAllPages = function () {

			    angular.forEach($rootScope.pages, function (value, key) {

			        $rootScope.pages[key] = false;

			    });
			}

		    // function that only opens the clicked page
			$rootScope.openPage = function (somePage) {

			    angular.forEach($rootScope.pages, function (value, key) {

			        if (angular.equals(key, somePage)) $rootScope.pages[key] = true;
			        else $rootScope.pages[key] = false;

			    });
			};

		    // add all results here (names similiar to pages for ease of use)
			$rootScope.results = {
			    "createCompany": null,
			    "removeCompany": null,
			    "getCompanyById": null,
			    "updateCompany": null,
			    "getAllCompanies": null,
			    "getCompanyByName": null,
			    "createCustomer": null,
			    "removeCustomer": null,
			    "updateCustomer": null,
			    "getCustomerById": null,
			    "getCustomerByName": null,
			    "getAllCustomers": null,
			    "createCoupon": null,
			    "getCoupons": null,
			    "updateCoupon": null
			}

		    // function that nullifies all results
			$rootScope.nullifyResults = function () {

			    angular.forEach($rootScope.results, function (value, key) {

			        $rootScope.results[key] = null;

			    });

			}

		})
		
        // admin menu
		.controller('adminMenu', function($rootScope, $scope, $http) {
		})
		
        // customer menu
		.controller('customerMenu', function($rootScope, $scope, $http) {
		})
		
        // company menu
		.controller('companyMenu', function ($rootScope, $scope, $http) {

		    /*
                Look at "menu" controller. I've created a function that closes all pages automatically
                and opens the right page
            */
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
					    $rootScope.results["createCompany"] = $scope.loginResponse['success'];
					    $scope.toRefreshCompanies = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["createCompany"] = $scope.loginResponse['error'];


					});

		        } else {
		            $rootScope.results["createCompany"] = "Fill in the form";
		        }
		        $timeout(function () { $rootScope.results["createCompany"] = null }, informationShowTimeInMillisec);
				$scope.name = null;
				$scope.pass = null;
				$scope.email = null;

		    }

		    // remove company

		    $scope.submitRemoveCompany = function () {

		        if ($scope.rName != null && $scope.rPass != null && $scope.rEmail != null) {

		            $http({
		                method: "DELETE",
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/removecomp',
		                headers: { 'Content-Type': 'application/json' },
		                data: { "name": $scope.rName, "pass": $scope.rPass, "email": $scope.rEmail }
		               })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCompany"] = $scope.loginResponse['success'];
					    $scope.toRefreshCompanies = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCompany"] = $scope.loginResponse['error'];


					});

		        } else {
		            $rootScope.results["removeCompany"] = "Fill in the form";
		        }
		        $timeout(function () { $rootScope.results["removeCompany"] = null }, informationShowTimeInMillisec);
                $scope.rName = null;
				$scope.rPass = null;
				$scope.rEmail = null;

		    }

		    // update company

		    $scope.submitUpdateCompany = function () {

		        if ($scope.uName != null && $scope.uPass != null && $scope.uEmail != null) {

		            $http({
		                method: "PUT",
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/updcomp',
		                headers: { 'Content-Type': 'application/json' },
		                data: { "name": $scope.uName, "pass": $scope.uPass, "email": $scope.uEmail }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCompany"] = $scope.loginResponse['success'];
					    $scope.toRefreshCompanies = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCompany"] = $scope.loginResponse['error'];


					});

		        } else {
		            $rootScope.results["updateCompany"] = "Fill in the form";
		        }
		        $timeout(function () { $rootScope.results["updateCompany"] = null }, informationShowTimeInMillisec);
                $scope.uName = null;
				$scope.uPass = null;
				$scope.uEmail = null;

		    }

		    // get company by id
		    $scope.submitGetCompanyById = function () {

		        if ($scope.selectedId != null) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/company',
		                params: {
		                    "id": $scope.selectedId
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCompanyById"] = $scope.loginResponse['company'];

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCompanyById"] = $scope.loginResponse['error'];
					    $timeout(function () { $rootScope.results["getCompanyById"] = null }, informationShowTimeInMillisec);

					});
		        } else {
		            $rootScope.results["getCompanyById"] = "Fill in the form";
		            $timeout(function () { $rootScope.results["getCompanyById"] = null }, informationShowTimeInMillisec);
		        }

		        $scope.selectedId = null;
		    }

		    // get company by name
		    $scope.submitGetCompanyByName = function () {

		        if ($scope.selectedName != null) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/compname',
		                params: {
		                    "name": $scope.selectedName
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCompanyByName"] = $scope.loginResponse['company'];

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCompanyByName"] = $scope.loginResponse['error'];
					    $timeout(function () { $rootScope.results["getCompanyByName"] = null }, informationShowTimeInMillisec);

					});
		        } else {
		            $rootScope.results["getCompanyByName"] = "Fill in the form";
		            $timeout(function () { $rootScope.results["getCompanyByName"] = null }, informationShowTimeInMillisec);
		        }
					    $scope.selectedName = null;

		    }

		    // get all companies

		    $scope.toRefreshCompanies = true;
		    var companyIds = [];
		    var companyNames = [];
		    $scope.compIds = companyIds;
		    $scope.compNames = companyNames;

		    $rootScope.submitGetAllCompanies = function () {

		        if ($scope.toRefreshCompanies) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/companies'
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.companies = $scope.loginResponse['companies'];

					    angular.forEach($scope.companies, function (value, key) {

					        companyIds.push(value['id']);
					        companyNames.push(value['name']);

					    });

					    $scope.compIds = companyIds;
					    $scope.compNames = companyNames;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];

					});

		            $scope.toRefreshCompanies = false;
		        }
		    }

		    // create customer
		    $scope.submitCreateCustomer = function () {

		        if ($scope.custName != null && $scope.custPass != null) {

		            $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/createcust',
		                data: {
		                    "name": $scope.custName,
		                    "pass": $scope.custPass
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["createCustomer"] = $scope.loginResponse['success'];
					    $scope.toRefreshCustomers = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["createCustomer"] = $scope.loginResponse['error'];


					});

		        } else {
		            $rootScope.results["createCustomer"] = "Fill in the form";
		        }
		        $timeout(function () { $rootScope.results["createCustomer"] = null }, informationShowTimeInMillisec);
				$scope.custName = null;
				$scope.custPass = null;

		    }

		    // remove customer
		    $scope.submitRemoveCustomer = function () {

		        if ($scope.custName != null && $scope.custPass != null) {

		            $http({
		                method: 'DELETE',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/rmcust',
		                headers: { 'Content-Type': 'application/json' },
		                data: {
		                    "name": $scope.custName,
		                    "pass": $scope.custPass
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCustomer"] = $scope.loginResponse['success'];
					    $scope.toRefreshCustomers = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCustomer"] = $scope.loginResponse['error'];


					});

		        } else {
		            $rootScope.results["removeCustomer"] = "Fill in the form";
		        }
		        $timeout(function () { $rootScope.results["removeCustomer"] = null }, informationShowTimeInMillisec);
                $scope.custName = null;
                $scope.custPass = null;

		    }

		    // update customer
		    $scope.submitUpdateCustomer = function () {

		        if ($scope.custUName != null && $scope.custUPass != null) {

		            $http({
		                method: 'PUT',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/updatecust',
		                headers: { 'Content-Type': 'application/json' },
		                data: {
		                    "name": $scope.custUName,
		                    "pass": $scope.custUPass
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCustomer"] = $scope.loginResponse['success'];
					    $scope.toRefreshCustomers = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCustomer"] = $scope.loginResponse['error'];

					});

		        } else {
		            $rootScope.results["updateCustomer"] = "Fill in the form";
		        }
		        $timeout(function () { $rootScope.results["updateCustomer"] = null }, informationShowTimeInMillisec);
			    $scope.custUName = null;
				$scope.custUPass = null;

		    }

		    // get customer by id
		    $scope.submitGetCustomerById = function () {

		        if ($scope.cId != null) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/customer',
		                params: {
		                    "id": $scope.cId
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCustomerById"] = $scope.loginResponse['customer'];

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCustomerById"] = $scope.loginResponse['error'];
					    $timeout(function () { $rootScope.results["getCustomerById"] = null }, informationShowTimeInMillisec);

					});
		        } else {
		            $rootScope.results["getCustomerById"] = "Fill in the form";
		            $timeout(function () { $rootScope.results["getCustomerById"] = null }, informationShowTimeInMillisec);
		        }
				$scope.cId = null;

		    }

		    // get customer by name
		    $scope.submitGetCustomerByName = function () {

		        if ($scope.cName != null) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/custname',
		                params: {
		                    "name": $scope.cName
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCustomerByName"] = $scope.loginResponse['customer'];

					    $scope.cName = null;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["getCustomerByName"] = $scope.loginResponse['error'];
					    $scope.cName = null;
					    $timeout(function () { $rootScope.results["getCustomerByName"] = null }, informationShowTimeInMillisec);

					});
		        } else {
		            $rootScope.results["getCustomerByName"] = "Fill in the form";
		            $timeout(function () { $rootScope.results["getCustomerByName"] = null }, informationShowTimeInMillisec);
		        }

		    }

		    // get all customers

		    $scope.toRefreshCustomers = true;
		    var customerIds = [];
		    var customerNames = [];

		    $rootScope.submitGetAllCustomers = function () {

		        if ($scope.toRefreshCustomers) {

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/customers'
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.customers = $scope.loginResponse['customers'];

					    angular.forEach($scope.customers, function (value, key) {

					        customerIds.push(value['id']);
					        customerNames.push(value['name']);

					    });

					    $scope.compIds = customerIds;
					    $scope.compNames = customerNames;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];

					});

		            $scope.toRefreshCustomers = false;
		        }
		    }
		})
		
		.controller('customerPage', function ($rootScope, $scope, $http) {
		   
		})
		
		.controller('companyPage', function ($rootScope, $scope, $http, $timeout) {
             
		    // create coupon
		    $scope.submitCreateCoupon = function () {

	//	        if ($scope.title != null && $scope.amount != null && $scope.type != null
      //              && $scope.price != null && $scope.image != null && $scope.startDate != null
       //             && $scope.endDate != null && $scope.message != null) {

		            $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'company',
		                data: {
		                    "title": $scope.title,
		                    "amount": $scope.amount,
		                    "type": $scope.type,
		                    "price": $scope.price,
		                    "image": "image",
		                    "startDate": $scope.startDate,
		                    "endDate": $scope.endDate,
		                    "message": $scope.message
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['success'];



					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['error'];


					});

		//        } else {
		//            $scope.result = "Fill in the form";
		//        }

		        $timeout(function () { $scope.result = null }, informationShowTimeInMillisec);
		    }

		  
           
		    $rootScope.submitGetCoupons = function () {
   
		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'company/coupons'
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
                        
					    $rootScope.companyCoupons = $scope.loginResponse['coupons'];
					    

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];

					});

		   
		        
		    }

		    $scope.removeCoupon = function (coupon) {

		        $http({
		            method: 'DELETE',
		            url: $rootScope.localHost + $rootScope.projectPath + 'company',
		            headers: { 'Content-Type': 'application/json' },
		            data: {
		                "title": coupon.title,
		                "amount": coupon.amount,
		                "type": coupon.type,
		                "price": coupon.price,
		                "image": coupon.image,
		                "startDate": coupon.startDate,
		                "endDate": coupon.endDate,
		                "message": coupon.message
		            }
		        })

					.then(function successCallback(response) {
					   
					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['success'];


					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];

					});
		    }

		    $scope.updateCoupon = function (coupon) {
              
		        $http({
		            method: 'PUT',
		            url: $rootScope.localHost + $rootScope.projectPath + 'company',
		            headers: { 'Content-Type': 'application/json' },
		            data: {
		                "title": coupon.title,
		                "amount": coupon.amount,
		                "type": coupon.type,
		                "price": coupon.price,
		                "image": coupon.image,
		                "startDate": coupon.startDate,
		                "endDate": coupon.endDate,
		                "message": coupon.message
		            }
		        })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['success'];


					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];

					});
		    }
		

		})
		
		