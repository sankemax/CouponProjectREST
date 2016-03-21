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
                    pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,10})\.([a-z]{1,6}(?:\.[a-z]{1})?)$/i;
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
		                data: {
                            "id" : company.id, 
                            "name": company.name, 
                            "pass": company.pass, 
                            "email": company.email 
                        }
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

            $rootScope.imageId = [];
            $rootScope.largeImageId = [];

            // open in new window
            $rootScope.openInNewWindow = function(index) {
                var win = $window.open('', 'image', '_blank, width=600, height=600');
                $(win.document.body).html($.parseHTML("<img src=\"" + $rootScope.largeImageId[index] + "\" \\>")); 
            };

            // download picture
            $rootScope.showPicture = function getPic(clientType, coupon, original, index) {
                
                var imgUrl = $rootScope.localHost + $rootScope.projectPath + 'imageservice';
                var imgParams = 
                            '?coupname=' + coupon.title +   
                            '&imagename=' + coupon.image +
                            '&original=' + original + 
                            '&type=' + clientType;
                
                $http({
                        method: 'GET',
                        url: imgUrl + imgParams,
                        processData: false 
                }).then(function success(response) {
                    
                    if (original == 'true') {
                        $rootScope.largeImageId[index] = response.data["success"];
                        $scope.openInNewWindow(index);
                    } else {
                        $rootScope.imageId[index] = response.data["success"];
                    }
                    
                },function error(response) {
                    $rootScope.imageId[index] = response.data["error"];  
                });
            }

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
                if ($rootScope.toRefreshBoughtCoupons == true) {
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
                    $rootScope.toRefreshBoughtCoupons = false;
                }
            };

		    // get available coupons to purchase
		    $rootScope.submitGetAvailableCoupons = function () {
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
                        $scope.availableCoupons = null;

                    });
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
                
		        if ($scope.inputValidationCoupon($scope.title, 'text') && $scope.inputValidationCoupon($scope.message, 'message') &&
                    $scope.inputValidationCoupon($scope.amount, 'number') && $scope.inputValidationCoupon($scope.price, 'number') &&
                    $scope.inputValidationCoupon($scope.startDate, 'date') && $scope.inputValidationCoupon($scope.endDate, 'date') &&
                    $scope.inputValidationCoupon($scope.type, 'type') && $scope.inputValidationCoupon($('#chosenImage')[0].value, 'image') &&
                    $scope.inputValidationDate($scope.startDate, $scope.endDate)) {

		            $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'company',
		                data: {
		                    "title": $scope.title,
		                    "amount": $scope.amount,
		                    "type": $scope.type,
		                    "price": $scope.price,
		                    "image": $('#chosenImage')[0].files[0].name,
		                    "startDate": $scope.startDate,
		                    "endDate": $scope.endDate,
		                    "message": $scope.message
		                }
		            })

                .then(function successCallback(createResponse) {

                    $scope.loginResponse = createResponse.data;
                    $scope.result = $scope.loginResponse['success'];
                    
                    $scope.couponCreate();

                    $scope.amount = null;
                    $scope.type = null;
                    $scope.price = null;
                    $scope.image = null;
                    $scope.startDate = null;
                    $scope.endDate = null;
                    $scope.message = null;
                    $('#chosenImage')[0].value = null;
                    

                }, function errorCallback(createResponse) {

                    $scope.loginResponse = createResponse.data;
                    $scope.result = $scope.loginResponse['error'];
                    $scope.errorCouponCreate();

                })} else {
		           
		            $scope.errorCouponCreate();
		        };
    
                $scope.uploadImage();
                
		        $timeout(function () { $scope.result = null }, informationShowTimeInMillisec);
		    }
            
            $scope.uploadImage = function() {
                imageFile = $('#chosenImage')[0].files[0];
                var formData = new FormData();
                formData.append("file", imageFile);
                formData.append("couponTitle", $scope.title);
                    
                $.ajax({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + 'company/upload',
                        data : formData,
                        processData: false,
                        contentType: false,
                        success: function successCallback(uploadResponse) {
                            $scope.loginResponse = uploadResponse;
                            $scope.imgPath = $scope.loginResponse;
                            
                            $scope.title = null;
                            imageFile = null;
                        },
                   
                        error: function errorCallback(uploadResponse) {

                            $scope.loginResponse = uploadResponse;
                            $scope.result = $scope.loginResponse;
                            $scope.errorCouponCreate();

                        }});               
            }

            $scope.inputValidationCoupon = function (fieldValue, type) {
                var pattern;
                if (fieldValue == undefined && fieldValue == null) {
                    $scope.result = "Fill in the form";
                    
                    return false;
                }
                if (type == 'number') {
                    if (fieldValue > 0) return true;
                    $scope.result = "Invalid number";
                    return false;
                }
                if (type == 'text') {
                    pattern = /^[A-Za-z0-9 ]{5,20}$/;
                    if (pattern.test(fieldValue)) return true;
                    $scope.result = "Invalid title";
                    return false;
                }

                if (type == 'message') {
                    pattern = /^[A-Za-z0-9 ]{10,150}$/;
                    if (pattern.test(fieldValue)) return true;
                    $scope.result = "Invalid message";
                    return false;
                }
                
                return true;
              
            }

            $scope.inputValidationDate = function (startDate, endDate) {
                

                var sDate = new Date(startDate).getTime();
                var eDate = new Date(endDate).getTime();
        
                if (sDate >= eDate) {
                    $scope.result = "The start date after the end date";
                    return false;
                }
                if (eDate < new Date().getTime()) {
                    $scope.result = "Completion date before current date";
                    return false;
                }
                return true;

            }			
            	
            	

		    $scope.couponCreate = function () {

		        $scope.showCreateCoupon = true;
		        $timeout(function () { $scope.showCreateCoupon = false }, 3000);
		    };

		    $scope.errorCouponCreate = function () {
		        $scope.showErrorCreateCoupon = true;
		        $timeout(function () { $scope.showErrorCreateCoupon = false }, 3000);
		    };
		    	
		    $rootScope.submitGetCoupons = function (show) {
		    	
		        $http({
		            method: 'GET',
		            url: $rootScope.localHost + $rootScope.projectPath + 'company/coupons'
		        })

                .then(function successCallback(response) {

                    $scope.loginResponse = response.data;
                    $rootScope.companyCoupons = $scope.loginResponse['coupons'];

                }, function errorCallback(response) {

                    $scope.loginResponse = response.data;
                    if (show == true) $scope.result = $scope.loginResponse['error'];
                    if ($scope.loginResponse['error'] == "no relevant coupons for that query") $rootScope.companyCoupons = [];
                    if (show == true) $scope.showErrorCoupons();
               
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
					    $scope.submitGetCoupons(false);

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
					    $scope.submitGetCoupons(true);

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
		        $timeout(function () { $scope.showGetCoupons = false }, 3000);
		    };	

		    $scope.showErrorCoupons = function () {

		        $scope.showErrorGetCoupons = true;
		        $timeout(function () { $scope.showErrorGetCoupons = false }, 3000);
		    };
		  
			$rootScope.convertToDate = function (timeStamp) {
		        var newNum = timeStamp;
		        return new Date(newNum);
		    }

		    $rootScope.dateFormat = 'dd-MM-yyyy';

		})		