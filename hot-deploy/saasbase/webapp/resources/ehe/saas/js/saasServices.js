var bmModule = angular.module('ehe.saas.bm.services', []);




/**
 * 预算文档
 */
bmModule.factory('$bmDocument', ['$idGenerator', '$eheRequest', function ($idGenerator, $eheRequest)
  {
	
	/**
	 * 
		BmDocument			//预算
		SubProject			//分项工程（房间，土建，其他）
		Room				//房间部位
		BillItem			//清单项目
		Product				//材料
		Quota				//定额
	 * 
	 */
	
	var BmDocument = function(docId) {
		
		this.clazz = 'BmDocument';
		
		this.id = options.id || $idGenerator.genId();
		
		this.subProjects = [];
		
		this.load(docId);
		
//		var currentRoom, currentSubProject;
	};
		
	BmDocument.prototype = angular.extend(BmDocument.prototype, {
		
		toJson: function() {
			
		},
		load: function(docId) {
			
			$eheRequest.post('/saasbm/control/getBmDocumentAjax', {
	    		docId: docId
	    	}).then(function(result) {
	    		
	    		if(result && result.document && result.document.quotaHead) {
	    			
					var qd = result.document;
	    			
					this.quotaHead = qd.quotaHead;
					
					var $this = this;
					
					angular.forEach(qd.subProjects, function(subPrj) {
						$this.addSubProject(subPrj);
					});
					
					
	    		}
	    		
	    	});
			
		},
		reload: function() {
			this.load(this.docId);
		},
		save: function() {
			
			/**
		     * 创建预算书
		     */
//		    function createBmDoc() {
//		    	
//		    	$eheRequest.post('/saasbm/control/createBmDocumentAjax', {
//
//		    	}).then(function(result) {
//		    		
//		    		if(result && result.document && result.document.quotaHead) {
//		    			
//		    			bmDocument = result.document;
//		    			
//		    		}
//		    		
//		    	});
//		    	
//		    };
//			
//			
//			/**
//		     * 更新预算书
//		     */
//		    function updateBmDoc() {
//		    	
//		    	$eheRequest.post('/saasbm/control/updateBmDocumentAjax', {
//		    		docId: docId
//		    	}).then(function(result) {
//		    		
//		    		if(result && result.document && result.document.quotaHead) {
//		    			
//		    			bmDocument = result.document;
//		    			
//		    		}
//		    		
//		    	});
//		    	
//		    };
			
		},
		remove: function() {
			
			this.parent.deleteSubProject(this);
			
		},
		addSubProject: function(options) {
			
			var subProject = new SubProject(this, options);
			
			this.subProjects.push(subProject);
			
		},
		deleteSubProject: function(subProject) {
			
			for(var i=0; i<this.subProjects.length; i++) {
				if(this.subProjects[i] == subProject) {
					this.subProjects.splice(i, 1);
					break;
				}
			}
			
		}
		
	});
	
	
	
	
	/**
	 * 分项工程
	 */
	var SubProject = function(bmDocument, options) {
		
		this.clazz = 'SubProject';
		
		this.id = options.id || $idGenerator.genId();
		
		this.parent = bmDocument;
		
		this.rooms = [];
		
		this.init(options);
		
	};
		
	SubProject.prototype = angular.extend(SubProject.prototype, {
		
		getJsonObject: function() {
			var jsonObj = {};
			
			var $this = this;
			angular.forEach($this, function(value, key) {
				
				if(!angular.isFunction(value) && key != 'clazz' && key != 'id' && key != 'parent' && key != 'rooms') {
					jsonObj[key] = value;
				}
				
			});
			
			return jsonObj;
		},
		init: function(options) {
			
			this.update(options);
			if(options.rooms) {
				this.addRooms(options.rooms);
			}
			
		},
		update: function(options) {
			var $this = this;
			angular.forEach(options, function(value, key) {
				if(key != 'id' && key != 'parent' && key != 'rooms') {
					$this[key] = value;
				}
			});
		},
		remove: function() {
			
			this.parent.deleteSubProject(this);
			
		},
		addRoom: function(options) {
			
			var room = new Room(this, options);
			
			this.rooms.push(room);
			
		},
		addRooms: function(rooms) {
			
			var $this = this;
			angular.forEach(rooms, function(item) {
				$this.addRoom(item); 
			})
		},
		deleteRoom: function(room) {
			
			for(var i=0; i<this.rooms.length; i++) {
				if(this.rooms[i] == room) {
					this.rooms.splice(i, 1);
					break;
				}
			}
			
		}
	});
	
	
	/**
	 * 房间
	 */
	var Room = function(subProject, options) {
		
		this.clazz = 'Room';
		
		this.id = options.id || $idGenerator.genId();
		
		this.parent = subProject;
		
		this.billItems = [];
		
		this.init(options);
		
	};
		
	Room.prototype = angular.extend(Room.prototype, {
		
		getJsonObject: function() {
			var jsonObj = {};
			
			var $this = this;
			angular.forEach($this, function(value, key) {
				
				if(!angular.isFunction(value) && key != 'clazz' && key != 'id' && key != 'parent' && key != 'billItems') {
					jsonObj[key] = value;
				}
				
			});
			
			return jsonObj;
		},
		init: function(options) {
			
			this.update(options);
			
			if(options.billItems) {
				this.addBillItems(options.billItems);
			}
		},
		update: function(options) {
			var $this = this;
			angular.forEach(options, function(value, key) {
				if(key != 'id' && key != 'parent' && key != 'billItems') {
					$this[key] = value;
				}
			});
			
		},
		remove: function() {
			
			this.parent.deleteRoom(this);
			
		},
		addBillItem: function(options) {
			
			var billItem = new BillItem(this, options);
			
			this.billItems.push(billItem);
			
		},
		addBillItems: function(items) {
			
			var $this = this;
			
			angular.forEach(items, function(item) {
				
				$this.addBillItem(item);
				
			});
			
		},
		deleteBillItem: function(billItem) {
			
			for(var i=0; i<this.billItems.length; i++) {
				if(this.billItems[i] == billItem) {
					this.billItems.splice(i, 1);
					break;
				}
			}
			
		}
	});
	
	
	
	
	/**
	 * 清单项目
	 */
	var BillItem = function(room, options) {
		
		this.clazz = 'BillItem';
		
		this.id = options.id || $idGenerator.genId();
		
		this.parent = room;
		
		this.products = [];
		
		this.init(options);
		
	};
		
	BillItem.prototype = angular.extend(BillItem.prototype, {
		
		getJsonObject: function() {
			var jsonObj = {};
			
			var $this = this;
			angular.forEach($this, function(value, key) {
				
				if(!angular.isFunction(value) && key != 'clazz' && key != 'id' && key != 'parent' && key != 'products') {
					jsonObj[key] = value;
				}
				
			});
			
			return jsonObj;
		},
		init: function(options) {
			
			this.update(options);
			if(options.products) {
				this.addProducts(options.products);
			}
			
		},
		update: function(options) {
			var $this = this;
			angular.forEach(options, function(value, key) {
				if(key != 'id' && key != 'parent' && key != 'products') {
					$this[key] = value;
				}
			});
		},
		remove: function() {
			
			this.parent.deleteBillItem(this);
			
		},
		addProduct: function(options) {
			
		},
		addProducts: function(products) {
			
			var $this = this;
			angular.forEach(products, function(item) {
				$this.addProduct(item); 
			})
		},
		deleteProduct: function(product) {
			
		}
	});
	
	
	
	var bmDocument;
	
	
	/**
     * 载入预算书
     */
	function getBmDocument(docId) {
		
		if(!bmDocument) {
			
			bmDocument = new BmDocument(docId);
			
			bmDocument.load(docId);
			
		}
		
		return bmDocument;
		
		
	}
	
		
	return {
		getBmDocument: getBmDocument,
  	};
  
}]);



/**
 * 定额
 */
//bmModule.factory('$quotas', ['$q', '$rootScope', '$http', function ($q, $scope, $http) {
//
//
//
//
//
//
//		
//		return {
//			post: post
//	  	};
//  
//}]);




