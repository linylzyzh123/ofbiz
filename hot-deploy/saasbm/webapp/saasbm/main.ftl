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
		
		<div class="nav-bar-left">
			<div class="top-logo">
				<img id="logo" src="/resources/images/logo.png"/>
			</div>		
			<div class="top-menu">
				<div class="menu-item active">
					首页
				</div>
				<div class="menu-item">
					工程
				</div>
				<div class="menu-item">
					定额
				</div>
				<div class="menu-item">
					+创建预算
				</div>
			</div>
		</div>
		
		<div class="nav-bar-right">
			<div class="top-search">
				<form>
					<input id="search-ctrl" class="search-ctrl" type="text" placeholder="输入工程名/客户名/地址/电话号码 搜索工程"/>
					<button id="search" class="button" type="submit">搜索工程</button>
				</form>
			</div>
			<div class="account">
				<div class="account-menu">
					欢迎你，No.9+
				</div>
			</div>
		</div>
		
	</div>
	
	<div id="main-body" class="main-body">
		
		<div id="bm-container">
			
			<div id="bm-header">
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
					
					<div id="CollapsiblePanel1" class="CollapsiblePanel">
  <div class="CollapsiblePanelTab" tabindex="0">工程部位</div>
  <div class="CollapsiblePanelContent">
      <div class=pnav-cnt>
    <div class="pnav-box" id=letter-a>
        <div class=box-title><a class="btn-fold " href="#"></a><a class="btn-unfold hidden" 
	href="#"></a><span class=pnav-letter>装饰工程</span></div>
        <ul class="box-list hidden">
            <li><a class=btn-fold href="#"></a><a class="btn-unfold hidden" href="#"></a><b><a href="http://www.divcss5.com/">客厅</a> </b><span class="cDGray">（3.5*3.5*2.8）</span>
            <li><a class=btn-fold href="#"></a><a class="btn-unfold hidden" href="#"></a><b><a href="#">主卧</a> </b><span class="cDGray">（4*3.5*2.8）</span>

            <li><a class=btn-fold href="#"></a><a class="btn-unfold hidden" href="#"></a><b><a href="#">次卧</a> </b><span class="cDGray">（3.2*3.2*2.8）</span>
            <li><a class=btn-fold href="#"></a><a class="btn-unfold hidden" href="#"></a><b><a href="#">餐厅</a> </b><span class="cDGray">（3*3.2*2.8）</span>
            <li><a class=btn-fold href="#"></a><a class="btn-unfold hidden" href="#"></a><b><a href="#">卫生间</a> </b><span class="cDGray">（2.5*3*2.6）</span>

            </li>
        </ul>
    </div>

    <SCRIPT src="/resources/SpryAssets/js.js" type=text/javascript></SCRIPT> 
    <SCRIPT type=text/javascript>

(function(){
NTES("span.photo-search input[type=text]").addEvent("focus", function(){ this.value == this.defaultValue && (this.value = ""); }).addEvent("blur", function(){ this.value == "" && (this.value = this.defaultValue); });
	NTES("div.pnav-box div.box-title a.btn-fold").addEvent("click", function(e){
		e.preventDefault();
		var eleTitle = NTES(this.parentNode);
		NTES(this).addCss("hidden");
		eleTitle.$("a.btn-unfold").removeCss("hidden");
		NTES(eleTitle.parentNode).$("ul.box-list").removeCss("hidden");
	});
	NTES("div.pnav-box div.box-title a.btn-unfold").addEvent("click", function(e){
		e.preventDefault();
		var eleTitle = NTES(this.parentNode);
		NTES(this).addCss("hidden");
		eleTitle.$("a.btn-fold").removeCss("hidden");
		NTES(eleTitle.parentNode).$("ul.box-list").addCss("hidden");
	});
	NTES("div.pnav-box ul.box-list a.btn-fold").addEvent("click", function(e){
		e.preventDefault();
		var eleTitle = NTES(this.parentNode);
		NTES(this).addCss("hidden");
		eleTitle.$("a.btn-unfold").removeCss("hidden");
		eleTitle.$("h2").removeCss("hidden");
	});
	NTES("div.pnav-box ul.box-list a.btn-unfold").addEvent("click", function(e){
		e.preventDefault();
		var eleTitle = NTES(this.parentNode);
		NTES(this).addCss("hidden");
		eleTitle.$("a.btn-fold").removeCss("hidden");
		eleTitle.$("h2").addCss("hidden");
	});
	new NTES.ui.Slide(NTES("ul.photo-snav li"), NTES("div.photo-scnt"), "active", "mouseover", 6000);
})();

</SCRIPT> 
</div>
  </div>
</div>
<div id="CollapsiblePanel2" class="CollapsiblePanel">
  <div class="CollapsiblePanelTab" tabindex="0">定额</div>
  <div class="CollapsiblePanelContent">
      <div>
         <select name="类型">
         <option>不限</option>
         <option>工艺定额</option>
         <option>材料定额</option>
         <option>人工定额</option>
         </select>
      </div>
      <div><input name="名称" type="text" value="输入定额名称" /> <input name="查询按钮" type="button" value="查" /></div>
      <div><textarea name="定额" cols="29" rows="10"></textarea></div>
  </div>
</div>
<script type="text/javascript">
var CollapsiblePanel1 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel1");
var CollapsiblePanel2 = new Spry.Widget.CollapsiblePanel("CollapsiblePanel2");
</script>
				</div>
				<div id="bm-table-view">
				
					<div id="Accordion1" class="Accordion" tabindex="0">
					  <div class="AccordionPanel">
					    <div class="AccordionPanelTab">客厅</div>
					    	<div class="AccordionPanelContent">
								<table class="bordered">
								    <thead>
								    <tr>
								        <th>项目</th>        
								        <th>数量</th>
								        <th>单价</th>
								        <th>规格</th>
								        <th>金额</th>
								        <th>备注</th>
								    </tr>
								    </thead>
								   
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr>    
									<tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
									<tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								</table>
								    </div>
								  </div>
								  <div class="AccordionPane1">
								    <div class="AccordionPanelTab">厨房</div>
								    <div class="AccordionPanelContent">
									<table class="zebra">
								    <thead>
								    <tr>
								        <th>项目</th>        
								        <th>数量</th>
								        <th>单价</th>
								        <th>规格</th>
								        <th>金额</th>
								        <th>备注</th>
								
								    </tr>
								    </thead>
								     <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr>    
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr>
								     <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								     <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr>  
								</table>
								</div>
								  </div>
								<div class="AccordionPanel">
								    <div class="AccordionPanelTab">卫生间</div>
								    <div class="AccordionPanelContent">
								<table class="zebra">
								    <thead>
								    <tr>
								        <th>项目</th>        
								        <th>数量</th>
								        <th>单价</th>
								        <th>规格</th>
								        <th>金额</th>
								        <th>备注</th>
								
								    </tr>
								    </thead>
								     <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr>    
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								    <tr>
								        <td>地面找平</td> 
								        <td>2</td>
								        <td>25.00</td>
								        <td>50.00</td> 
								        <td>平米</td>
								        <td>人工....</td>
								    </tr> 
								</table>
										</div>
									</div>
								</div>
							</div>
			
			</div>
			
			<div id="bm-footer">
				
				<div class="toolbar">
					<button class="button">保存</button>
					<button class="button">保存为模板</button>
					<button class="button">审核锁定</button>
					<button class="button">导出</button>
					<button class="button">打印</button>
					<button class="button">邮件发送</button>
				<div>
				
			</div>
			
		</div>
		
		
		
	</div>
	
	<#--
	<div id="footer" class="footer">
		.footer
	</div>
	-->

</div>

<script type="text/javascript">
	var Accordion1 = new Spry.Widget.Accordion("Accordion1");
</script>







