var module = angular.module('ehe.common.services', []);


/**
 * ajax请求服务
 */
module.factory('$eheRequest', ['$q', '$rootScope', '$http', function ($q, $scope, $http)
  {

		function get(url, data, cache) {
		  
		  	// Return the promise if there's already a lookup in progress for this idValue
//		    if (cache[idValue] && cache[idValue].promise) {
//		    	return cache[idValue].promise;
//		    }
	
		    var requestPromise = $q.defer();
	
		    // We might already have the alias for given idValue
//		    if (cache[idValue] && cache[idValue].resolved) {
//		    	requestPromise.resolve(cache[idValue].name);
//		    }
	
		    // If not, then get the alias
//		    else {
		    	
		    	$http({
		    		'url': url,
		    		'method': 'POST',
//		    		'params': data,
		    		'data': data,
		    		'headers' : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    'transformRequest' : function(obj) {
                        var str = [];
                        for ( var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
		    	})
		    	.success(function(data){
			    	  	
	                requestPromise.resolve(data);
			    	  
		    	})
		    	.error(function(data,status){
		    		requestPromise.reject(new Error("request error"));
		    	});
		    	
//		      requestPromise.promise['finally'](function(){
//		    	  cache[idValue].promise = false;
//		      });
	
//		    }
	
			return requestPromise.promise;
	  	}
		
		
		function post(url, data, cache) {

			var requestPromise = $q.defer();
	
		    	$http({
		    		'url': url,
		    		'method': 'POST',
		    		'data': data,
		    		'headers' : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    'transformRequest' : function(obj) {
                        var str = [];
                        for ( var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
		    	})
		    	.success(function(data){
			    	  	
	                requestPromise.resolve(data);
			    	  
		    	})
		    	.error(function(data,status){
		    		requestPromise.reject(new Error("request error"));
		    	});
	
			return requestPromise.promise;
	  	}
		
		return {
			get: get,
			post: post
	  	};
  
  }]);


/**
 * 别名服务，根据id查找相应的名称说明
 */
//module.factory('eheAliasService', ['$q', '$rootScope', '$http',
//                                 function ($q, $scope, $http)
//{
//	// Alias caching
//	var personAliases = {};
//	var userLoginPersonAliases = {};
//	var statusAliases = {};
//	var enumAliases = {};
//	var positionAliases = {};
//	var partyGroupAliases = {};
//  
//  	function findNameByEntityId(entityName, nameField, idField, idValue, cacheAliases, resolvedIfNull) {
//  		
//  		if(resolvedIfNull == undefined) {
//  			resolvedIfNull = true;
//  		}
//  		
//	  	// Return the promise if there's already a lookup in progress for this idValue
//	    if (cacheAliases[idValue] && cacheAliases[idValue].promise) {
//	    	return cacheAliases[idValue].promise;
//	    }
//
//	    var aliasPromise = $q.defer();
//
//	    // We might already have the alias for given idValue
//	    if (cacheAliases[idValue] && cacheAliases[idValue].resolved) {
//	    	aliasPromise.resolve(cacheAliases[idValue].name);
//	    }
//
//	    // If not, then get the alias
//	    else {
//	    	
//	    	var params = {
//	    		'entityName': entityName,
//	    		'nameField': nameField,
//	    		'idField': idField,
//	    		'id': idValue
//	    	};
//	    	
//	    	//TODO 使用eheRequest
//	    	$http({
//		        url: '/ehecommon/control/getNameByIdAjax',
//		        method: 'POST',
//	    		data: params,
//	    		headers : {
//                    'Content-Type' : 'application/x-www-form-urlencoded'
//                },
//                transformRequest : function(obj) {
//                    var str = [];
//                    for ( var p in obj)
//                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                    return str.join("&");
//                },
//		     })
//		      .success(function(data){
//		    	  	
//		    	  	var name = data.name;
//		    	  
//		    	  	cacheAliases[idValue] = {
//	    	  			resolved: true
//	                };
//		    	  	
//		    	  	cacheAliases[idValue].name = name;
//	                aliasPromise.resolve(name);
//		    	  
//		      })
//		      .error(function(data,status){
//		    	  aliasPromise.reject(new Error("No name found"));
//		      });
//	    	
//
//	      // Because finally is a reserved word in JavaScript and reserved keywords
//	      // are not supported as property names by ES3, we're invoking the
//	      // method like aliasPromise['finally'](callback) to make our code
//	      // IE8 and Android 2.x compatible.
//	      aliasPromise.promise['finally'](function(){
//	    	  cacheAliases[idValue].promise = false;
//	      });
//
//	      cacheAliases[idValue] = {
//			  promise: aliasPromise.promise
//	      };
//
//	    }
//
//		return aliasPromise.promise;
//  	}
//  
//  
//  
//  	function getPersonNameForPartyId(partyId) {
//	  
//  		return findNameByEntityId('Person', 'firstName', 'partyId', partyId, personAliases);
//	  
//  	}
//  	
//  	
//  	function getPersonNameForUserLoginId(userLoginId) {
//  	  
//  		return findNameByEntityId('PartyAndUserLoginAndPerson', 'firstName', 'userLoginId', userLoginId, userLoginPersonAliases);
//	  
//  	}
//  	
//  	
//  	function getDescriptionForStatusId(statusId) {
//    	  
//  		return findNameByEntityId('StatusItem', 'description', 'statusId', statusId, statusAliases);
//	  
//  	}
//  	
//  	function getDescriptionForEnumId(enumId) {
//  	  
//  		return findNameByEntityId('Enumeration', 'description', 'enumId', enumId, enumAliases);
//	  
//  	}
//  	
//  	function getPositionNameForPositionId(positionId) {
//    	  
//  		return findNameByEntityId('EmplPosition', 'emplPositionName', 'emplPositionId', positionId, positionAliases);
//	  
//  	}
//  	
//  	function getGroupNameForPartyId(partyId) {
//  		return findNameByEntityId('PartyGroup', 'groupName', 'partyId', partyId, partyGroupAliases);
//  	}
//  
//  	return {
//	  	getPersonNameForPartyId: getPersonNameForPartyId,
//	  	getPersonNameForUserLoginId: getPersonNameForUserLoginId,
//	  	getDescriptionForStatusId: getDescriptionForStatusId,
//	  	getDescriptionForEnumId: getDescriptionForEnumId,
//	  	getPositionNameForPositionId: getPositionNameForPositionId,
//	  	getGroupNameForPartyId: getGroupNameForPartyId,
//  	};
//  	
//  	
//}]);
//
//
//
///**
// * 
// */
//module.factory('$eheSelectOption', ['$q', '$rootScope', '$http',
//                                 function ($q, $scope, $http)
//{
//	// Alias caching
//	var enumOptionsCache = {};
//	var statusOptionsCache = {};
//  
//  	function getSelectOptions(entityName, typeField, type, sortOrder, cacheOptions) {
//	  
//	  	// Return the promise if there's already a lookup in progress for this type
//	    if (cacheOptions[type] && cacheOptions[type].promise) {
//	    	return cacheOptions[type].promise;
//	    }
//
//	    var optionPromise = $q.defer();
//
//	    // We might already have the alias for given type
//	    if (cacheOptions[type] && cacheOptions[type].resolved) {
//	    	optionPromise.resolve(cacheOptions[type].options);
//	    }
//
//	    // If not, then get the alias
//	    else {
//	    	
//	    	var params = {
//	    		'entityName': entityName,
//	    		'typeField': typeField,
//	    		'type': type,
//	    		'sortOrder': sortOrder
//	    	};
//	    	
//	    	$http({
//		        url: '/ehecommon/control/getSelectOptionsAjax',
//		        method: 'POST',
//	    		data: params,
//	    		headers : {
//                    'Content-Type' : 'application/x-www-form-urlencoded'
//                },
//                transformRequest : function(obj) {
//                    var str = [];
//                    for ( var p in obj)
//                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                    return str.join("&");
//                },
//		     })
//		      .success(function(data){
//		    	  	
//		    	  	var options = data.options;
//		    	  
//		    	  	cacheOptions[type] = {
//	    	  			resolved: true
//	                };
//		    	  	
//		    	  	cacheOptions[type].options = options;
//	                optionPromise.resolve(options);
//		    	  
//		      })
//		      .error(function(data,status){
//		    	  optionPromise.reject(new Error("No name found"));
//		      });
//	    	
//
//	      // Because finally is a reserved word in JavaScript and reserved keywords
//	      // are not supported as property names by ES3, we're invoking the
//	      // method like optionPromise['finally'](callback) to make our code
//	      // IE8 and Android 2.x compatible.
//	      optionPromise.promise['finally'](function(){
//	    	  cacheOptions[type].promise = false;
//	      });
//
//	      cacheOptions[type] = {
//			  promise: optionPromise.promise
//	      };
//
//	    }
//
//		return optionPromise.promise;
//  	}
//  
//  
//  
//  	function getEnumOptionsForType(enumTypeId) {
//	  
//  		return getSelectOptions('Enumeration', 'enumTypeId', enumTypeId, 'sequenceId', enumOptionsCache);
//	  
//  	}
//  	
//  	
//  	function getStatusOptionsForType(statusTypeId) {
//  	  
//  		return getSelectOptions('StatusItem', 'statusTypeId', statusTypeId, 'sequenceId', statusOptionsCache);
//	  
//  	}
//  	
//  	
//  
//  	return {
//  		getEnumOptionsForType: getEnumOptionsForType,
//  		getStatusOptionsForType: getStatusOptionsForType,
//  	};
//  	
//  	
//}]);
//
//
//
//
///**
// * 对话框服务
// */
//module.factory('$eheDialog', ['$rootScope', '$modal', '$timeout', '$log', '$gridCache', '$eheRequest',
//                                   function ($scope, $modal, $timeout, $log, $gridCache, $eheRequest)
//  {
//    
//		
//		/**
//		 * 提醒对话框
//		 * TODO 支持模板内容
//		 */
//		var alert = function(opts) {
//			
//			var dialogOptions = {
//				templateUrl: 'alertDialog.html',
//				width: opts.width || '300',
//				height: opts.height || '180',
//				resolve: {
//					opts: function () {
//				    	return opts || {};
//			        },
//		        },
//		        controller: function ($scope, $modalInstance, opts) {
//		        	
//		        	if(typeof(opts) == "string") {
//						opts = {
//							text: opts
//						}
//					}
//		        	
//		        	$scope.title = opts.title || '警告';
////		        	$scope.icon = icon;
//		        	$scope.text = opts.text || '警告';
//		        	
//		        	$scope.ok = function () {
//		        		$modalInstance.close();
//		        	};
//		        	
//		        	$scope.cancel = function () {
//		        		$modalInstance.close();
//		        	};
//		        	
//				},
//			}
//			
//			var modalInstance = $modal.open(dialogOptions);
//			
//		}
//		
//		
//		/**
//		 * 确认对话框
//		 * TODO 支持模板内容
//		 */
//		var confirm = function(opts) {
//			
//			var dialogOptions = {
//				templateUrl: 'confirmDialog.html',
//				width: opts.width || '300',
//				height: opts.height || '180',
//				resolve: {
//					opts: function () {
//				    	return opts || {};
//			        },
//		        },
//				controller: function ($scope, $modalInstance, opts) {
//					
//					if(typeof(opts) == "string") {
//						opts = {
//							text: opts
//						}
//					}
//					
//					$scope.title = opts.title || '请确认';
////		        	$scope.icon = icon;
//		        	$scope.text = opts.text || '你确定吗？';
//		        	
//					$scope.ok = function () {
//						$modalInstance.close(true);
//					};
//				
//					$scope.cancel = function () {
//						$modalInstance.close(false);
//					};
//					
//				},
//			}
//			
//			var modalInstance = $modal.open(dialogOptions);
//			
//			return modalInstance.result;
//			
////			modalInstance.result.then(function (result) {
//				
////		    });
//			
//		}
//		
//		
//		/**
//		 * 表单提交对话框
//		 * TODO 支持模板内容
//		 */
//		var openFormDialog = function(opts) {
//			
//			
//			var dialogOptions = {
//				templateUrl: opts.templateUrl || 'formDialog.html',
//				width: opts.width || '360',
//				height: opts.height || '280',
//				resolve: {
//					opts: function () {
//				    	return opts || {};
//			        },
//		        },
//				controller: function ($scope, $modalInstance, opts) {
//					
//					$scope.title = opts.title || '编辑';
//					
//					$scope.url = opts.url || '';
//					
//					$scope.master = opts.formData || {};		//初始值
//					
//					$scope.formData = angular.copy($scope.master);
//					$scope.params = opts.params;
//					$scope.canSubmit = true;
//					
//					
//					$scope.ok = function () {
//						
//						//TODO validate
////						if(form.validate)
//						var validate = true;
//						var submit = true;
//						
//						if(opts.beforeSubmit) {
//							submit = opts.beforeSubmit($scope);
//						}
//						
//						if($scope.canSubmit && submit) {
//							
//							if($scope.url) {
//								var postData = angular.extend({}, $scope.params, $scope.formData);
//					    		
//					    		$eheRequest.get(
//					    			$scope.url,
//					    			postData
//					    		)
//					    		.then(function(result) {
////					    			alertFunction(result);
//					    			//TODO
////					    			if(issucces(result)) {
//					    				$modalInstance.close(result);
////					    			}
//					    			
//					    		});
//							}else {		//local
//								
//								$modalInstance.close($scope.formData);
//								var aaa = "rrrr";
//								
//							}
//							
//							
//							
//							
//						}
//						
//					};
//				
//					$scope.cancel = function () {
//						$modalInstance.close('cancel');
//					};
//					
//				},
//			}
//			
//			var modalInstance = $modal.open(dialogOptions);
//			
//			return modalInstance.result;
//			
//			
//		}
//		
//		
//		
//		/**
//		 * 查询选择对话框
//		 * var defaults = {
//			title : "",
//			url : "",
//			entityName : "",
//			fields : [],
//			colNames : [],
//			colModel : [],
//			searchFields : [],
//			initCondition : [],
//			multiselect : false,
//		};
//		 * 
//		 */
//		var openSearchDialog = function(id, opts) {
//			
//			var defaults = {
//				title : "请选择",
//				size: "",
//				url : "",
//				postData: {},
//				entityName : "",
//				selectFields: [],		//selectFields: ["memberId", "firstName", "partyId"]
//				initCondition : [],		//[{field:"enabled",value:"Y"}, {field:"roleTypeId",value:roleTypeId}]
//				
////				fields: [],		//fields:[{label:"工号",field:"memberId"},{label:"姓名",field:"firstName"},{label:"partyId",field:"partyId",hidden:true}],	//searchTemplate
//				colModel: [],		//colTemplate	//[{field:'partyId',name:'partyId'}]		//width:80,index:'partyId',hidden:true, align:"center",filter:""
//				searchFields : [],		//[{type:"string",label:"工号",field:"memberId"},{type:"string",label:"姓名",field:"firstName"}],
////				colNames : [],			//headTemplate
//				
//				multiselect : false,
//			};
//			
//			opts = angular.extend(defaults, opts);
//			
//			
//			
//			
//			var dialogOptions = {
//				templateUrl: 'searchDialog.html',
//				width: opts.width || '543',
//				height: opts.height || '490',
//				resolve: {
//					opts: function () {
//				    	return opts || {};
//			        },
//		        },
//				controller: function ($scope, $modalInstance, opts) {
//					
//					$scope.title = opts.title || '请选择';
////			        	$scope.icon = icon;
//					
//					$scope.gridId = id + "_grid";
//					$scope.gridUrl = opts.url;
//					
//					
//					$scope.resolveData = {
//						colModel: opts.colModel
//					}
//					$scope.multiSelect = opts.multiSelect;
//					
//					var initSearchFields = angular.copy(opts.searchFields);	//重置时恢复
//					$scope.searchFields = opts.searchFields;
//					
//					var getPostData = function() {
//						
//						var initCondition = opts.initCondition;
//						
//						var entityPostData = {};
//						if(opts.entityName) {
//							$scope.gridUrl = "/ehecommon/control/getEntityFields2";
//							
//							var selectFields = opts.selectFields;	//[],'SELECT_ALL'
//							
//							if(!selectFields || selectFields.length == 0) {
//								selectFields = [];
//								if(opts.colModel && opts.colModel instanceof Array) {
//									for(var i in opts.colModel) {
//										selectFields.push(opts.colModel[i].field);
//									}
//								}
//							}
//							
//							
//							var searchCondition = [];
//							angular.forEach($scope.searchFields, function(field) {
//								if(field.value != undefined && field.value != '') {
//									searchCondition.push({
//										field: field.field,
//										value: field.value,
//										operator: 'LIKE'
//									});
//								}
//							});
//							searchCondition = searchCondition.concat(initCondition);
//							
//							entityPostData = {
//								entityName: opts.entityName,
//								selectFields: selectFields.toString(),
//								initCondition: angular.toJson(searchCondition)
//							};
//							
//						}else {
//							
//							var initCondition = opts.initCondition;
//							var searchCondition = [];
//							angular.forEach($scope.searchFields, function(field) {
//								if(field.value != undefined && field.value != '') {
//									entityPostData[field.field] = field.value;
//								}
//							});
//						}
//						
//						
//						return angular.extend({}, entityPostData, opts.postData);
//					}
//					
//					$scope.postData = getPostData();
//					
//					$scope.ok = function () {
//						var selected = $gridCache.get($scope.gridId).selarrrowData;
//						
//						if(selected.length < 1) {
//							alert("请先选择后点击确定！");
//						}else {
//							$modalInstance.close(selected);
//						}
//					};
//					
//					$scope.ondblClickRow = function(grid) {
//						
//						if(!grid.multiSelect) {
//							var selected = grid.selarrrowData;
//							$modalInstance.close(selected);
//						}
//					};
//					
//					$scope.cancel = function () {
//						$modalInstance.dismiss("cancel");
//					};
//					
//					$scope.dialogSearchForm = function() {
//						$scope.postData = getPostData();
////						alert($scope.postData);
//					}
//					
//					$scope.resetDialogSearchForm = function() {
//						$scope.searchFields = initSearchFields;
//						$scope.postData = getPostData();
//					}
//					
//				},
//			}
//			
//			var modalInstance = $modal.open(dialogOptions);
//			
//			return modalInstance.result;
//			
//			
//		}
//		
//		
//		
//		
//		
//		/**
//		 * id: '',
//		 * url: '',
//		 * initially_open: [],
//		 * initially_select: [],
//		 * 
//		 * 
//		 */
//		var openTreeSelectDialog = function(opts) {
//			
//			
//			var dialogOptions = {
//				templateUrl: 'treeSelectDialog.html',
//				width: opts.width || '300',
//				height: opts.height || '280',
//				resolve: {
//					opts: function () {
//				    	return opts || {};
//			        },
//		        },
//				controller: function ($scope, $modalInstance, opts) {
//					
//					$scope.title = opts.title || '请选择';
//					
//					$scope.treeId = "selectDialog" + "_tree";
//					$scope.treeUrl = opts.url;
//					$scope.initially_open = opts.initially_open || [];
//					$scope.initially_select = opts.initially_select || [];
////					$scope.selectedNodeId = '';
//					
//					$timeout(function() {
//						jQuery("#" + $scope.treeId).jstree({
//					        "core":{"initially_open": $scope.initially_open},
//					        "ui" : { "initially_select" : $scope.initially_select},
//					        "plugins":["themes","json_data", "ui"],
//					        "json_data" : {
//					            "ajax" : {
//					            	"type": "POST",  
//					                "url" : $scope.treeUrl, //"/eheoa/control/createInstitutionTreeAjax",
//					                "data" : function (n) {
//					                    return { id : n.attr ? n.attr("id") : "-1" };
//					                }
//					            },
//					            progressive_render:true
//					        },
//					        "themes":{
//					            "theme":"classic",
//					            "dots":true,
//					            "icons":false
//					        }
//					    })
////					    .bind("select_node.jstree", function (e, data) { 
////					    	$scope.selectedNodeId = data.rslt.obj.attr("id");
////
////					    });
//					});
//					
//					
//					
//					
//					
//					$scope.ok = function () {
//						
//						
//						var tree = $.jstree._reference ("#" + $scope.treeId);
//						var node = tree.get_selected();
//						if (node.length > 0) {
//							var data = {}
//							var dataList = [data];
//							for(var i = 0; i < node[0].attributes.length; i++) {
//								var name = node[0].attributes[i].name;
//								var value = node[0].attributes[i].value;
//								dataList[0][name] = value;
//							}
//							$modalInstance.close(dataList);
//						}else{
//							alert("请先选择后点击确定！");
//							return;
//						}
//						
//					};
//					
//					
//					$scope.cancel = function () {
//						$modalInstance.dismiss("cancel");
//					};
//					
//					
//				},
//			}
//			
//			var modalInstance = $modal.open(dialogOptions);
//			
//			return modalInstance.result;
//			
//			
//		}
//		
//		
//		
//		//TODO 
//		var openUploadDialog = function(opts) {
//			
//			
//			var dialogOptions = {
//				templateUrl: 'treeSelectDialog.html',
//				width: opts.width || '300',
//				height: opts.height || '280',
//				resolve: {
//					opts: function () {
//				    	return opts || {};
//			        },
//		        },
//				controller: function ($scope, $modalInstance, opts) {
//					
//					$scope.title = opts.title || '请选择';
//					
//					$scope.treeId = "selectDialog" + "_tree";
//					$scope.treeUrl = opts.url;
//					$scope.initially_open = opts.initially_open || [];
//					$scope.initially_select = opts.initially_select || [];
////					$scope.selectedNodeId = '';
//					
//					$timeout(function() {
//						jQuery("#" + $scope.treeId).jstree({
//					        "core":{"initially_open": $scope.initially_open},
//					        "ui" : { "initially_select" : $scope.initially_select},
//					        "plugins":["themes","json_data", "ui"],
//					        "json_data" : {
//					            "ajax" : {
//					            	"type": "POST",  
//					                "url" : $scope.treeUrl, //"/eheoa/control/createInstitutionTreeAjax",
//					                "data" : function (n) {
//					                    return { id : n.attr ? n.attr("id") : "-1" };
//					                }
//					            },
//					            progressive_render:true
//					        },
//					        "themes":{
//					            "theme":"classic",
//					            "dots":true,
//					            "icons":false
//					        }
//					    })
////					    .bind("select_node.jstree", function (e, data) { 
////					    	$scope.selectedNodeId = data.rslt.obj.attr("id");
////
////					    });
//					});
//					
//					
//					
//					
//					
//					$scope.ok = function () {
//						
//						
//						var tree = $.jstree._reference ("#" + $scope.treeId);
//						var node = tree.get_selected();
//						if (node.length > 0) {
//							var data = {}
//							var dataList = [data];
//							for(var i = 0; i < node[0].attributes.length; i++) {
//								var name = node[0].attributes[i].name;
//								var value = node[0].attributes[i].value;
//								dataList[0][name] = value;
//							}
//							$modalInstance.close(dataList);
//						}else{
//							alert("请先选择后点击确定！");
//							return;
//						}
//						
//					};
//					
//					
//					$scope.cancel = function () {
//						$modalInstance.dismiss("cancel");
//					};
//					
//					
//				},
//			}
//			
//			var modalInstance = $modal.open(dialogOptions);
//			
//			return modalInstance.result;
//			
//			
//		}
//		
//		
//		
//    	return {
//    		alert: alert,
//    		confirm: confirm,
//    		openSearchDialog: openSearchDialog,
//    		openFormDialog: openFormDialog,
//    		openTreeSelectDialog: openTreeSelectDialog,
//    		openUploadDialog: openUploadDialog,
//    	};
//    	
//    	
//  }]);
//
//
//
//
//
//
//
//
//
///**
// * 权限服务
// */
//
///**
// * 别名服务，根据id查找相应的名称说明
// */
//module.factory('$eheSecurity', ['$q', '$rootScope', '$http', function ($q, $scope, $http)
//{
//	// Alias caching
//	var permissionCache = {};
//	
//	function getPermission(permission, cache) {
//		  
//	  	// Return the promise if there's already a lookup in progress for this permission
//	    if (cache[permission] && cache[permission].promise) {
//	    	return cache[permission].promise;
//	    }
//
//	    var permissionPromise = $q.defer();
//
//	    // We might already have the alias for given permission
//	    if (cache[permission] && cache[permission].resolved) {
//	    	permissionPromise.resolve(cache[permission].has);
//	    }
//
//	    // If not, then get the alias
//	    else {
//	    	
//	    	var params = {
//	    		'permission': permission,
//	    	};
//	    	
//	    	//TODO 使用eheRequest
//	    	$http({
//		        url: '/ehecommon/control/hasPermissionAjax',
//		        method: 'POST',
//	    		data: params,
//	    		headers : {
//                    'Content-Type' : 'application/x-www-form-urlencoded'
//                },
//                transformRequest : function(obj) {
//                    var str = [];
//                    for ( var p in obj)
//                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                    return str.join("&");
//                },
//		     })
//		      .success(function(data){
//		    	  	
//		    	  	var hasPermission = data;
//		    	  
//		    	  	cache[permission] = {
//	    	  			resolved: true
//	                };
//		    	  	
//		    	  	cache[permission].has = hasPermission;
//	                permissionPromise.resolve(hasPermission);
//		    	  
//		      })
//		      .error(function(data,status){
//		    	  permissionPromise.reject(new Error("No name found"));
//		      });
//	    	
//
//	      // Because finally is a reserved word in JavaScript and reserved keywords
//	      // are not supported as property names by ES3, we're invoking the
//	      // method like permissionPromise['finally'](callback) to make our code
//	      // IE8 and Android 2.x compatible.
//	      permissionPromise.promise['finally'](function(){
//	    	  cache[permission].promise = false;
//	      });
//
//	      cache[permission] = {
//			  promise: permissionPromise.promise
//	      };
//
//	    }
//
//		return permissionPromise.promise;
//  	}
//	
//	
//	function hasPermission(permission, cache) {
//		
//		getPermission(permission, cache).then(function(perm) {
//			if(perm) {
//				return true;
//			}
//			return false;
//		});
//		
//	}
//  
//  	function hasEmpUpdatePermission() {
//  		
//  		if(hasPermission("EMP_ADMIN", permissionCache)) {
//  			return true;
//  		}
//  		
//  		return hasPermission("EMP_UPDATE", permissionCache);
//  	}
//  	
//  	function hasEmpCreatePermission() {
//  		
//  		if(hasPermission("EMP_ADMIN", permissionCache)) {
//  			return true;
//  		}
//  		
//  		return hasPermission("EMP_CREATE", permissionCache);
//  	}
//  	
//  	
////  	function hasEmpUpdatePermission() {
////  		return hasPermission("EMP_UPDATE", permissionCache);
////  	}
////  	
////  	function hasEmpUpdatePermission() {
////  		return hasPermission("EMP_UPDATE", permissionCache);
////  	}
//  	
//  
//  	return {
//  		hasEmpUpdatePermission: hasEmpUpdatePermission,
//  		hasEmpCreatePermission: hasEmpCreatePermission,
////  		hasEmpUpdatePermission: hasEmpUpdatePermission,
////  		hasEmpUpdatePermission: hasEmpUpdatePermission,
////  		hasEmpUpdatePermission: hasEmpUpdatePermission,
////  		hasEmpUpdatePermission: hasEmpUpdatePermission,
//  	};
//  	
//  	
//}]);
//
//
//
//
//
//
//
///**
// * 用户公共信息
// */
//module.factory('$commonInfo', ['$q', '$rootScope', '$http', function ($q, $scope, $http)
//{
//	// Alias caching
//	var userLoginInfoCache = {};
//	
//  	function getInfo(userLoginInfoCache) {
//  		
//	  	// Return the promise if there's already a lookup in progress for this idValue
//	    if (userLoginInfoCache && userLoginInfoCache.promise) {
//	    	return userLoginInfoCache.promise;
//	    }
//
//	    var userLoginInfoPromise = $q.defer();
//
//	    // We might already have the alias for given idValue
//	    if (userLoginInfoCache && userLoginInfoCache.resolved) {
//	    	userLoginInfoPromise.resolve(userLoginInfoCache.userLoginInfo);
//	    }
//
//	    // If not, then get the alias
//	    else {
//	    	
//	    	//TODO 使用eheRequest
//	    	$http({
//		        url: '/ehecommon/control/getUserInfoAjax',
//		        method: 'POST',
//	    		headers : {
//                    'Content-Type' : 'application/x-www-form-urlencoded'
//                },
//                transformRequest : function(obj) {
//                    var str = [];
//                    for ( var p in obj)
//                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                    return str.join("&");
//                },
//		     })
//		      .success(function(data){
//		    	  	
//		    	  	var userLoginInfo = data.userInfo;
//		    	  
//		    	  	userLoginInfoCache = {
//	    	  			resolved: true
//	                };
//		    	  	
//		    	  	userLoginInfoCache.userLoginInfo = userLoginInfo;
//	                userLoginInfoPromise.resolve(userLoginInfo);
//		    	  
//		      })
//		      .error(function(data,status){
//		    	  userLoginInfoPromise.reject(new Error("No name found"));
//		      });
//	    	
//
//	      // Because finally is a reserved word in JavaScript and reserved keywords
//	      // are not supported as property names by ES3, we're invoking the
//	      // method like userLoginInfoPromise['finally'](callback) to make our code
//	      // IE8 and Android 2.x compatible.
//	      userLoginInfoPromise.promise['finally'](function(){
//	    	  userLoginInfoCache.promise = false;
//	      });
//
//	      userLoginInfoCache = {
//			  promise: userLoginInfoPromise.promise
//	      };
//
//	    }
//
//		return userLoginInfoPromise.promise;
//  	}
//  
//  	
//  	function getUserLoginInfo() {
//  		return getInfo(userLoginInfoCache);
//  	}
//  	
//  	var commonInfo = {
//  		userLoginInfo: {},
//  	};
//  	
//  	getInfo(userLoginInfoCache).then(function(result) {
//  		commonInfo.userLoginInfo = result;
//  	});
//  	
//  
//  
//  	return commonInfo;
//  	
//  	
//}]);




