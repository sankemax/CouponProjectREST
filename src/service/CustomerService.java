package service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
import utilities.MainUtility;
import utilities.RestException;

@Path("/customer")
public class CustomerService {
	
	@Context private HttpServletRequest request;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String>  purchaseCoupon(Coupon coupon) throws RestException, CouponSystemException {
		Map<String, String> map = new HashMap<>();
		CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
		customerFacade.purchaseCoupon(coupon);
		map.put("success", "coupon purchased");
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getAllPurchasedCoupons() throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
		map.put("coupons", customerFacade.getAllpurchasedCoupons());
		return map;
	}
	
	@GET
	@Path("/couponstype")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getAllPurchasedCouponsByType(@QueryParam("type")CouponType type) throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
		map.put("coupons", customerFacade.getAllpurchasedCouponByType(type));
		return map;
	}
	
	@GET
	@Path("/couponsprice")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getAllPurchasedCouponBysPrice(@QueryParam("price")double price) throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
		map.put("coupons", customerFacade.getAllpurchasedCouponByPrice(price));
		return map;
	}
	
	@GET
	@Path("/couponsdate")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getAllPurchasedCouponBysDate(@QueryParam("date")long date) throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
		map.put("coupons", customerFacade.getAllpurchasedCouponByDate(new Date(date)));
		return map;
	}
	
	@GET
	@Path("/couponstobuy")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getAllAvailableCoupons() throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
		map.put("coupons", customerFacade.getAvailableCouponsToPurchase());
		return map;
	}
}
