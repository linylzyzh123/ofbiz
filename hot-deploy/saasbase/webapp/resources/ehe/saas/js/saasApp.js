// Declare app level module which depends on filters, and services
angular.module('saasApp', [
//  'ngRoute',
	'eheMaterial',
//  'common.services',
//  'ehe.dialog',
//  'ehe.grid',
//  'ehe.common.directives',
//  'ehe.saas.filters',
//  'ehe.saas.services',
//  'ehe.saas.directives',
//  'ehe.saas.controllers'
])
.controller('MainController', function($scope, $log, $timeout, $window) {
//	$scope.$route = $route;
//    $scope.$location = $location;
//    $scope.$routeParams = $routeParams;
    
    $scope.angular = angular;
    $scope.$window = $window;
    
    
    //定额类别
    $scope.quotas = {
	   type:
	   [
	       {
				id: '001',
				name: '材料定额',
	       },
		   {
	    	   id: '002',
	    	   name: '机械定额',	
		   },
		   {
			   id: '003',
			   name: '人工定额',
		   },
	   ],
    }
    
    
    $scope.sousuo = function() {
    	alert($scope.dingeku.cailiao[0].name);
    }
    
    $scope.messages = [
        {
          face : '/img/list/60.jpeg',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : '/img/list/60.jpeg',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : '/img/list/60.jpeg',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : '/img/list/60.jpeg',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : '/img/list/60.jpeg',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : '/img/list/60.jpeg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
	      {
	          face : '/img/list/60.jpeg',
	          what: 'Brunch this weekend?',
	          who: 'Min Li Chan',
	          when: '3:08PM',
	          notes: " I'll be in your neighborhood doing errands"
	        }
    ];
    
    
    
    
    
    
    
})

//.config(['$routeProvider', function($routeProvider) {
//		
//	
//	$routeProvider.when('/changeDetail', { 
//		template: function(params) {						//TODO 改成templateUrl
//			return jQuery("#changeDetail").html();
//		},
//		controller: 'EmpChangeDetailCtrl'
//	});
//	
//	$routeProvider.when('/:sectionId/:tabId', {
//		template: function(params) {
////			return jQuery("#" + params.sectionId).html();
//			return jQuery("#basicInfo").html();
//		},
////		templateUrl: 'basicInfo.html',
//		controller: 'EmpChangesCtrl', 
//		resolve: {
//			sectionId: function($route) {
//				var sectionId = $route.current.params.sectionId;
//				$route.current.sectionId = sectionId;
//				return sectionId;
//			},
//			tabId: function($route) {
//				var tabId = $route.current.params.tabId;
//				$route.current.tabId = tabId;
//				return tabId;
//			}
//		}
//	});
//	
//	$routeProvider.otherwise({redirectTo: '/basicInfo/home'});
//	
////	  $routeProvider.when('/basicInfo/:tabId', {template: jQuery('#basicInfo').html(), controller: 'EmpChangesCtrl', sectionId: 'basicInfo', tabId: '{{tabId}}'});
//	  
////	  $routeProvider.when('/hires/:tabId', {template: jQuery('#hires').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/regularize/:tabId', {template: jQuery('#regularize').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/jobMobility/:tabId', {template: jQuery('#jobMobility').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/managerAdjustment/:tabId', {template: jQuery('#managerAdjustment').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/salaryAdjustment/:tabId', {template: jQuery('#salaryAdjustment').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/performanceEvaluation/:tabId', {template: jQuery('#performanceEvaluation').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/roleAdjustment/:tabId', {template: jQuery('#roleAdjustment').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/certificateChanges/:tabId', {template: jQuery('#certificateChanges').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.when('/employeeTurnover/:tabId', {template: jQuery('#employeeTurnover').html(), controller: 'EmpChangesCtrl'});
////	  $routeProvider.otherwise({redirectTo: '/basicInfo'});
//}]);



