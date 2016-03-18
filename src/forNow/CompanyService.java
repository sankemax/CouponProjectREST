package service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import core.CouponSystemException;
import core.beans.Company;
import core.beans.Coupon;
import core.beans.CouponType;
import facade.CompanyFacade;
import utilities.MainUtility;
import utilities.RestException;

@Path("/company")
public class CompanyService {

	@Context
	private HttpServletRequest request;

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Map<String, String> uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) throws IOException {

		System.out.println(fileDetail.getFileName());
		Map<String, String> map = new HashMap<>();
		String fileLocation = "c://Users/meir/workspace/CouponREST/WebContent/Images/" + fileDetail.getFileName();

		FileOutputStream out;
		int read = 0;
		byte[] bytes = new byte[1024];
		
		out = new FileOutputStream(new File(fileLocation));
		
		while ((read = uploadedInputStream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}
		out.close();

		map.put("success", "Images/" + fileDetail.getFileName());
		return map;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)

	public Map<String, String> createCoupon(Coupon coupon) throws RestException, CouponSystemException {
		Map<String, String> map = new HashMap<>();
		System.out.println(coupon);
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		companyFacade.createCoupon(coupon);
		map.put("success", "coupon created");
		return map;
	}

	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> removeCoupon(Coupon coupon) throws RestException, CouponSystemException {

		Map<String, String> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		companyFacade.removeCoupon(coupon);
		map.put("success", "coupon removed");
		return map;
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> updateCoupon(Coupon coupon) throws RestException, CouponSystemException {
		System.out.println(coupon.getPrice());
		Map<String, String> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		companyFacade.updateCoupon(coupon);
		map.put("success", "coupon updated");
		return map;
	}

	@GET
	@Path("/coupon")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, Coupon> getCoupon(@QueryParam("id") long id) throws RestException, CouponSystemException {

		Map<String, Coupon> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("coupon", companyFacade.getCoupon(id));
		return map;
	}

	@GET
	@Path("/coupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getAllCoupons() throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("coupons", companyFacade.getAllCoupons());
		return map;
	}

	@GET
	@Path("/couponstype")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getCouponByType(@QueryParam("type") CouponType type)
			throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("coupon", companyFacade.getCouponByType(type));
		return map;
	}

	@GET
	@Path("/couponsdate")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getCouponByDate(@QueryParam("date") long date)
			throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("coupons", companyFacade.getCouponByDate(new Date(date)));
		return map;
	}

	@GET
	@Path("/couponsprice")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Coupon>> getCouponByPrice(@QueryParam("price") double price)
			throws RestException, CouponSystemException {
		Map<String, List<Coupon>> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("coupons", companyFacade.getCouponByPrice(price));
		return map;
	}

	@GET
	@Path("/couponame")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, Coupon> getCouponByTitle(@QueryParam("title") String title)
			throws RestException, CouponSystemException {
		Map<String, Coupon> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("coupon", companyFacade.getCouponByTitle(title));
		return map;
	}

	@GET
	@Path("/thiscomp")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, Company> getThisCompanyDetails() throws RestException, CouponSystemException {

		Map<String, Company> map = new HashMap<>();
		CompanyFacade companyFacade = (CompanyFacade) MainUtility.getFacade(request, CompanyFacade.class);
		map.put("company", companyFacade.getThisCompany());
		return map;
	}

}
