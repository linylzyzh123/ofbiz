var module = angular.module('common.directives', []);



/********	layout 	********************************/

/**
 * headerPanel/frameSection
 * 包括一个header和panel
 */
module.directive('eheHeaderPanel', function() {
    return {
        restrict : 'EAC',
        link : function(scope, elm, attrs) {
            elm.addClass("content-section ui-widget ui-widget-content ui-corner-all");
        }
    };
})

/**
 * header/toolbar
 * 一般包含标题，按钮等内容
 */
module.directive('eheHeader', function() {
    return {
        restrict : 'EAC',
        link : function(scope, elm, attrs) {
            elm.addClass("sub-header ui-widget ui-widget-header ui-corner-all");
        }
    };
})

module.directive('ehePanelBody', function() {
    return {
        restrict : 'EAC',
        link : function(scope, elm, attrs) {
            elm.addClass("content-main");
        }
    };
})

/**
 * 可以包含多个tab和panel
 */
module.directive('eheTabs', function() {
    return {
        restrict : 'EAC',
        link : function(scope, elm, attrs) {
        	elm.addClass("content-section ui-tabs ui-widget ui-widget-content ui-corner-all")
        		.children("ul:eq(0)").addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
        }
    };
})

module.directive('eheTab', function() {
    return {
        restrict : 'EAC',
//        scope: {
//        	active: '&active',
//        },
        link : function(scope, elm, attrs) {
        	scope.active = scope.$eval(attrs.active);
        	
        	elm.addClass("ui-state-default ui-corner-top");
        	
        	
        	if(scope.active) {
        		elm.addClass("ui-tabs-selected ui-state-active");
        	}else {
        		elm.removeClass("ui-tabs-selected ui-state-active");
        	}
        	
//        	scope.$watch('active', function(value) {
//        		if(value) {
//            		elm.addClass("ui-tabs-selected ui-state-active");
//            	}else {
//            		elm.removeClass("ui-tabs-selected ui-state-active");
//            	}
//        	});
        	
        	elm.on('mouseover', function(event) {
        		elm.addClass("ui-state-hover");
        	}).on('mouseout', function(event) {
        		elm.removeClass("ui-state-hover");
        	});
        }
    };
})


/********	layout 	End ********************************/




/******** 	ui elements  ********************************/

module.directive('eheButton', function() {
    return {
        restrict : 'A',
        scope: {
        	icon: '@eheButton',
//    		text: '=text',
        },
        link : function(scope, elm, attrs) {
        	var text = true;
        	if(attrs.text && attrs.text == "false") {
        		text = false;
        	}
        	
            elm.button({
                text : text,
                icons : {
                    primary : scope.icon
                }
            });
        }

    }
});



//可以改用filter
module.directive('ehePersonName', ['eheAliasService', function (aliasService) {
  return {
    restrict: 'EA',
    scope: {
    		partyId: '=ehePartyId',
    		userLoginId: '=eheUserLoginId',
      },
      template: '{{personName}}',
      compile: function (element, attr, linker) {
        return function (scope, element, attr) {
        	
        	function update() {
	            if (!scope.partyId && !scope.userLoginId) {
	            	scope.personName = attr.ehePersonNameDefault ? attr.ehePersonNameDefault : '';
	              	return;
	            }
	            
	            if(scope.partyId) {
	            	var aliasPromise = aliasService.getPersonNameForPartyId(scope.partyId);
		            scope.personName = '';
		            aliasPromise.then(function (result) {
		            	scope.personName = result;
		            });
	            }
	            
	            if(scope.userLoginId) {
	            	var aliasPromise = aliasService.getPersonNameForUserLoginId(scope.userLoginId);
		            scope.personName = '';
		            aliasPromise.then(function (result) {
		            	scope.personName = result;
		            });
	            }
	            
        	}
        	scope.$watch('partyId', update);
        	scope.$watch('userLoginId', update);
        	update();
        };
      }
  };
}]);



//可以改用filter
module.directive('eheStatusDescription', ['eheAliasService', function (aliasService) {
	  return {
	    restrict: 'EA',
	    scope: {
	    		statusId: '=eheStatusId',
	      },
	      template: '{{status}}',
	      compile: function (element, attr, linker) {
	        return function (scope, element, attr) {
	        	
	        	function update() {
		            if (!scope.statusId) {
		            	scope.status = attr.eheStatusDefault ? attr.eheStatusDefault : '';
		            	return;
		            }
		            
		            if(scope.statusId) {
		            	var aliasPromise = aliasService.getDescriptionForStatusId(scope.statusId);
			            scope.status = '';
			            aliasPromise.then(function (result) {
			            	scope.status = result;
			            });
		            }
		            
	        	}
	        	scope.$watch('statusId', update);
	        	update();
	        };
	      }
	  };
}]);


//可以改用filter
module.directive('eheEnumDescription', ['eheAliasService', function (aliasService) {
	  return {
	    restrict: 'EA',
	    scope: {
	    		enumId: '=eheEnumId',
	      },
	      template: '{{enum}}',
	      compile: function (element, attr, linker) {
	        return function (scope, element, attr) {
	        	
	        	function update() {
		            if (!scope.enumId) {
		            	scope.enum = attr.eheEnumDefault ? attr.eheEnumDefault : '';
		            	return;
		            }
		            
		            if(scope.enumId) {
		            	var aliasPromise = aliasService.getDescriptionForEnumId(scope.enumId);
			            scope.enum = '';
			            aliasPromise.then(function (result) {
			            	scope.enum = result;
			            });
		            }
		            
	        	}
	        	scope.$watch('enumId', update);
	        	update();
	        };
	      }
	  };
}]);


//可以改用filter
module.directive('ehePartyGroupName', ['eheAliasService', function (aliasService) {
	  return {
	    restrict: 'EA',
	    scope: {
	    		partyId: '=ehePartyId',
	      },
	      template: '{{groupName}}',
	      compile: function (element, attr, linker) {
	        return function (scope, element, attr) {
	        	
	        	function update() {
		            if (!scope.partyId) {
		            	scope.groupName = attr.eheGroupNameDefault ? attr.eheGroupNameDefault : '';
		            	return;
		            }
		            
		            if(scope.partyId) {
		            	var aliasPromise = aliasService.getGroupNameForPartyId(scope.partyId);
			            scope.groupName = '';
			            aliasPromise.then(function (result) {
			            	scope.groupName = result;
			            });
		            }
		            
	        	}
	        	scope.$watch('partyId', update);
	        	update();
	        };
	      }
	  };
}]);


//可以改用filter
module.directive('ehePositionName', ['eheAliasService', function (aliasService) {
	  return {
	    restrict: 'EA',
	    scope: {
	    		positionId: '=ehePositionId',
	      },
	      template: '{{position}}',
	      compile: function (element, attr, linker) {
	        return function (scope, element, attr) {
	        	
	        	function update() {
		            if (!scope.positionId) {
		            	scope.position = attr.ehePositionDefault ? attr.ehePositionDefault : '';
		            	return;
		            }
		            
		            if(scope.positionId) {
		            	var aliasPromise = aliasService.getPositionNameForPositionId(scope.positionId);
			            scope.position = '';
			            aliasPromise.then(function (result) {
			            	scope.position = result;
			            });
		            }
		            
	        	}
	        	scope.$watch('positionId', update);
	        	update();
	        };
	      }
	  };
}]);



/******** 	ui elements End ********************************/






/********	form controls ********************************/



module.directive('datepicker', function() {
    return {
        restrict : 'AC',
//        scope: {
//        	icon: '@eheButton',
////    		text: '=text',
//        },
        link : function(scope, element, attrs) {
        	
        	element.datepicker({changeYear: true,changeMonth: true}).datepicker( "option", "yearRange", "1900:2100" );
        }

    }
});


//TODO roleTypeId ...
module.directive('ehePersonSelect', ['$eheDialog', '$timeout', 'eheAliasService', function ($eheDialog, $timeout, $eheAlias) {
	  return {
	    restrict: 'EA',
	    scope: {
	  		partyId: '=',
	  	},
	    link: function (scope, element, attrs) {
	    	
	    	scope.$watch('partyId', function(newValue, oldValue) {
	    		if(newValue) {
	    			$eheAlias.getPersonNameForPartyId(newValue).then(function(result) {
	    				element.val(result);
	    			});
	    		}
	    	});
	    	
	      	element.click(function() {
	      		//TODO 查询权限控制
	      		$eheDialog.openSearchDialog('searchPerson', {
		  			  	entityName: 'PersonBasicInfo',
		  			  	searchFields: [{type:"string",label:"工号",field:"memberId"},{type:"string",label:"姓名",field:"firstName"}],
		  			  	selectFields: ['memberId', 'firstName', 'partyId'],
		  			  	colModel:[{name:"工号",field:"memberId"},{name:"姓名",field:"firstName"}],
		  			  	initCondition:[{field:"enabled",value:"Y"}],
		  		  	}).then(function (result) {
		  		  		
		  		  		$timeout(function() {
			  		  		scope.$apply(function() {
			  		  			element.val(result[0].firstName);
			  		  			scope.partyId = result[0].partyId;
			  		  		});
		  		  		});
		  		  		
		  		  	});
	      	});
	        	
  	}
	  };
}]);


module.directive('eheUserLoginSelect', ['$eheDialog', '$timeout', 'eheAliasService', function ($eheDialog, $timeout, $eheAlias) {
	  return {
	    restrict: 'EA',
	    scope: {
	  		userLoginId: '=',
	  	},
	    link: function (scope, element, attrs) {
	    	
	    	scope.$watch('userLoginId', function(newValue, oldValue) {
	    		if(newValue) {
	    			$eheAlias.getPersonNameForUserLoginId(newValue).then(function(result) {
	    				  element.val(result);
	    			  });
	    			
	    		}
	    	});
	    	
	    	//TODO 查询权限控制
	      	element.click(function() {
	      		$eheDialog.openSearchDialog('searchUserLogin', {
	//  			  	id: 'searchPerson',
	  			  	entityName: 'PersonAndUserLogin',
	  			  	searchFields: [{type:"string",label:"工号",field:"memberId"},{type:"string",label:"姓名",field:"firstName"}],
	  			  	selectFields: ['memberId', 'firstName', 'partyId','userLoginId'],
	  			  	colModel:[{name:"工号",field:"memberId"},{name:"姓名",field:"firstName"}],
	  			  	initCondition:[{field:"enabled",value:"Y"}],
	  		  	}).then(function (result) {
	  		  		
	  		  		$timeout(function() {
		  		  		scope.$apply(function() {
		  		  			element.val(result[0].firstName);
		  		  			scope.userLoginId = result[0].userLoginId;
		  		  		});
	  		  		});
	  		  		
	  		  	});
	      	});
	        	
  	}
	  };
}]);

module.directive('ehePositionSelect', ['$eheDialog', '$timeout', 'eheAliasService', function ($eheDialog, $timeout, $eheAlias) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	positionId: '=',
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.$watch('positionId', function(newValue, oldValue) {
	    		if(newValue) {
	    			$eheAlias.getPositionNameForPositionId(newValue).then(function(result) {
	    				element.val(result);
	    			});
	    		}
	    	});
	    	
	    	
	    	element.click(function() {
	    		$eheDialog.openSearchDialog('searchEmplPosition', {
				  	entityName: 'EmplPosition',
				  	searchFields: [{type:"string",label:"岗位编号",field:"emplPositionId"},{type:"string",label:"岗位名称",field:"emplPositionName"}],
				  	colModel:[{name:"岗位编号",field:"emplPositionId"},{name:"岗位名称",field:"emplPositionName"},{name:"级别",field:"level"},{name:"描述",field:"description"}],
			  	}).then(function (result) {
			  		
			  		$timeout(function() {
		  		  		scope.$apply(function() {
		  		  			element.val(result[0].emplPositionName);
		  		  			scope.positionId = result[0].emplPositionId;
		  		  		});
			  		});
			  		
			  	});
	    	});
	        	
	}
	  };
}]);


module.directive('eheOrgTreeSelect', ['$eheDialog', '$timeout', 'eheAliasService', function ($eheDialog, $timeout, $eheAlias) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	orgId: '=',
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.$watch('orgId', function(newValue, oldValue) {
	    		if(newValue) {
	    			$eheAlias.getGroupNameForPartyId(newValue).then(function(result) {
	    				element.val(result);
	    			});
	    		}
	    	});
	    	
	    	
	    	element.click(function() {
	    		
	    		$eheDialog.openTreeSelectDialog({
	    			title: "请选择所在部门",
	  			  	url: '/eheoa/control/createInstitutionTreeAjax',
//	  			  	initially_open: ['eheCompany'],
//	  			  	initially_select: ['eheCompany'],
	  		  	}).then(function(result) {
	  		  		
		  		  	$timeout(function() {
		  		  		scope.$apply(function() {
		  		  			element.val(result[0].name);
		  		  			scope.orgId = result[0].id;
		  		  		});
			  		});
	  		  	});
	    		
	    	});	        	
	}
	  };
}]);






/**
 * 附件显示
 * 显示附件名称，(附件大小)
 * 提供下载，删除操作
 */
module.directive('eheAttach', ['$compile', '$interval', '$eheRequest', '$timeout', function ($compile, $interval, $eheRequest, $timeout) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	contentId: '=',
	    	contentName: '@',
//	    	contentSize: '=',
//	    	canDownload: '=',
	    	canUpload: '=',
	    	canRemove: '=',
	    	onRemove: '&',
	    	uploadKey: '=',		//显示上传进度
	    },
	    template: function() {
	    	
	    	
	    	return '<div class="dL" tabindex="-1" aria-label="附件: {{contentName}}">' +
		    		'<a class="dO" ng-href="{{downloadLink}}">' +
		    			'<div class="vI">{{contentName}}</div>' +
		    		'</a>' +
//    				'<div class="vI"><a class="dO" href="stream?contentId={{contentId}}" target="_blank">{{contentName}}</a></div>' +
		    		'<div ehe-progressbar ng-show="showProgress" value="percentage" width="150" height="12" style="float:left;"></div>' +
	    			'<div role="button" class="vq" tabindex="-1" ng-if="canRemove" ng-click="onRemove()"></div>' +
	    			'<div style="clear:both;"></div>' + 
    			'</div>';
	    	
	    	
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.id = attrs.id;
	    	var canDownload = true;
	    	
	    	scope.percentage = 0;
	    	scope.showProgress = false;
	    	scope.downloadLink = '';
	    	
		  	scope.$watch('contentId', function(newValue, oldValue) {
		  		if(canDownload && newValue) {
		  			scope.downloadLink = '/content/control/stream?contentId=' + newValue + '&externalLoginKey=' + getExternalLoginKey();
		  			
		  			$eheRequest.post('/ehecommon/control/getNameByIdAjax',{
			  			'entityName': 'Content',
			    		'nameField': 'contentName',
			    		'idField': 'contentId',
			    		'id': newValue
			  		}).then(function(result) {
			  			scope.contentName = result.name;
			  		});
		  			
		  		}else {
		  			scope.downloadLink = '';
		  		}
		  	});
		  	
		  	
		  	
		  	scope.$watch('uploadKey', function(newValue, oldValue) {
		  		if(newValue && newValue != oldValue) {
			    	
		  			scope.showProgress = true;
			    	var i = $interval(function() {
			    		
			    		$eheRequest.post('/ehecontent/control/uploadProgress?externalLoginKey=' + getExternalLoginKey(),
			    				{
			    					_upload_key_: scope.uploadKey
			    				}
			    		).then(function(data) {
			    			
			    			if (data.contentLength == -1) {	
			    				$interval.cancel(i);
			    				scope.showProgress = false;
				                return;
				            }else  {
				            	scope.percentage = Math.floor(100 * data.bytesRead / data.contentLength);
								
								if (data.contentLength == data.bytesRead) {
									$interval.cancel(i);
//									$timeout(function() {
										scope.showProgress = false;
//									});
								}	                
				            }
			    			
			    		});
			    		
			    	}, 1000);
			    	
			    	element.on('$destroy', function() {
			            $interval.cancel(i);
			    	});
		  		}
		  	});
		  	
		  	
		  	
	    	
	    }
	  };
}]);


//uploadDialog改成服务
//附件控件
module.directive('eheAttachCtrl', ['$eheDialog', '$document', '$timeout', '$compile', '$eheRequest', function ($eheDialog, $document, $timeout, $compile, $eheRequest) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	contentId: '=',		//TODO ngModel
	    	contentTypeId: '@',
	    },
	    template: function() {
	    	
	    	return '<div class="GM" ng-hide="showAttachButton">' + 
	    				'<div ehe-attach content-id="contentId" content-name="contentName" upload-key="uploadKey" can-remove="true" on-remove="onRemoveAttach()"></div>' + 
    				'</div>' + 
    				'<button type="button" id="{{id}}_addAttachment" ng-show="showAttachButton" ehe-button>上传附件</button>';
	    	
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.id = attrs.id;
	    	
	    	scope.showAttachButton = true;
	    	
	    	if(!scope.contentTypeId) {
	    		scope.contentTypeId = 'DOCUMENT';
	    	}
	    	
	    	scope.contentName = '';
	    	var key = '';
	    	
	    	scope.onRemoveAttach = function() {
	    		scope.showAttachButton = true;
	    		scope.contentId = '';
	    		
	    	}
	    	
	    	
	    	scope.uploadCallback = function(content, complete) {
    			scope.showAttachButton = false;
	    		
	  		  	if(complete) {
	  		  		//TODO remove upload form
	  		  		
	  		  		var contentObj = angular.fromJson(content);
	  		  			
  		  			scope.contentId = contentObj.contentId;
	  		  		
	  		  	}else {
	  		  		scope.uploadKey = key;
	  		  	}
	  	  	};
	    	
	    	
	    	$timeout(function() {
	    		$("#" + scope.id + "_addAttachment").click(function() {
		    		
	    			var body = $document.find('body').eq(0);
	    			//TODO 多附件 createMultiDocAndUploadFileAjax
	    			key = (new Date().getTime()) ^ Math.random();
		    		var uploadFormEl = angular.element('<form action="/ehecontent/control/createDocAndUploadFileAjax?_upload_key_=' + key + '" ng-upload="uploadCallback()" style="display:none;"></form>');
		    		var uploadedFileEl = angular.element('<input type="file" name="uploadedFile"/>');
		    		var contentTypeIdEl = angular.element('<input type="hidden" name="contentTypeId"/>');
		    		var contentNameEl = angular.element('<input type="text" name="contentName"/>');
		    		var submitEl = angular.element('<input type="submit" class="upload-submit" value="上传"/>');   	
		    		uploadFormEl.append(uploadedFileEl)
		    					.append(contentTypeIdEl)
		    					.append(contentNameEl)
		    					.append(submitEl);
		    		
			  		var formDomEl = $compile(uploadFormEl)(scope);
			  		body.append(formDomEl);
		    		
			  		
			  		uploadedFileEl.change(function() {
			  			var fileName = uploadedFileEl.val();	
			  			
			  			var pos = fileName.lastIndexOf("/");
						if(pos == -1){
							pos = fileName.lastIndexOf("\\");
						}
						
						if(fileName) {
							scope.contentName = fileName.substr(pos+1);
						}
						
						//set content name
						contentNameEl.val(scope.contentName);
						contentTypeIdEl.val(scope.contentTypeId);
						
						//sizeLimit
						var file = uploadedFileEl.get(0);
						var sizeLimit = 209715200;
						var sizeLimitDisplay = "200 MB";
						$eheRequest.post('/ehecontent/control/getUploadSizeLimitAjax?externalLoginKey=' + getExternalLoginKey())
									.then(function(data) {
										if (data.sizeLimit) {
											sizeLimit = Number(data.sizeLimit);
										}
										if (data.sizeLimitDisplay) {
											sizeLimitDisplay = data.sizeLimitDisplay;
										}
										if (file.files && file.files[0].size > sizeLimit) {
									    	file.value = null; 
									        alert("上传文件大小不得超过" + sizeLimitDisplay); 
									        return;
									    }
										
										//submit upload form
										submitEl.click();
										
									});
						
			  		})
			  		
			  		uploadedFileEl.click();
		    	});
	    	});
	    	
	        	
	    }
	  };
}]);




/**
 * 照片显示控件
 * 
 */
module.directive('ehePhoto', ['$compile', '$interval', '$eheRequest', '$timeout', function ($compile, $interval, $eheRequest, $timeout) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	contentId: '=',
//	    	contentSize: '=',
//	    	canDownload: '=',
	    	uploadKey: '=',		//显示上传进度
	    	ehePhotoClick: '&',
	    },
	    template: function() {
	    	
	    	return '<div style="max-width: 175px;">' + 
				'<img ng-src="{{imgSrc}}" ng-click="ehePhotoClick()" style="float:left;border:grey solid 1px;width:110px;height:130px;cursor:pointer;"/>' + 
				'<div ehe-progressbar ng-show="showProgress" value="percentage" width="150" height="12" style="float:left;"></div>' +
				'<div style="clear:both;"></div>' + 
			'</div>';
	    	
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.id = attrs.id;
	    	
	    	scope.percentage = 0;
	    	scope.showProgress = false;
	    	scope.imgSrc = '/resources/ehe/common/images/profile_photo.jpg';
	    	
		  	scope.$watch('contentId', function(newValue, oldValue) {
		  		if(newValue) {
		  			scope.imgSrc = '/content/control/stream?externalLoginKey=' + getExternalLoginKey() + '&contentId=' + newValue;
		  		}else {
		  			scope.imgSrc = '/resources/ehe/common/images/profile_photo.jpg';
		  		}
		  	});
		  	
		  	
		  	scope.$watch('uploadKey', function(newValue, oldValue) {
		  		if(newValue && newValue != oldValue) {
			    	
		  			scope.showProgress = true;
			    	var i = $interval(function() {
			    		
			    		$eheRequest.post('/ehecontent/control/uploadProgress?externalLoginKey=' + getExternalLoginKey(),
			    				{
			    					_upload_key_: scope.uploadKey
			    				}
			    		).then(function(data) {
			    			
			    			if (data.contentLength == -1) {	
			    				$interval.cancel(i);
			    				scope.showProgress = false;
				                return;
				            }else  {
				            	scope.percentage = Math.floor(100 * data.bytesRead / data.contentLength);
								
								if (data.contentLength == data.bytesRead) {
									$interval.cancel(i);
//									$timeout(function() {
										scope.showProgress = false;
//									});
								}	                
				            }
			    			
			    		});
			    		
			    	}, 1000);
			    	
			    	element.on('$destroy', function() {
			            $interval.cancel(i);
			    	});
		  		}
		  	});
		  	
		  	
		  	
	    	
	    }
	  };
}]);


//照片上传控件
module.directive('ehePhotoCtrl', ['$eheDialog', '$document', '$timeout', '$compile', '$eheRequest', function ($eheDialog, $document, $timeout, $compile, $eheRequest) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	contentId: '=',		//TODO ngModel
//	    	contentTypeId: '@',
//	    	canUpload: '=',
	    },
	    template: function() {
	    	
	    	return '<div ehe-photo content-id="contentId" ehe-photo-click="onClickPhoto()" upload-key="uploadKey">' + 
  				'</div>';
	    	
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.id = attrs.id;
	    	
    		scope.contentTypeId = 'EHE_PROFILE_PHOTO';
	    	
	    	scope.contentName = '';
	    	var key = '';
	    	
	    	
	    	
	    	scope.uploadCallback = function(content, complete) {
	    		
	  		  	if(complete) {
	  		  		//TODO remove upload form
	  		  		
	  		  		var contentObj = angular.fromJson(content);
	  		  			
		  			scope.contentId = contentObj.contentId;
	  		  		
	  		  	}else {
	  		  		scope.uploadKey = key;
	  		  	}
	  	  	};
	    	
	    	
	  	  	//点击上传图片
    		scope.onClickPhoto = function() {

    			var body = $document.find('body').eq(0);
    			//TODO 多附件 createMultiDocAndUploadFileAjax
    			key = (new Date().getTime()) ^ Math.random();
	    		var uploadFormEl = angular.element('<form action="/ehecontent/control/createDocAndUploadFileAjax?_upload_key_=' + key + '" ng-upload="uploadCallback()" style="display:none;"></form>');
	    		var uploadedFileEl = angular.element('<input type="file" name="uploadedFile"/>');
	    		var contentTypeIdEl = angular.element('<input type="hidden" name="contentTypeId"/>');
	    		var contentNameEl = angular.element('<input type="text" name="contentName"/>');
	    		var submitEl = angular.element('<input type="submit" class="upload-submit" value="上传"/>');   	
	    		uploadFormEl.append(uploadedFileEl)
	    					.append(contentTypeIdEl)
	    					.append(contentNameEl)
	    					.append(submitEl);
	    		
		  		var formDomEl = $compile(uploadFormEl)(scope);
		  		body.append(formDomEl);
	    		
		  		
		  		uploadedFileEl.change(function() {
		  			var fileName = uploadedFileEl.val();	
		  			
		  			var pos = fileName.lastIndexOf("/");
					if(pos == -1){
						pos = fileName.lastIndexOf("\\");
					}
					
					if(fileName) {
						scope.contentName = fileName.substr(pos+1);
					}
					
					//set content name
					contentNameEl.val(scope.contentName);
					contentTypeIdEl.val(scope.contentTypeId);
					
					//file type validate
					
					//sizeLimit
					var file = uploadedFileEl.get(0);
					var sizeLimit = 209715200;
					var sizeLimitDisplay = "200 MB";
					$eheRequest.post('/ehecontent/control/getUploadSizeLimitAjax?externalLoginKey=' + getExternalLoginKey())
								.then(function(data) {
									if (data.sizeLimit) {
										sizeLimit = Number(data.sizeLimit);
									}
									if (data.sizeLimitDisplay) {
										sizeLimitDisplay = data.sizeLimitDisplay;
									}
									if (file.files && file.files[0].size > sizeLimit) {
								    	file.value = null; 
								        alert("上传文件大小不得超过" + sizeLimitDisplay); 
								        return;
								    }
									
									//submit upload form
									submitEl.click();
									
								});
					
		  		})
		  		
		  		uploadedFileEl.click();
	    	};
	    	
	        	
	    }
	  };
}]);


//进度条
module.directive('eheProgressbar', ['$document', '$timeout', '$compile', '$eheRequest', '$interval', function ($document, $timeout, $compile, $eheRequest, $interval) {
	  return {
	    restrict: 'EA',
	    scope: {
	    	value: '=',		//TODO ngModel
	    	width: '@',
	    	height: '@',
	    	progressUrl: '@',
	    	onProgressUpdate: '&',
	    },
	    template: function() {
	    	
	    	return '<div ng-style="{width: width + \'px\', height: height + \'px\'}" class="ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar">' + 
	    				'<div class="ui-progressbar-value ui-widget-header ui-corner-left" ng-style="{width: value + \'%\'}"></div>' +
	    			'</div>';
	    	
	    },
	    link: function (scope, element, attrs) {
	    	
	    	scope.id = attrs.id;
	    	
//	    	var denominator = 100;
	    	
	        	
	    }
	  };
}]);









//Version 0.2.0
//AngularJS simple file upload directive
//this directive uses an iframe as a target
//to enable the uploading of files without
//losing focus in the ng-app.
//
//<div ng-app="app">
//<div ng-controller="mainCtrl">
// <form action="/uploads" ng-upload="results()">
//   <input type="file" name="avatar"></input>
//   <input type="submit" value="Upload"></input>
// </form>
//</div>
//</div>
//
//angular.module('app', ['ngUpload'])
// .controller('mainCtrl', function($scope) {
//   $scope.results = function(content) {
//     console.log(content);
//   }
//});
//
//
module.directive('ngUpload', ['$timeout', function($timeout) {
	return {
	 restrict: 'A',
	 link: function(scope, element, attrs) {
	
	   // Options (just 1 for now)
	   // Each option should be prefixed with 'upload-Options-' or 'uploadOptions'
	   // {
	   //    // specify whether to enable the submit button when uploading forms
	   //    enableControls: bool
	   // }
	   var options = {};
	   options.enableControls = attrs['uploadOptionsEnableControls'];
	
	   // get scope function to execute on successful form upload
	   if (attrs['ngUpload']) {
	
	     element.attr("target", "upload_iframe");
	     element.attr("method", "post");
	
	     // Append a timestamp field to the url to prevent browser caching results
	     var action = element.attr("action");
	     if(action.indexOf("?") != -1) {
	    	 action += "&_t=" + new Date().getTime();
	     }else {
	    	 action += "?_t=" + new Date().getTime();
	     }
	     element.attr("action", action);
	
	     element.attr("enctype", "multipart/form-data");
	     element.attr("encoding", "multipart/form-data");
	
	     // Retrieve the callback function
	     var fn = attrs['ngUpload'].split('(')[0];
	     var callbackFn = scope.$eval(fn);
	     if (callbackFn === null || callbackFn === undefined || !angular.isFunction(callbackFn)) {
	       var message = "The expression on the ngUpload directive does not point to a valid function.";
	       // console.error(message);
	       throw message + "\n";
	     }
	
	     // Helper function to create new iframe for each form submission
	     var addNewDisposableIframe = function(submitControl) {
	       // create a new iframe
	       var iframe = $("<iframe id='upload_iframe' name='upload_iframe' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");
	
	       // attach function to load event of the iframe
	       iframe.bind('load', function() {
	
	    	   // get content - requires jQuery
	    	   var content = iframe.contents().find('body').text();
	
	    	   // execute the upload response function in the active scope
	    	   $timeout(function() {
	    		   scope.$apply(function() {
		    		   callbackFn(content, content !== "" /* upload completed */ );
		    	   });
	    	   });
	    	   
	
	    	   // remove iframe
	    	   if (content !== "") // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
	    		   setTimeout(function() {
	    			   iframe.remove();
	    		   }, 250);
	
	    	   //if (options.enableControls == null || !(options.enableControls.length >= 0))
	    	   submitControl.attr('disabled', null);
	    	   submitControl.attr('title', '点击上传文件');
	       });
	
	       // add the new iframe to application
	       element.parent().append(iframe);
	     };
	
	     // 1) get the upload submit control(s) on the form (submitters must be decorated with the 'ng-upload-submit' class)
	     // 2) attach a handler to the controls' click event
	     $('.upload-submit', element).click(
	
	       function(e) {
	    	   
	    	   e.preventDefault();
	    	   
	    	   addNewDisposableIframe($(this) /* pass the submit control */ );
	    	   
	    	   $timeout(function() {
	    		   scope.$apply(function() {
		    		   callbackFn("请等待...", false /* upload not completed */ );
		    	   });
	    	   });
	
	    	   //console.log(angular.toJson(options));
	
	    	   var enabled = true;
	    	   if (options.enableControls === null || options.enableControls === undefined || options.enableControls.length >= 0) {
	    		   // disable the submit control on click
	    		   $(this).attr('disabled', 'disabled');
	    		   enabled = false;
	    	   }
	
	    	   $(this).attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + '正在上传，请等待...');
	
	    	   // submit the form
	    	   $(element).submit();
	    	   
	       }).attr('title', '点击上传文件');
	     
	   } else console.log("No callback function found on the ngUpload directive.");
	 }
	};
}]);






//module.directive('eheCurrencyCtrl', ['$timeout', function ($timeout) {
//return {
//  restrict: 'EA',
//  scope: {
//  	amount: '=',
//  },
//  link: function (scope, element, attrs) {
//  	
//  	
//  	var addCommas = function(str) {
//  	    var parts = (str + "").split("."),
//  	        main = parts[0],
//  	        len = main.length,
//  	        output = "",
//  	        i = len - 1;
//
//  	    while(i >= 0) {
//  	        output = main.charAt(i) + output;
//  	        if ((len - i) % 3 === 0 && i > 0) {
//  	            output = "," + output;
//  	        }
//  	        --i;
//  	    }
//  	    // put decimal part back
//  	    if (parts.length > 1) {
//  	        output += "." + parts[1];
//  	    }
//  	    return output;
//  	}
//  	
//  	element.css("text-align", "right")
//			.focus(function(){
//				element.select();
//			});
//  	
//  	scope.$watch('amount', function(newValue, oldValue) {
//  		if(newValue) {
//  			var amount = newValue - 0;
//  			if(!angular.isNumber(amount)) {
//  				amount = 0;
//  			}
//  			amount = addCommas(amount.toFixed(2));
//  			element.val(amount);
//  		}
//  	});
//  	
//  	
//  	element.keypress(function(event) {
//  		
//  		var char = '';
//  		if(event.which >=48 && event.which <= 57) {
//  			char = event.which - 48;
//  		}else if(event.which == 46) {
//  			char = '.';
//  		}
//  		
////		  	$timeout(function() {
////		  		scope.$apply(function() {
////		  			element.val(scope.amount);
////		  			scope.amount = scope.amount + char - 0;
////		  		});
////	  		});
//  		
//  	});	        	
//}
//};
//}]);


/********	form controls End ********************************/



