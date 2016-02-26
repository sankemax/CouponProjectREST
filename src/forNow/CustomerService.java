package forNow;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import core.CouponSystemException;
import core.beans.Coupon;
import core.beans.CouponType;
import facade.CustomerFacade;

@Path("/customer")
public class CustomerService {
	
	@Context
	HttpServletRequest request;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String>  purchaseCoupon(Coupon coupon){
		Map<Integer, String> map = new HashMap<>();
		try{
			CustomerFacade customerFacade = (CustomerFacade)Utility.getFacade(request);
			customerFacade.purchaseCoupon(coupon);
			map.put(200, "ok");
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getAllPurchasedCoupons(){
		Map<Integer, Object> map = new HashMap<>();
		try{
			CustomerFacade customerFacade = (CustomerFacade)Utility.getFacade(request);
			map.put(200, customerFacade.getAllpurchasedCoupons());
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("getCouponsType")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getAllPurchasedCouponsByType(@QueryParam("type")CouponType type){
		Map<Integer, Object> map = new HashMap<>();
		try{
			CustomerFacade customerFacade = (CustomerFacade)Utility.getFacade(request);
			map.put(200, customerFacade.getAllpurchasedCouponByType(type));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("getCouponsPrice")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getAllPurchasedCouponBysPrice(@QueryParam("price")double price){
		Map<Integer, Object> map = new HashMap<>();
		try{
			CustomerFacade customerFacade = (CustomerFacade)Utility.getFacade(request);
			map.put(200, customerFacade.getAllpurchasedCouponByPrice(price));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("getCouponsDate")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getAllPurchasedCouponBysDate(@QueryParam("date")long date){
		Map<Integer, Object> map = new HashMap<>();
		try{
			CustomerFacade customerFacade = (CustomerFacade)Utility.getFacade(request);
			map.put(200, customerFacade.getAllpurchasedCouponByDate(new Date(date)));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	

}
