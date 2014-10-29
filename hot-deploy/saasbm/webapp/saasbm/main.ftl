<#assign path="/resources">
<script type="text/javascript">
jQuery(function() {
		jQuery(document).ready(function(){
			updateChartSize2();
			jQuery(window).resize(updateChartSize2);
		});	
		jQuery(".editCell_quantity").click(function(event){
			var text = jQuery(event.currentTarget).children().get(0);
			jQuery(text).hide().next().show();
		});
});

function updateChartSize2() {
	var height = jQuery(window).height(); //获取窗体高度
	height2 = jQuery("#nav-header").height()+jQuery("#bm-header").height()+jQuery("#roomTitle").height()+jQuery("#bm-footer").height()+3+10+40-0;
	height3 = jQuery("#nav-header").height()+jQuery("#bm-header").height()+jQuery("#content2_toolbar").height()+jQuery("#content1").height()+jQuery("#content1_toolbar").height()+16+'px';
	if(height<750){
		right_height = 452;
		left_height = 250;
	}else if(height>950){
		right_height = 630;
		left_height = 427;
	}else{
		right_height = height-height2;
		left_height = height-526;
	}
	
	//如果是页面内容高宽可以将window替换为document即可
	//动态修改容器大小
	jQuery("#bm-table-content").height(right_height);
	jQuery("#content2").height(left_height);
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
function opToolbar1(){
    var status = jQuery("#toolbar1Status").val();
    if(status=="hide"){
		jQuery("#content1").show();
        jQuery("#content2").attr("style","height:250px;");
        jQuery("#toolbar1Status").val("show");
        jQuery("#icon-triangle").show();
        jQuery("#icon-triangle2").hide();
	}else if(status=="show"){
		jQuery("#content1").hide();
        jQuery("#content2").attr("style","height:500px;");
        jQuery("#toolbar1Status").val("hide");
        jQuery("#icon-triangle2").show();
        jQuery("#icon-triangle").hide();
	}
}
function opToolbar2(){
    var status = jQuery("#toolbar2Status").val();
    var status1 = jQuery("#toolbar1Status").val();
    if(status=="hide"){
    	if(status1=="show"){
    		jQuery("#content1").hide();
    		jQuery("#toolbar1Status").val("hide");
	        jQuery("#icon-triangle2").show();
	        jQuery("#icon-triangle").hide();
    	}
		jQuery("#content2").show();
        jQuery("#content1").attr("style","height:250px;");
        jQuery("#toolbar2Status").val("show");
        jQuery("#icon-triangle3").show();
        jQuery("#icon-triangle4").hide();
	}else if(status=="show"){
		if(status1=="hide"){
    		jQuery("#content1").show();
    		jQuery("#toolbar1Status").val("show");
	        jQuery("#icon-triangle2").hide();
	        jQuery("#icon-triangle").show();
    	}
		jQuery("#content2").hide();
        jQuery("#content1").attr("style","height:500px;");
        jQuery("#toolbar2Status").val("hide");
        jQuery("#icon-triangle4").show();
        jQuery("#icon-triangle3").hide();
	}
}
</script>

<div id="container" class="container">

	
	<div id="nav-header" class="nav-header">
			
		<div class="top-logo">
			<img id="logo" src="${path}/images/logo.png"/>
		</div>
		<ul class="nav navbar-nav top-menu">
			<li class="title-four selected">
				<a style="line-height:26px;">首页</a>
			</li>
			<li class="title-four">
				<a style="line-height:26px;">工程</a>
			</li>
			<li class="title-four">
				<a style="line-height:26px;">定额</a>
			</li>
			<li class="title-four">
				<a style="line-height:26px;">+创建预算</a>
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
				<a style="padding-left:15px;padding-top:13px;padding-bottom:auto;">欢迎你，No.9+</a>
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
								<div id="content1_toolbar" class="toolbar-tools">
									<div style="width:182px;">
								      <h3>
								        <span>工程部位</span>
								      </h3>	
						      		</div>						    
						        <div>
						        	<a href="#">
						        		<img id="icon-triangle" src="${path}/images/icon-triangle.png" onClick=""/>
			        					<img style="display:none;" id="icon-triangle2" src="${path}/images/icon-triangle2.png" onClick=""/>
			        				</a>
		        				</div>
							      	<input type="hidden" id="toolbar1Status" value="show">
						    </div>
						</div>
							<div id="content1" class="content content-padding" style="height:250px;">
								<div>
									<div>
										<a id="deractorRoom" onClick="opProject()" href="#" class="deractorRoom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;装饰工程</a>
										<input type="hidden" id="status" value="show">
									</div>
								</div>
								
								<div id="rooms">
	        						<div ng-repeat="subproject in quotaDocument.subProjects"> 
		        						<md-list ng-repeat="room in subproject.rooms">
		        							<div style="margin-left:49px;margin-bottom:3px;">
									            <a href="{{'#' + room.id}}" ng-click="chooseRoom(room)">{{room.name}}</a>
								          	</div>
		            					</md-list>
									</div>
								</div>	
							</div>
						</div>
						
						<div class="panel whiteframe-z1">
							
							<div class="toolbar demo-toolbar">
								<div id="content2_toolbar" class="toolbar-tools">
									<div style="width:182px;">
								      <h3>
								        <span>定额</span>
								      </h3>
							      	</div>
							    <div>
						        	<a href="#">
						        		<img id="icon-triangle3" src="${path}/images/icon-triangle.png" onClick=""/>
			        					<img style="display:none;" id="icon-triangle4" src="${path}/images/icon-triangle2.png" onClick=""/>
			        				</a>
		        				</div>
							    <input type="hidden" id="toolbar2Status" value="show">
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
										<table class="data-table" id="searchTextResults" style="border:none;margin-bottom:0px;align:left;">
										  <tr ng-repeat="quota in quotas | filter:searchText" style="align:left;border:none;">
										    <td style="border:none;font-size:12px;align:left;" ng-Dblclick="addBillItem(currentRoom, quota)">{{quota.name}}</td>
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
					
				<div id="bm-table-view" class="whiteframe-z1">
					
					<md-content id="roomTitle" style="z-index:2;">
					    <md-item-content class="md-tile-th">
					    	<div class="md-tile-content md-tile-first md-tile-large">
				        		<h2>项目</h2>
							</div>
							<div class="md-tile-content md-tile-small">
				        		<h2>单位</h2>
							</div>
							<div class="md-tile-content md-tile-small">
				        		<h2>工程量</h2>
							</div>
							<div class="md-tile-content md-tile-small">
				        		<h2>单价</h2>
							</div>
							<div class="md-tile-content md-tile-medium">
				        		<h2>合计</h2>
							</div>
							<div class="md-tile-content md-tile-large">
				        		<h2>计量规则</h2>
							</div>
							<div class="md-tile-content md-tile-large">
				        		<h2>工艺说明</h2>
							</div>
						</md-item-content>
					</md-content>
					
					<div style="position:relative;">
						<md-content id="bm-table-content">
							
							<div ng-repeat="subproject in quotaDocument.subProjects">
							
								<section ng-repeat="room in subproject.rooms">
							     <a id="{{room.id}}"><md-subheader class="md-primary md-room-theme" style="line-height: 0.3em;">{{room.name}}</md-subheader></a>
							      <md-list layout="vertical">
							        <md-item ng-repeat="item in room.billItems">
						          		<md-item-content class="md-item-change">
								          	<div class="md-tile-content md-tile-change md-tile-large ">
								            	<h3 ng-Dblclick="deleteBillItem(room,item)">{{item.itemName}}</h3>
								          	</div>
								          	<div class="md-tile-content md-tile-change md-tile-small">
								            	<h3>{{item.quantityUom}}</h3>
								          	</div>
								          	<div class="md-tile-content md-tile-change md-tile-small editCell_quantity">
								            	<div>{{item.quantity}}</div>
								            	<input type="text" style="text-align:center;display:none;border:none;width:67px;"> 
								          	</div>
								           	<div class="md-tile-content md-tile-change md-tile-small">
								            	<h3>{{item.unitPrice}}</h3>
								          	</div>
								           	<div class="md-tile-content md-tile-change md-tile-medium">
								            	<h3>{{item.totalPrice}}</h3>
								          	</div>
								           	<div class="md-tile-content md-tile-change md-tile-large">
								            	<h3>{{item.rulesDescription}}</h3>
								          	</div>
								           	<div class="md-tile-content md-tile-change md-tile-large">
								            	<h3>{{item.processDescription}}</h3>
								          	</div>
								        </md-item-content>
								        <md-divider class="md-divider-color"></md-divider>
							        </md-item>
							      </md-list>
							    </section>
							
							</div>
						</md-content>
					
					</div>
					
					
					<#--
					
					<md-toolbar id="quotasTitle" class="md-theme-light">
					    <h1 class="md-toolbar-tools md-tile-room">
					      <span>{{currentRoom.name}}</span>
					    </h1>
				  	</md-toolbar>
				  					
				  	<md-content id="bm-table-content" style="height:450px;">			  		
				  		<div ng-repeat="subproject in quotaDocument.subProjects">  		    
				  			<md-list ng-repeat="room in subproject.rooms">
						      <md-item ng-repeat="item in room.billItems">
						        <md-item-content>
						          <div class="md-tile-content md-tile-first md-tile-large">
						            <h3>{{item.itemName}}</h3>
						          </div>
						          <div class="md-tile-content md-tile-small">
						            <h3>{{item.quantityUom}}</h3>
						          </div>
						          <div class="md-tile-content md-tile-small editCell_quantity">
						            <div>{{item.quantity}}</div>
						            <input type="text" style="text-align:center;display:none;width:67px;"> 
						          </div>
						           <div class="md-tile-content md-tile-small">
						            <h3>{{item.unitPrice}}</h3>
						          </div>
						           <div class="md-tile-content md-tile-medium">
						            <h3>{{item.totalPrice}}</h3>
						          </div>
						           <div class="md-tile-content md-tile-large">
						            <h3>{{item.rulesDescription}}</h3>
						          </div>
						           <div class="md-tile-content md-tile-large">
						            <h3>{{item.processDescription}}</h3>
						          </div>
						        </md-item-content>
						        <md-divider></md-divider>
						      </md-item>					      
						    </md-list>
				  		</div>
					    
				  	</md-content>
						
					
					-->
					
					<div id="bm-footer">
			
						<div class="bottom-toolbar">
							<md-button class="md-raised md-primary">保存</md-button>
							<md-button class="md-raised md-default">存为模板</md-button>
							<md-button class="md-raised md-warn">审核锁定</md-button>
							<md-button class="md-raised md-default">导出</md-button>
							<md-button class="md-raised md-default">打印</md-button>
							<md-button class="md-raised md-default">邮件发送</md-button>
							<md-button ng-click="test()">test</md-button>
						</div>
						
					</div>
					
					
				</div>
					
					
									
								
			
			</div>	<#-- end of bm-body -->
			
			
			
			
			
		</div>
		
		
		
	</div>
	
	<#--
	<div id="footer" class="footer">
		.footer
	</div>
	-->

</div>






