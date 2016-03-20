package utilities;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import core.CouponSystemException;

@Provider
public class ExceptionDelegator implements ExceptionMapper<Exception> {

	@Override
	public Response toResponse(Exception error) {
		Map<String, String> map = new HashMap<>();
		Response response = null;
				
		if (error instanceof CouponSystemException) {
			map.put("error", error.getMessage());
			response = Response.status(510)
	                .entity(map).type(MediaType.APPLICATION_JSON).build();
		}
		
		else if (error instanceof RestException) {
			map.put("error", error.getMessage());
			response = Response.status(520)
	                .entity(map).type(MediaType.APPLICATION_JSON).build();
	    } 
	    	
		else {
	    	map.put("error", error.getMessage());
	        response = Response.status(Response.Status.INTERNAL_SERVER_ERROR)
	                .entity(map).type(MediaType.APPLICATION_JSON).build();
		}
		
		// TODO for debugging only. remove before submitting! 
		System.out.println(Calendar.getInstance().getTime());
		error.printStackTrace();
		return response;
	}

}
