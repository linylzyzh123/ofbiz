		<style>
		<#--
		 body {
		    width: 600px;
		    margin: 40px auto;
		    font-family: 'trebuchet MS', 'Lucida sans', Arial;
		    font-size: 14px;
		    color: #444;
		}
		-->
		table {
		    *border-collapse: collapse; /* IE7 and lower */
		    border-spacing: 0;
		    width: 100%;    
		}
		
		.bordered {
		    border: solid #ccc 1px;
		    -moz-border-radius: 6px;
		    -webkit-border-radius: 6px;
		    border-radius: 6px;
		    -webkit-box-shadow: 0 1px 1px #ccc; 
		    -moz-box-shadow: 0 1px 1px #ccc; 
		    box-shadow: 0 1px 1px #ccc;         
		}
		
		.bordered tr:hover {
		    background: #fbf8e9;
		    -o-transition: all 0.1s ease-in-out;
		    -webkit-transition: all 0.1s ease-in-out;
		    -moz-transition: all 0.1s ease-in-out;
		    -ms-transition: all 0.1s ease-in-out;
		    transition: all 0.1s ease-in-out;     
		}    
		    
		.bordered td, .bordered th {
		    border-left: 1px solid #ccc;
		    border-top: 1px solid #ccc;
		    padding: 10px;
		    text-align: left;    
		}
		
		.bordered th {
		    background-color: #dce9f9;
		    background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
		    background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
		    background-image:    -moz-linear-gradient(top, #ebf3fc, #dce9f9);
		    background-image:     -ms-linear-gradient(top, #ebf3fc, #dce9f9);
		    background-image:      -o-linear-gradient(top, #ebf3fc, #dce9f9);
		    background-image:         linear-gradient(top, #ebf3fc, #dce9f9);
		    -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; 
		    -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;  
		    box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;        
		    border-top: none;
		    text-shadow: 0 1px 0 rgba(255,255,255,.5); 
		}
		
		.bordered td:first-child, .bordered th:first-child {
		    border-left: none;
		}
		
		.bordered th:first-child {
		    -moz-border-radius: 6px 0 0 0;
		    -webkit-border-radius: 6px 0 0 0;
		    border-radius: 6px 0 0 0;
		}
		
		.bordered th:last-child {
		    -moz-border-radius: 0 6px 0 0;
		    -webkit-border-radius: 0 6px 0 0;
		    border-radius: 0 6px 0 0;
		}
		
		.bordered th:only-child{
		    -moz-border-radius: 6px 6px 0 0;
		    -webkit-border-radius: 6px 6px 0 0;
		    border-radius: 6px 6px 0 0;
		}
		
		.bordered tr:last-child td:first-child {
		    -moz-border-radius: 0 0 0 6px;
		    -webkit-border-radius: 0 0 0 6px;
		    border-radius: 0 0 0 6px;
		}
		
		.bordered tr:last-child td:last-child {
		    -moz-border-radius: 0 0 6px 0;
		    -webkit-border-radius: 0 0 6px 0;
		    border-radius: 0 0 6px 0;
		}
		
		
		
		.zebra td, .zebra th {
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;    
}

.zebra tbody tr:nth-child(even) {
    background: #f5f5f5;
    -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; 
    -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;  
    box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;        
}

.zebra th {
    text-align: left;
    text-shadow: 0 1px 0 rgba(255,255,255,.5); 
    border-bottom: 1px solid #ccc;
    background-color: #eee;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#eee));
    background-image: -webkit-linear-gradient(top, #f5f5f5, #eee);
    background-image:    -moz-linear-gradient(top, #f5f5f5, #eee);
    background-image:     -ms-linear-gradient(top, #f5f5f5, #eee);
    background-image:      -o-linear-gradient(top, #f5f5f5, #eee); 
    background-image:         linear-gradient(top, #f5f5f5, #eee);
}

.zebra th:first-child {
    -moz-border-radius: 6px 0 0 0;
    -webkit-border-radius: 6px 0 0 0;
    border-radius: 6px 0 0 0;  
}

.zebra th:last-child {
    -moz-border-radius: 0 6px 0 0;
    -webkit-border-radius: 0 6px 0 0;
    border-radius: 0 6px 0 0;
}

.zebra th:only-child{
    -moz-border-radius: 6px 6px 0 0;
    -webkit-border-radius: 6px 6px 0 0;
    border-radius: 6px 6px 0 0;
}

.zebra tfoot td {
    border-bottom: 0;
    border-top: 1px solid #fff;
    background-color: #f1f1f1;  
}

.zebra tfoot td:first-child {
    -moz-border-radius: 0 0 0 6px;
    -webkit-border-radius: 0 0 0 6px;
    border-radius: 0 0 0 6px;
}

.zebra tfoot td:last-child {
    -moz-border-radius: 0 0 6px 0;
    -webkit-border-radius: 0 0 6px 0;
    border-radius: 0 0 6px 0;
}

.zebra tfoot td:only-child{
    -moz-border-radius: 0 0 6px 6px;
    -webkit-border-radius: 0 0 6px 6px
    border-radius: 0 0 6px 6px
}
  
		
		
		
		</style>

<link href="/resources/SpryAccordion.css" rel="stylesheet" type="text/css">
<script src="/resources/SpryAccordion.js" type="text/javascript"></script>
<script src="/resources/SpryAssets/SpryCollapsiblePanel.js" type="text/javascript"></script>
<link href="/resources/SpryAssets/SpryCollapsiblePanel.css" rel="stylesheet" type="text/css" />
<link href="/resources/SpryAssets/style.css" type="text/css" rel="stylesheet">

<div class="container">

	
	<div id="nav-header" class="nav-header">
			
		<div class="top-logo">
			<img id="logo" src="/resources/images/logo.png"/>
		</div>
		<ul class="nav navbar-nav top-menu">
			<li class="active">
				<a>首页</a>
			</li>
			<li>
				<a>工程</a>
			</li>
			<li>
				<a>定额</a>
			</li>
			<li>
				<a>+创建预算</a>
			</li>
		</ul>
		
		<ul class="nav navbar-nav navbar-right">	
			<li class="top-search search-view">
				<div class="search-form">
					<input type="search" placeholder="输入工程名/客户名/地址/电话号码 搜索工程" maxlength="100" class="form-control search-input pull-left">
					<button class="search-btn btn btn-default pull-left">
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
					<div class="bm-title">
					工程预算：无锡太湖国际社区20号楼801［草稿状态］
					</div>
					<div>
						<input type="radio"/> 一般视图
						<input type="radio"/> 汇总视图
						清单材料 费率设置
					</div>
				</div>
				<div class="t2">
					<div class="t21">
						吴女士 1390000000 二室一厅 138平 美式 高档 <a href="#" style="color:orange;">详细>></a>
					</div>
					<div class="t22">
						预算总价 $200,000
					</div>
				</div>
			</div>
			
			<div id="bm-body">
				<div id="bm-left">
					
					<div class="side-nav">
						<div class="header-panel whiteframe-z1">
							
							<div class="toolbar demo-toolbar">
								<div class="toolbar-tools">
							      <h3>
							        <span>工程部位</span>
							      </h3>
							    </div>
							</div>
							<div class="content content-padding" style="height:250px;">
								阿萨法十分
							</div>
						</div>
						
						<div class="header-panel whiteframe-z1">
							<div class="toolbar demo-toolbar">
								<div class="toolbar-tools">
							      <h3>
							        <span>定额</span>
							      </h3>
							    </div>
							</div>
							<div class="content content-padding" style="height:250px;">
								吖吖喂吖喂饭
							</div>
						</div>
						
					</div>
					
				</div>	
				<div id="bm-table-view" class="content" style="min-height: 300px;">
				
					<table class="data-table">
						<thead>
							<th>
								<td>项目</td>
								<td>数量</td>
								<td>单价</td>
								<td>金额</td>
								<td>备注</td>
							</th>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>2</td>
								<td>3</td>
								<td>4</td>
								<td>5</td>
							</tr>
							</tr>
								<td>11</td>
								<td>22</td>
								<td>33</td>
								<td>44</td>
								<td>55</td>
							</tr>
						</tbody>
					</table>			
					
					
					<div id="bm-footer">
				
						<div class="bottom-toolbar">
							<button class="btn btn-default">保存</button>
							<button class="btn btn-default">保存为模板</button>
							<button class="btn btn-default">审核锁定</button>
							<button class="btn btn-default">导出</button>
							<button class="btn btn-default">打印</button>
							<button class="btn btn-default">邮件发送</button>
						<div>
						
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








