package forNow;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import core.CouponSystemException;
import core.beans.Coupon;
import core.beans.CouponType;
import facade.CompanyFacade;


@Path("/company")
public class CompanyService {

	@Context
	HttpServletRequest request;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> createCoupon(Coupon coupon){
		Map<Integer, String> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			companyFacade.createCoupon(coupon);
			map.put(200, "ok");
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return  map;
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> removeCoupon(Coupon coupon){
		
		Map<Integer, String> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			companyFacade.removeCoupon(coupon);
			map.put(200, "ok");
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> updateCoupon(Coupon coupon) throws CouponSystemException{
		Map<Integer, String> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			companyFacade.updateCoupon(coupon);
			map.put(200, "ok");
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("/getCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getCoupon(@QueryParam("id") long id){
		
		Map<Integer, Object> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			map.put(200, companyFacade.getCoupon(id));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("/getCoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getAllCoupons(){
		Map<Integer, Object> map = new HashMap<Integer, Object>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			map.put(200, companyFacade.getAllCoupons());
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("/getCouponsType")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getCouponByType(@QueryParam("type") CouponType type){
		Map<Integer, Object> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			map.put(200, companyFacade.getCouponByType(type));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("/getCouponsDate")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getCouponByDate(@QueryParam("date") long date){
		Map<Integer, Object> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			map.put(200, companyFacade.getCouponByDate(new Date(date)));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("/getCouponsPrice")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getCouponByPrice(@QueryParam("price") double price){
		Map<Integer, Object> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			map.put(200, companyFacade.getCouponByPrice(price));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Path("/getCouponName")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, Object> getCouponByTitle(@QueryParam("title") String title){
		Map<Integer, Object> map = new HashMap<>();
		try {
			CompanyFacade companyFacade = (CompanyFacade)Utility.getFacade(request);
			map.put(200, companyFacade.getCouponByTitle(title));
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	
}
