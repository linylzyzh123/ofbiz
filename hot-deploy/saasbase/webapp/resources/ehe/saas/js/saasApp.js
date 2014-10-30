// Declare app level module which depends on filters, and services
angular.module('saasApp', [
//  'ngRoute',
	'eheMaterial',
//	'ehe.saas.bm.services',
//  'ehe.dialog',
//  'ehe.grid',
	'ehe.common.services',
//  'ehe.common.directives',
//  'ehe.saas.filters',
//  'ehe.saas.bm.services',
//  'ehe.saas.directives',
//  'ehe.saas.controllers'
])
.controller('MainController', function($scope, $log, $timeout, $window, $eheRequest) {
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
    
    
    
    $scope.quotaDocument = {
		quotaHead: {},
		subProjects: []
    };
    
//    $scope.currentRoom = $scope.quotaDocument.subProjects[0].rooms[0];
    
    
    
    $scope.chooseRoom = function(room) {
    	$scope.currentRoom = room;
    }
    
    /**
     * 新增清单项目
     */
    var itemId = 0;
    $scope.addBillItem = function(room, quota) {
    	itemId++;
    	var item = {};
    	item.id = 'B' + itemId;
    	item.name = quota.name;
    	item.quantity ='0';
    	item.quantityUom = '个';
    	item.unitPrice ='0';
    	item.totalPrice ='0';
    	item.rulesDescription ='无';
    	item.processDescription ='无';
     	room.billItems.push(item);
    	
    };

    /**
     * 新增room 目前currentSubProject未改
     */
    $scope.currentSubProject = $scope.quotaDocument.subProjects[0];
    $scope.addRoom = function(pj) {
    	var room = {};
    	room.id = 'R004';
    	room.type='room';
    	room.name='厨房';
    	room.description ='示例';
    	pj.rooms.push(room);
    };
    
    jQuery.contextMenu({
        selector: '.deractorRoom', 
        zIndex: 50,
        callback: function(key, options) {
        	if(key=="add"){
        		$scope.$apply(function() {
        			$scope.addRoom($scope.currentSubProject);
        		});
        	}
        },
        items: {
            "add": {name: "增加房间", icon: "edit"},
        }
	});
    
    
    
    
    
    
    /**
     * 删除清单项目
     */
    $scope.deleteBillItem = function(room,item) {    	
    	for(var i=0; i<room.billItems.length; i++){
            if(room.billItems[i].id==item.id){ 
            	room.billItems.splice(i,1);
            }
          }
    }
    /**
     * 编辑清单项目
     */
    $scope.updateBillItem = function(item) {
    	
    }
    
    /**
     * 读取预算书
     */
    $scope.loadBmDoc = function() {
    	$eheRequest.post('/saasbm/control/getBmDocumentAjax', {
    		docId: 123
    	}).then(function(result) {
    		
    		if(result && result.document && result.document.quotaHead) {
    			
				$scope.quotaDocument = result.document;
    			
    		}
    		
    	});
    	
    };
    
    /**
     * 保存预算书
     */
    $scope.saveBmDoc = function() {
    	
    	var isNew = true;
    	
    	var requestUrl = '/saasbm/control/updateBmDocumentAjax';
    	if(isNew) {
    		
    	}
    	
    };
    
    
    
    $scope.loadBmDoc();
    
    
    
    var BillItem = function(options) {
		
		this.clazz = 'BillItem';
		
		this.id = options.id || $idGenerator.genId();
		
		this.products = [];
		
		this.init(options);
		
	};
    
	BillItem.prototype = angular.extend(BillItem.prototype, {
		
		getJsonObject: function() {
			var jsonObj = {};
			
			var $this = this;
			angular.forEach($this, function(value, key) {
				
				
				if(!angular.isFunction(value) && key != 'clazz' && key != 'id' && key != 'products') {
					$this[key] = value;
				}
				
				
			});
		},
		init: function(options) {
			
			this.update(options);
		},
		update: function(options) {
			var $this = this;
			angular.forEach(options, function(value, key) {
				$this[key] = value;
			});
		},
		remove: function() {
			
		},
		addProduct: function(options) {
			
		},
		deleteProduct: function(product) {
			
		}
	});
	
    $scope.test = function() {
    	
    	
    	var aaa = new BillItem({
    		id: 1231241,
    		aa: 111,
    		bb: 222,
    		cc: 333
    	});
    	aaa.getJsonObject();
    }
    
    
    $timeout(function() {
    	jQuery(".deractorRoom").mouseover(function(){
        	jQuery(".subProject_op").attr("style","display:inline-flex");
    	});
        jQuery(".deractorRoom").mouseout(function(){
        	jQuery(".subProject_op").hide();
    	});
        jQuery(".rooms_op").mouseover(function(event){
        	jQuery(event.target).parent().children(".rooms_op_img").attr("style","display:inline-flex");
    	});
        jQuery(".rooms_op").mouseout(function(){
        	jQuery(".rooms_op_img").hide();
    	});
    }, 1000);

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



