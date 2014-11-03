<script type="text/javascript">
	jQuery(function() {
 		jQuery("#showEmployee").jstree({
	        "core":{"initially_open":["eheCompany"]},//自动展开的节点
	        "ui" : { "initially_select" : ["eheCompany"]},
	        "plugins":["themes","json_data", "ui"],
	        "json_data" : {
	            "ajax" : {
	            	"type": "POST",  
	                "url" : "/eheoa/control/createEmployeeTreeAjax?companyId=eheCompany",
	                "data" : function (n) {
	                    return { id : n.attr ? n.attr("id") : "-1" };
	                }
	            },
	            progressive_render:true
	        },
	        "themes":{
	            "theme":"classic",
	            "dots":true,
	            "icons":false
	        }
	    }).bind("select_node.jstree", function (e, data) {//单击触发的事件 
	    	jQuery("#contactListTabsDiv").show();
	    	var id = data.rslt.obj.attr("id");
	    	var personType = "EMPLOYEE";
		    new Ajax.Updater("positionInfo", "/eheoa/control/contactList?selectedId="+id+"&personType={personType!''}", 
		    		{evalScripts: true,asynchronous:false,onComplete: function(){	jQuery("#positionInfo").show();}});
	    });
});

function selectQutas(){
     var qutasType = jQuery("#qutasType").val();
		if("001"==qutasType){
			alert("001");
		}else if("002"==qutasType){
			alert("002");
		}else if("003"==qutasType){
			alert("003");
		}else{
			alert(qutasType);
		}
}

function opProject(){
	var status = jQuery("#status").val();
	if(status=="hide"){
		jQuery("#rooms").show();
		jQuery("#status").val("show");
	}else if(status=="show"){
		jQuery("#rooms").hide();
		jQuery("#status").val("hide");
	}
}
function opToolbar(){
    var status = jQuery("#toolbar1Status").val();
    if(status=="hide"){
		jQuery("#content1").show();
        jQuery("#content2").attr("style","height:250px;");
        jQuery("#toolbar1Status").val("show");
	}else if(status=="show"){
		jQuery("#content1").hide();
        jQuery("#content2").attr("style","height:516px;");
        jQuery("#toolbar1Status").val("hide");
	}
}
</script>

<div class="container">

	
	<div id="nav-header" class="nav-header">
			
		<div class="top-logo">
			<img id="logo" src="/resources/images/logo.png"/>
		</div>
		<ul class="nav navbar-nav top-menu">
			<li class="title-four selected">
				<a>首页</a>
			</li>
			<li class="title-four">
				<a>工程</a>
			</li>
			<li class="title-four">
				<a>定额</a>
			</li>
			<li class="title-four">
				<a>+创建预算</a>
			</li>
		</ul>
		
		<ul class="nav navbar-nav navbar-right">	
			<li class="top-search search-view">
				<div class="search-form">
					<input type="search" placeholder="输入工程名/客户名/地址/电话号码 搜索工程" ng-model="dingeku.cailiao[0].name" maxlength="100" class="form-control search-input pull-left">
					<button class="search-btn btn btn-default pull-left"  ng-click="sousuo()">
						搜索
						<#--<span class="icon icon-search"></span>-->
					</button>
				</div>
			</li>
			<li class="account">
				<a>欢迎你，No.9+</a>
			</li>
		</ul>
	</div>
	
	<div id="main-body" class="main-body">
		
		<div id="bm-container">
			
			<div id="bm-header" class="content bm-header">
				<div class="t1">
					<div>
						<div class="bm-title bm-title1">工程预算：无锡太湖国际社区20号楼801 </div>
						<div class="bm-title bm-title2">【草稿状态】</div>
					</div>
					<div class="t11">   
						<div class="t111"><input type="radio" name="view" value="general"/> 一般视图</div>
						<div class="t111"><input type="radio" name="view" value="collect"/> 汇总视图</div>
						<div class="t111"><a href="#" style="color:black;">清单材料</a></div>
						<div class="t111"><a href="#" style="color:black;">费率设置</a></div>
					</div>
				</div>
				<div class="t2">
					<div class="t21">
						<div class="t211">吴女士 1390000000 二室一厅 138平 美式 高档</div>
						<div class="t212"><a href="#" style="color:orange;">详细>></a></div>
					</div>
					<div>
						<div class="bm-title3">预算总价</div>
						<div class="bm-title4"> ￥200,000</div>
					</div>
				</div>
			</div>
			
			<div id="bm-body">
				<div id="bm-left">
					
						<div class="panel whiteframe-z1">
							
							<div class="toolbar demo-toolbar">
								<div class="toolbar-tools">
							      <h3>
							        <span>工程部位</span>
							      </h3>	
							      <div style="width:110px;"></div>						    
							      <div><md-button class="md-raised md-primary" onClick="opToolbar()"></md-button></div>
							      <input type="hidden" id="toolbar1Status" value="show">
							    </div>
							</div>
							<div id="content1" class="content content-padding" style="height:250px;">
								<div><pre><span><a onClick="opProject()" href="#">   装饰工程</a></span></pre></div>
								<input type="hidden" id="status" value="show">
								<div id="rooms">
	        						<ul>
	            						<li><pre><a href="#">       客厅</a><span>（3.5*3.5*2.8）</span></pre></li>
	            						<li><pre><a href="#">       主卧</a><span>（4*3.5*2.8）</span></pre></li>
	            						<li><pre><a href="#">       次卧</a><span>（3.2*3.2*2.8）</span></pre></li>
	           						 	<li><pre><a href="#">       餐厅</a><span>（3*3.2*2.8）</span></pre></li>
	            						<li><pre><a href="#">       卫生间</a><span>（2.5*3*2.6）</span></pre></li>
									</ul>
								</div>	
							</div>
						</div>
						
						<div class="panel whiteframe-z1">
							<div class="toolbar demo-toolbar">
								<div class="toolbar-tools">
							      <h3>
							        <span>定额</span>
							      </h3>
							    </div>
							</div>
							<div id="content2" class="content content-padding" style="height:250px;">
								<div>
									<select id="qutasType" name="qutasType" style="width:189px;" class="form-control" onChange="selectQutas();"> 
										<option>不限</option> 
										<option ng-repeat="quota in quotaList.type" value="{{quota.id}}">
											{{quota.name}}
										</option> 
									</select> 
								</div>
								<div class="bm-row">
									  <div class="bm-search">
									  	<input style="width:145px;" type="search" placeholder="输入定额名称" class="form-control search-input pull-left" ng-model="searchText">
									  </div>
									  <div class="bm-search">
									  	<button style="line-height:10px;height: 30px;width: 40px;"class="search-btn btn btn-default pull-left">查询</button>
									  </div>
								</div>
								<div>
									<div >
										<table id="searchTextResults" border="0">
										  <tr ng-repeat="quota in quotas | filter:searchText">
										    <td>{{quota.name}}</td>
										  </tr>
										</table>
										<div ng-init="quotas = [
											 {id:'QT001', name:'天棚定额'},
					                         {id:'QT002', name:'墙面涂漆'},
					                         {id:'QT003', name:'地面找平'},
					                         {id:'QT004', name:'墙面拆除'},
					                         {id:'QT005', name:'地面铺砖'},
					                         {id:'QT006', name:'电线安装'}
					                         ]">
			                         	</div>
									</div>
								</div>
							</div>
						</div>
						
					
				</div>	
				<div id="bm-table-view" class="panel whiteframe-z1" style="min-height: 300px;">
					
					<div class="content">
						<table class="data-table">
                       	    <thead>
                                <tr>
                                    <th>项目</th>        
        							<th>单位</th>
        							<th>工程量</th>
        							<th>单价</th>
        							<th>合计</th>
        							<th>计量规则</th>
        							<th>工艺说明</th>
    							</tr>
    						</thead>
    							<tr ng-repeat="i in [1,2,3,4,5,6,7]">
       								 <td>2222</td>        
       								 <td>22222</td>
        							 <td>22222</td>
        							 <td>23333</td>
        							 <td>23333</td>
        							 <td>23333</td>
        							 <td>23333</td>
   								 </tr>
						</table>
					</div>
					
					<div>
					
					
					</div>
					
					<div id="bm-footer">
				
						<div class="bottom-toolbar">
							<md-button class="md-raised md-primary">保存</md-button>
							<md-button class="md-raised md-default">存为模板</md-button>
							<md-button class="md-raised md-warn">审核锁定</md-button>
							<md-button class="md-raised md-default">导出</md-button>
							<md-button class="md-raised md-default">打印</md-button>
							<md-button class="md-raised md-default">邮件发送</md-button>
						</div>
						
					</div>
									
								
				</div> <#-- end of table-view -->
			
			</div>	<#-- end of bm-body -->
			
			
			
		</div>
		
		
		
	</div>
	
	<#--
	<div id="footer" class="footer">
		.footer
	</div>
	-->

</div>








