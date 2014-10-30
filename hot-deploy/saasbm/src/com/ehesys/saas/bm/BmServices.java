package com.ehesys.saas.bm;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import javolution.util.FastMap;
import net.sf.json.JSONObject;

import org.ofbiz.entity.Delegator;
import org.ofbiz.security.Security;
import org.ofbiz.service.DispatchContext;
import org.ofbiz.service.ModelService;
import org.ofbiz.service.ServiceUtil;


public class BmServices {

	public static final String module = BmServices.class.getName();
	
	
	/**
	 * 读取预算文档
	 * @param ctx
	 * @param context
	 * @return
	 */
    public static Map<String, Object> getBmDocument(DispatchContext ctx, Map<String, ?> context) {
    	
    	Map<String, Object> result = ServiceUtil.returnSuccess();
        Delegator delegator = ctx.getDelegator();
        Security security = ctx.getSecurity();
        
		try {
			
			String initialPath = "runtime/bmDocs/bmDoc.json";
			
			String ofbizHome = System.getProperty("ofbiz.home");

	        if (!initialPath.startsWith("/")) {
	            initialPath = "/" + initialPath;
	        }
	        String dir = ofbizHome + initialPath;
	        
			FileReader reader = new FileReader(dir);
			StringBuffer sb = new StringBuffer();
			char[] c = new char[1024];
			int size = 0;
			while ((size = reader.read(c)) > 0) {
				sb.append(c, 0, size);
			}
			reader.close();
			
			JSONObject document = JSONObject.fromObject(sb.toString());
			
			
			result.put("document", document);
			return result;
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        return result;
    }
	
	
	
	
}
