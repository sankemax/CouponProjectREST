var informationShowTimeInMillisec = 1500;
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
							$rootScope.toRefreshBoughtCoupons = true;
							
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
		
		    // add all pages here
		    $rootScope.pages = {
			    "createCompany": false,
			    "getAllCompanies": false,
			    "createCustomer": false,
			    "getAllCustomers": false,
			    "createCoupon": false,
			    "getCoupons": false,
			    "purchacedCoupons": false,
		        "couponsToPurchase": false
			};

		    // function that closes all pages
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
			    "getAllCompanies": null,
			    "createCustomer": null,
			    "getAllCustomers": null,
			    "createCoupon": null,
			    "getCoupons": null,
			    "purchacedCoupons": null,
			    "couponsToPurchase": null
			};

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
		})
		
        // main page
		.controller('mainPage', function($rootScope, $scope, $http) {
            
            $rootScope.inputValidation = function(fieldValue,type) {
                var pattern; 
                if (type == 'text') {
                    pattern = /^[A-Za-z0-9 ]{3,20}$/;
                } else if (type == 'email') {
                    pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{1,6}(?:\.[a-z]{1})?)$/i;
                } else if (type == 'password') {
                    pattern = /^[A-Za-z0-9!@#$%^&*()_]{3,20}$/;
                }
                if (fieldValue != undefined && fieldValue != null && pattern.test(fieldValue)) return true;
                else return false;
            }
            
            // finish it
            //$rootScope.showSomeDiv = function(divname)
		})
		
        // admin page
		.controller('adminPage', function ($rootScope, $scope, $http, $timeout, $window) {

            // create company
		    $scope.submitCreateCompany = function () {
		        if ($rootScope.inputValidation($scope.name, 'text') && $rootScope.inputValidation($scope.pass, 'password') && $rootScope.inputValidation($scope.email, 'email')) {

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
                        $scope.showCreateSuccess = true;
                         
					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["createCompany"] = $scope.loginResponse['error'];
                        $scope.showCreateError = true;
					});

		        } else {
		            $rootScope.results["createCompany"] = "Invalid form fill";
                    $scope.showCreateError = true;
		        }
                
		        $timeout(function () { 
                    $scope.showCreateError = false;
                    $scope.showCreateSuccess = false; 
                    }, informationShowTimeInMillisec);
				$scope.name = null;
				$scope.pass = null;
				$scope.email = null;

		    }

		    // remove company

		    $scope.submitRemoveCompany = function (company) {
		            $http({
		                method: "DELETE",
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/removecomp',
		                headers: { 'Content-Type': 'application/json' },
		                data: { "name": company.name, "pass": company.pass, "email": company.email }
		               })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCompany"] = $scope.loginResponse['success'];
					    $scope.toRefreshCompanies = true;
					    $scope.deletedCompany();
					    $scope.submitGetAllCompanies();
					    $scope.compNullify('all');
					    $window.scrollTo(0, 0);

					}, function errorCallback(response) {

					    // TODO write something relevant. there are no results anymore
					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCompany"] = $scope.loginResponse['error'];


					});

		    }

		    $scope.deletedCompany = function () {

		        $scope.showDeletedComp = true;
		        $timeout(function () { $scope.showDeletedComp = false }, 3500);

		    }

		    // update company		        

		    $scope.submitUpdateCompany = function (name, oldPass, newPass, oldEmail, newEmail) {
                
                if ($rootScope.inputValidation(newPass, 'password') && $rootScope.inputValidation(newEmail, 'email') && (oldPass != newPass || oldEmail != newEmail)) {
		         
		            $http({
		                method: "PUT",
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/updcomp',
		                headers: {
		                    'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache'
		                },
		                data: {
		                    "name": name,
		                    "pass": newPass,
		                    "email": newEmail
		                }
		            })

					.then(function successCallback(response) {
                        
					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCompany"] = $scope.loginResponse['success'];
					    $scope.updatedCompany();
				        $scope.compShowUpdate = false;
				        $scope.toRefreshCompanies = true;
				        $scope.submitGetAllCompanies();
				        $scope.compNullify('all');
                        $scope.showUpdatedComp = true;
				        $window.scrollTo(0, 0);

					}, function errorCallback(response) {
                        
					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCompany"] = $scope.loginResponse['error'];
                        $scope.showErrorComp = true;
                        $scope.updatedCompany();
                        $scope.compShowUpdate = false;
                        
					});

		        } else {
		            $rootScope.results["updateCompany"] = "Invalid fill or no change to original";
                    $scope.showErrorComp = true;
                    $scope.updatedCompany();
		        }

		    }
            
            $scope.updatedCompany = function () {

				    $timeout(function () { 
                        $scope.showUpdatedComp = false;
                        $scope.showErrorComp = false;
                     }, informationShowTimeInMillisec);
			}

		    // get company by id ------- currently not used -------
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

		    // get company by name ------- currently not used -------
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

		    // company options
		    $scope.companyOrderColumn = '+id';

		    $scope.compSigns =
                {
                    id: "+",
                    name: "+",
                    pass: "+",
                    email: "+"
                }
		    $scope.compManageArrow = function (type) {
		        var order = $scope.companyOrderColumn.substring(1);
		        if (type == order) return $scope.compSigns[type] == '+' ? "arrow-up" : "arrow-down";
		        else return "";
		    };

		    $scope.companySign = function (operator, type) {
		        var toReturn = operator == "+" ? "-" + type : "+" + type;
		        $scope.compSigns[type] = toReturn.substring(0, 1);
		        $scope.typeClicked = type;
		        return toReturn;
		    };

		    $scope.compNullify = function (nullify) {
		        if (angular.equals('id', nullify) || angular.equals('all', nullify)) $scope.compIdSelect = '';
		        if (angular.equals('name', nullify) || angular.equals('all', nullify)) $scope.compNameSelect = '';
		    };

		    $scope.compNullify('all');

		    $scope.compSelect = function (company) {
		        if ($scope.compIdSelect == company.id) return true;
		        else if ($scope.compNameSelect == company.name) return true;
		        else if ($scope.compIdSelect == '' && $scope.compNameSelect == '') return true;
		        else return false;
		    };

		    // get all companies
		    $rootScope.submitGetAllCompanies = function () {
		        if ($scope.toRefreshCompanies) {

		            var companyIds = [];
		            var companyNames = [];

		            $scope.compIds = companyIds;
		            $scope.compNames = companyNames;

		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/companies',
		                headers: {
		                    "Cache-Control": "no-cache"
		                }
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
					    if ($scope.error == "no relevant companies for that query") {
					        var companyIds = [];
					        var companyNames = [];
					        $scope.compIds = companyIds;
					        $scope.compNames = companyNames;
					        $scope.companies = [];
					    }

					});

		            $scope.toRefreshCompanies = false;
		        }
		    }

		    // create customer
		    $scope.submitCreateCustomer = function () {

		        if ($rootScope.inputValidation($scope.custName, 'text') && $rootScope.inputValidation($scope.custPass, 'password')) {

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
                        $scope.showCreateCustSuccess = true;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["createCustomer"] = $scope.loginResponse['error'];
                        $scope.showCreateCustError = true;

					});

		        } else {
		            $rootScope.results["createCustomer"] = "Fill in the form";
                    $scope.showCreateCustError = true;
		        }
                
                $timeout(function () { 
                    $scope.showCreateCustError = false;
                    $scope.showCreateCustSuccess = false; 
                    }, informationShowTimeInMillisec);
				$scope.custName = null;
				$scope.custPass = null;

		    }

		    // remove customer
		    $scope.submitRemoveCustomer = function (customer) {

		            $http({
		                method: 'DELETE',
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/rmcust',
		                headers: { 'Content-Type': 'application/json' },
		                data: {
		                    "name": customer.name,
		                    "pass": customer.pass
		                }
		            })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCustomer"] = $scope.loginResponse['success'];
					    $scope.toRefreshCustomers = true;
					    $scope.deletedCustomer();
					    $scope.submitGetAllCustomers();
					    $scope.custNullify('all');
					    $window.scrollTo(0, 0);

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["removeCustomer"] = $scope.loginResponse['error'];


					});

		        $timeout(function () { $rootScope.results["removeCustomer"] = null }, informationShowTimeInMillisec);
                $scope.custName = null;
                $scope.custPass = null;

		    }

		    $scope.deletedCustomer = function () {

		        $scope.showDeletedCust = true;
		        $timeout(function () { $scope.showDeletedCust = false }, informationShowTimeInMillisec);

		    }

		    // update customer

		    $scope.custCheckUpdate = function (name, oldPass, newPass) {
		        if (oldPass != newPass) {
		            $scope.submitUpdateCustomer(name, newPass);
		        }
		    }

		    $scope.submitUpdateCustomer = function (name, pass) {
                //debugger;
		        if ($rootScope.inputValidation(pass, 'password')) {

		            $http({
		                method: "PUT",
		                url: $rootScope.localHost + $rootScope.projectPath + 'admin/updatecust',
		                headers: {
		                    'Content-Type': 'application/json',
		                    'Cache-Control': 'no-cache'
		                },
		                data: {
		                    "name": name,
		                    "pass": pass,
		                }
		            })

					.then(function successCallback(response) {
					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCustomer"] = $scope.loginResponse['success'];
                        $scope.showUpdatedCust = true;
					    $scope.updatedCustomer();
					    $custShowUpdate = false;
					    $scope.toRefreshCustomers = true;
					    $scope.submitGetAllCustomers();
					    $scope.custNullify('all');
					    $window.scrollTo(0, 0);

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $rootScope.results["updateCustomer"] = $scope.loginResponse['error'];
                        $scope.showErrorCust = true;
                        $scope.updatedCustomer();
					});

		        } else {
		            $rootScope.results["updateCustomer"] = "Fill in the form Correctly";
                    $scope.showErrorCust = true;
                    $scope.updatedCustomer();
		        }


		    }
		        $scope.updatedCustomer = function () {
		            $timeout(function () {
                        $scope.showUpdatedCust = false;
                        $scope.showErrorCust = false;
                    }, informationShowTimeInMillisec);
		        }

		    // get customer by id --------------- not used
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

		    // get customer by name --------------- not used
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

		    // customer options
		    $scope.customerOrderColumn = '+id';

		    $scope.custSigns =
                {
                    id: "+",
                    name: "+",
                    pass: "+",
                }
		    $scope.custManageArrow = function (type) {
		        var order = $scope.customerOrderColumn.substring(1);
		        if (type == order) return $scope.custSigns[type] == '+' ? "arrow-up" : "arrow-down";
		        else return "";
		    };

		    $scope.customerSign = function (operator, type) {
		        var toReturn = operator == "+" ? "-" + type : "+" + type;
		        $scope.custSigns[type] = toReturn.substring(0, 1);
		        $scope.typeClicked = type;
		        return toReturn;
		    };

		    $scope.custNullify = function (nullify) {
		        if (angular.equals('id', nullify) || angular.equals('all', nullify)) $scope.custIdSelect = '';
		        if (angular.equals('name', nullify) || angular.equals('all', nullify)) $scope.custNameSelect = '';
		    };

		    $scope.custNullify('all');

		    $scope.custSelect = function (customer) {
		        if ($scope.custIdSelect == customer.id) return true;
		        else if ($scope.custNameSelect == customer.name) return true;
		        else if ($scope.custIdSelect == '' && $scope.custNameSelect == '') return true;
		        else return false;
		    };

		    // get all customers

		    $scope.toRefreshCustomers = true;


		    $rootScope.submitGetAllCustomers = function () {

		        if ($scope.toRefreshCustomers) {

		            var customerIds = [];
		            var customerNames = [];

		            $scope.custIds = customerIds;
		            $scope.custNames = customerNames;

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

					    $scope.custIds = customerIds;
					    $scope.custNames = customerNames;

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.error = $scope.loginResponse['error'];
					    if ($scope.error == "no relevant customers for that query") {
					        var customerIds = [];
					        var customerNames = [];
					        $scope.custIds = customerIds;
					        $scope.custNames = customerNames;
					        $scope.customers = [];
					    }

					});

		            $scope.toRefreshCustomers = false;
		        }
		    }
		})
		
		.controller('customerPage', function ($rootScope, $scope, $http, $window, $timeout) {

            // filters
		    $scope.searchByPrice = function (item) {
		        if ($scope.searchPrice == undefined) {
		            return true;
		        }
		        else {
		            if ($scope.searchPrice <= item.price) {

		                return true;
		            }
		            return false;
		        }

		    }

		    $scope.searchByAndDate = function (item) {
		        if ($scope.searchAndDate == undefined) {
		            return true;
		        }
		        else {
		            var date1 = new Date($scope.searchAndDate).getTime();
		            var date2 = new Date(item.endDate).getTime();
		            if (date1 <= date2) {

		                return true;
		            }
		            return false;
		        }

		    }

		    // get purchased coupons
		    $rootScope.submitGetPurchacedCoupons = function () {
		        $scope.purchasedCoupons = [];
		        $http({
		            method: 'GET',
		            url: $rootScope.localHost + $rootScope.projectPath + 'customer/',
		        })
                .then(function successCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.purchasedCoupons = $scope.loginResponse['coupons'];

                }, function errorCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.error = $scope.loginResponse['error'];

                });
		    };

		    // get available coupons to purchase
		    $rootScope.submitGetAvailableCoupons = function () {
		        if ($rootScope.toRefreshBoughtCoupons == true) {
		            $http({
		                method: 'GET',
		                url: $rootScope.localHost + $rootScope.projectPath + 'customer/couponstobuy',
		            })
                    .then(function successCallback(response) {

                        $scope.loginResponse = response.data;
                        $scope.availableCoupons = $scope.loginResponse['coupons'];

                    }, function errorCallback(response) {

                        $scope.loginResponse = response.data;
                        $scope.error = $scope.loginResponse['error'];

                    });
		        }
		    };

		   // purchase coupon
		    $scope.purchaseCoupon = function (coupon) {

		        $http({
		            method: 'POST',
		            url: $rootScope.localHost + $rootScope.projectPath + 'customer',
		            headers: {
		                'Content-Type': 'application/json'
		            },
		            data: {
		                "id": coupon.id,
		                "title": coupon.title,
		                "startDate": coupon.startDate,
		                "endDate": coupon.endDate,
		                "amount": coupon.amount,
		                "type": coupon.type,
		                "message": coupon.message,
		                "price": coupon.price,
		                "image": "image"
		            }
		        })

                .then(function successCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.result = $scope.loginResponse['success'];
                    $scope.boughtCoupon();
                    $rootScope.toRefreshBoughtCoupons = true;
                    $rootScope.submitGetAvailableCoupons();
                    $window.scrollTo(0, 0);


                }, function errorCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.result = $scope.loginResponse['error'];
                    $scope.errorBoughtCoupon();
                    $window.scrollTo(0, 0);
                });
		    };

		    $scope.boughtCoupon = function () {

		        $scope.showBought = true;
		        $timeout(function () { $scope.showBought = false }, 1500);
		    };

		    $scope.errorBoughtCoupon = function () {
		        $scope.showErrorBought = true;
		        $timeout(function () { $scope.showErrorBought = false }, 1500);
		    };

		})
		
		// company page
		.controller('companyPage', function ($rootScope, $scope, $http, $timeout) {

		    // create coupon
            
		    $scope.submitCreateCoupon = function () {
                
		        if ($scope.title != null && $scope.amount != null && $scope.type != null
                    && $scope.price != null  && $scope.startDate != null
                    && $scope.endDate != null && $scope.message != null) {
                    
                
                     $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'company/upload',
		                file :  $scope.file
		            })
                    
                    .then(function successCallback(response) {

                    $scope.loginResponse = response.data;
                    $rootScope.urlImg = $scope.loginResponse['success'];
                    

                }, function errorCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.result = $scope.loginResponse['error'];
                    $scope.errorCouponCreate();

                })

		            $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'company',
		                data: {
		                    "title": $scope.title,
		                    "amount": $scope.amount,
		                    "type": $scope.type,
		                    "price": $scope.price,
		                    "image": $rootScope.urlImg,
		                    "startDate": $scope.startDate,
		                    "endDate": $scope.endDate,
		                    "message": $scope.message
		                }
		            })

                .then(function successCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.result = $scope.loginResponse['success'];
                    $scope.couponCreate();

                    $scope.title = null;
                    $scope.amount = null;
                    $scope.type = null;
                    $scope.price = null;
                    $scope.image = null;
                    $scope.startDate = null;
                    $scope.endDate = null;
                    $scope.message = null;

                }, function errorCallback(response) {

                    $scope.loginResponse = response.data;
                    $scope.result = $scope.loginResponse['error'];
                    $scope.errorCouponCreate();

                })} else {
		            $scope.result = "Fill in the form";
		            $scope.errorCouponCreate();
		        };
    

		        $timeout(function () { $scope.result = null }, informationShowTimeInMillisec);
		    }

		    $scope.couponCreate = function () {

		        $scope.showCreateCoupon = true;
		        $timeout(function () { $scope.showCreateCoupon = false }, 1500);
		    };

		    $scope.errorCouponCreate = function () {
		        $scope.showErrorCreateCoupon = true;
		        $timeout(function () { $scope.showErrorCreateCoupon = false }, 1500);
		    };


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
                    $scope.result = $scope.loginResponse['error'];
                    if ($scope.result == "no relevant coupons for that query") $rootScope.companyCoupons = [];
                    $scope.showErrorCoupons();

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
					    $scope.showCoupons();
					    $scope.submitGetCoupons();

					}, function errorCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['error'];
					    $scope.showErrorCoupons();

					});
		    }

		    $scope.updateCoupon = function (coupon, updatedEndDate) {

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
		                "endDate": updatedEndDate,
		                "message": coupon.message
		            }
		        })

					.then(function successCallback(response) {

					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['success'];
					    $scope.showCoupons();
					    $scope.submitGetCoupons();

					}, function errorCallback(response) {


					    $scope.loginResponse = response.data;
					    $scope.result = $scope.loginResponse['success'];
					    $scope.showErrorCoupons();
					});
		    }

		    $scope.searchByPrice = function (item) {
		        if ($scope.searchPrice == undefined) {
		            return true;
		        }
		        else {
		            if ($scope.searchPrice <= item.price) {

		                return true;
		            }
		            return false;
		        }

		    }

		    $scope.searchByAndDate = function (item) {
		        if ($scope.searchAndDate == undefined) {
		            return true;
		        }
		        else {
		            var date1 = new Date($scope.searchAndDate).getTime();
		            var date2 = new Date(item.endDate).getTime();
		            if (date1 <= date2) {

		                return true;
		            }
		            return false;
		        }

		    }

		    $rootScope.amountZero = function (item) {
		        return item.amount > 0 ? true : false;
		    }
            

		    $scope.showCoupons = function () {

		        $scope.showGetCoupons = true;
		        $timeout(function () { $scope.showGetCoupons = false }, 1500);
		    };

		    $scope.showErrorCoupons = function () {

		        $scope.showErrorGetCoupons = true;
		        $timeout(function () { $scope.showErrorGetCoupons = false }, 1500);
		    };
		  
			$rootScope.convertToDate = function (timeStamp) {
		        var newNum = timeStamp;
		        return new Date(newNum);
		    }

		    $rootScope.dateFormat = 'dd-MM-yyyy';

		})
		
		