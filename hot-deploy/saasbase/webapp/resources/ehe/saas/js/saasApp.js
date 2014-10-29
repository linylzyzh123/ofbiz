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
    
    
    $scope.quotaDocument={
        quotaHead: {
            docId: '123124125',
            orgName: '东易日盛',
            quotaName: '工程报价单',
            quotaType: '工程预算',
            projectCode: '1161113120060',
            projectName: '无锡市太湖',
            revisionCode: '1.0.1',
            createdBy: '',
            createdTimestamp: '',
            updatedBy: '',
            updatedTimestamp: '',
            status: '草稿',

            approvedBy: '',
            approvedTimestamp: '',
            designerSignature: '',
            accountSignature: '',
            approverSignature: '',

            uom: '',
            totalPrice: '12312',
        },

        subProjects: [{                           
            id: '',
            projectType: 'ROOMS',                   //ROOMS、CIVIL_WORKS、OTHER_PROJECT
            name: '房间',                       //房间、土建、其他
            description: '',
            rooms: [{                            //部位
                    id: 'R001',
                    type: 'room',
                    name: '主卧',
                    description: '',
                    billItems: [{                //清单项目
                        id: '',
                        itemName: '主卧墙面防潮',
                        quantity: '20',
                        quantityUomId: '',
                        quantityUom: '平方米',
                        unitPrice: '100',
                        totalPrice: '2000',
                        rulesDescription: '无',   //计算规则
                        processDescription: '无', //工艺说明
                    },{
                        id: '',
                        itemName: '主卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    }]
                },{
                    id: 'R002',
                    type: 'room',
                    name: '客厅',
                    description: '',
                    billItems: [{                //清单项目
                        id: '',
                        itemName: '客厅墙面防潮',
                        quantity: '20',
                        quantityUomId: '',
                        quantityUom: '平方米',
                        unitPrice: '100',
                        totalPrice: '2000',
                        rulesDescription: '无',   //计算规则
                        processDescription: '无', //工艺说明
                    },{
                        id: '',
                        itemName: '客厅楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    }]
                },{
                    id: 'R003',
                    type: 'room',
                    name: '次卧',
                    description: '',
                    billItems: [{                //清单项目
                        id: '',
                        itemName: '次卧墙面防潮',
                        quantity: '20',
                        quantityUomId: '',
                        quantityUom: '平方米',
                        unitPrice: '100',
                        totalPrice: '2000',
                        rulesDescription: '无',   //计算规则
                        processDescription: '无', //工艺说明
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    },{
                        id: '',
                        itemName: '次卧楼梯加宽',
                        quantity: '10',
                        quantityUomId: '',
                        quantityUom: '个',
                        unitPrice: '50',
                        totalPrice: '1000',
                        rulesDescription: '2333',           
                        processDescription: '2333',         
                    }]
                }]
    	}],

        rateSet: {                    //费率设置
            profitRate: 0.5,        //利润率
            managementFee: 12,        //管理费
            taxRate: 0.3,                //税率
        },


    };
    
    $scope.currentRoom = $scope.quotaDocument.subProjects[0].rooms[0];
    
    $scope.chooseRoom = function(room) {
    	$scope.currentRoom = room;
    }
    
    /**
     * 新增清单项目
     */
    $scope.addBillItem = function(room, quota) {
    	
    	var item = {};
    	item.id = '12124';
    	item.itemName = quota.name;
    	item.quantity ='0',
    	item.quantityUom = '个',
    	item.unitPrice ='0',
    	item.totalPrice ='0',
    	item.rulesDescription ='无',
    	item.processDescription ='无',
     	room.billItems.push(item);
    	
    };
    
    $scope.deleteBillItem = function(item) {
    	
    }
    
    $scope.updateBillItem = function(item) {
    	
    }
    
    
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



