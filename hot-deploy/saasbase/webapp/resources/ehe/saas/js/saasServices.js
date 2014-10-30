var bmModule = angular.module('ehe.saas.bm.services', []);


/**
 * 预算文档
 */
bmModule.factory('$bmDocument', ['$q', '$rootScope', '$http', function ($q, $scope, $http)
  {

	var bmDoc = {};		//文档信息
	
	
	
	
	
	
	
	
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
			post: post
	  	};
  
  }]);





