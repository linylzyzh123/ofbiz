<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title id="head_title_Id">${head_title!''}</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="${path}/angular-material/angular-material.css">
<#assign path="/resources">

<#--
<link rel="stylesheet" href="${path}/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="${path}/purecss/tables-min.css">-->

<link rel="stylesheet" href="${path}/css/main.css">
<#--jquery-->
<script type="text/javascript" src="${path}/jquery/jquery-1.11.1.min.js"></script>


<script type="text/javascript">
	$.browser = $.browser || {};
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
	$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	$.browser.opera = /opera/.tes<#--
<script type="text/javascript">
jQuery(function() {
	jQuery(".datepicker").datepicker({changeYear: true,changeMonth: true}).datepicker( "option", "yearRange", "1900:2100" );
});
</script>
-->t(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	
</script>

<script type="text/javascript" src="${path}/angular/angular.min.js"></script>
<script type="text/javascript" src="${path}/angular/angular-route.min.js"></script>

<script src="${path}/angular-aria/angular-aria.js"></script>
<script src="${path}/angular-animate/angular-animate.js"></script>
<#--<script src="/bower_components/hammerjs/hammer.js"></script>-->
<script src="${path}/angular-material/angular-material.js"></script>

<#--
<script type="text/javascript" src="${path}/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${path}/bootstrap/js/ui-bootstrap-tpls.js"></script>
-->

<#-- jquery UI -->
<#--
<link rel="stylesheet" href="${path}/jquery/jqueryUI/css/jquery.ui.all.css">
<script type="text/javascript" src="${path}/jquery/jqueryUI/js/jquery-ui-1.8.17.custom.min.js"></script>
<script type="text/javascript" src="${path}/jquery/jqueryUI/js/jquery.ui.datepicker-zh-CN.js"></script>
-->
<#-- jstree -->
<#--
<script type="text/javascript" language="javascript" src="${path}/jquery/jstree/jquery.jstree.js"></script> 
-->
<#-- jqgrid -->
<#--
<script type="text/javascript" language="javascript" src="${path}/jquery/jqgrid/js/i18n/grid.locale-cn.js"></script> 
<script type="text/javascript" language="javascript" src="${path}/jquery/jqgrid/js/jquery.jqGrid.src.js"></script>
<link rel="stylesheet" href="${path}/jquery/jqgrid/css/ui.jqgrid.css">

<script type="text/javascript" language="javascript" src="${path}/ehe/common/js/tools.js"></script> 

<script type="text/javascript" src="${path}/jquery/jqueryUI/js/upload-content.js"></script>


<link href="/resources/ehe/common/css/template2.css" rel="stylesheet">
<script type="text/javascript" src="${path}/ehe/common/util.js"></script>
<script type="text/javascript" src="${path}/ehe/common/commonServices.js"></script>
<script type="text/javascript" src="${path}/ehe/common/commonDirectives.js"></script>
<script type="text/javascript" src="${path}/ehe/common/eheDialog.js"></script>
<script type="text/javascript" src="${path}/ehe/common/eheGrid.js"></script>
-->
<#-- 
<script type="text/javascript">

function afterFrameOnload(){
	
}
jQuery(function() {
	
    jQuery("textarea[maxlength]").keyup(function(){ //设置textarea最大长度 
        var area=$(this); 
        var max=parseInt(area.attr("maxlength"),10);   //获取maxlength的值 
        if(max>0){ 
            if(area.val().length>max){                 //textarea的文本长度大于maxlength 
                area.val(area.val().substr(0,max));    //截断textarea的文本重新赋值             
            } 
        } 
    });
    window.onload=function(){
		try{
			if(typeof(eval("showAfterWindownOnload"))=="function")
			{
				showAfterWindownOnload();
			}
		}catch(e){
			jQuery(".right-content").show();
		}
		
	}
    
    jQuery("body").hide();
    jQuery("#wait_img").css("padding-top",jQuery(window).height()/4+'px');
});

function openTab(url){

	window.parent.addTab(url,document.title);
}
function openTab(url,title){
	window.parent.addTab(url,title);
}


function alertFunction(data, callbacks) {
	window.parent.alertFunction(data, callbacks);
}

function openTabAndCloseCurrent(url,title){
	window.parent.addTabAndCloseCurrent(url,title);
}

function closeTab(index) {
	window.parent.closeTab(index);
}

function reloadTab(url, index) {
	window.parent.reloadTab(url, index);
}
function waitDIV(){
	jQuery("#wait_div").show();
}
function goingDIV(){
	jQuery("#wait_div").hide();
}
</script>
<style>

.add-tab-span { 
	color:#f60;
	cursor: pointer;
	text-decoration: underline;
}
.add-tab-span:hover { 
	color:#f60;
	cursor: pointer;
	text-decoration: none;
}

.add-tab-span-black { 
	cursor: pointer;
	text-decoration: underline;
}
.add-tab-span-black:hover { 
	cursor: pointer;
	text-decoration: none;
}


</style>
-->
</head>
<body ng-app>

<#--
<div id="wait_div" style="width: 100%; z-index: 8000; height: 100%; position: absolute; display: none; background-color: rgb(0, 0, 0);opacity:0.3;text-align:center">
<img style="" id="wait_img" src="${path}/ehe/common/images/wait.gif" />
</div>
-->
<input id="externalLoginKey" type="hidden" value="${externalLoginKey}" />


