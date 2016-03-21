package utilities;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.core.header.FormDataContentDisposition;

import core.CouponSystemException;
import core.beans.Coupon;
import facade.CompanyFacade;
import facade.CustomerFacade;

@Path("/imageservice")
public class ImageUtility {
	
	@Context private HttpServletRequest request;
	private static String imageBaseDir = MainUtility.IMAGE_BASE_DIR;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> getImage(
			@QueryParam("coupname")String couponTitle,
			@QueryParam("imagename")String imageFile,
			@QueryParam("original")String size,
			@QueryParam("type")String asker)
					throws RestException, CouponSystemException, IOException {
		
		Map<String, String> map = new HashMap<>();
		Matcher matcher = Pattern.compile("^.+\\.(\\D+)$").matcher(imageFile);
		matcher.matches();
		String imageFormat = matcher.group(1);

		BufferedImage image;
		if (asker.equals("customer")) {			
			CustomerFacade customerFacade = (CustomerFacade)MainUtility.getFacade(request, CustomerFacade.class);
			image = ImageUtility.getImageFromFileSystem(customerFacade.getImagePathOfCoupon(couponTitle), couponTitle, imageFile);
		} else {
			CompanyFacade companyFacade = MainUtility.getFacade(request, CompanyFacade.class);
			image = ImageUtility.getImageFromFileSystem(companyFacade.getThisCompany().getId(), couponTitle, imageFile);
		}
		String base64Image;
		
		if (! size.equals("true")) {
			matcher = Pattern.compile("^(\\d+){1,4}x(\\d+){1,4}$").matcher(size);
			matcher.matches();
			image = ImageUtility.resizeImage(image, Integer.parseInt(matcher.group(1)), Integer.parseInt(matcher.group(2)));
			base64Image = ImageUtility.getBase64Image(image, imageFormat);
		} else {
			base64Image = ImageUtility.getBase64Image(image, imageFormat);
		}
		
		map.put("success", base64Image);
		return map;
	}
	
	public static void uploadImage(long companyId, String couponTitle, FormDataContentDisposition fileDetail, InputStream uploadedInputStream) throws IOException {
		
		String fileDir = imageBaseDir + "/" + companyId + "/" + couponTitle;
		String fileLogicalPath = fileDir + "/" + fileDetail.getFileName();
		
		// create directory if doesn't exist
		File dir = new File(fileDir);
		if (!dir.isDirectory())
			dir.mkdirs();

		FileOutputStream out = null;
		File file = new File(fileLogicalPath);
		
		// delete file if same filename exists
		if (file.exists()) file.delete();

		// write image file to directory
		out = new FileOutputStream(file);

		int read = 0;
		byte[] bytes = new byte[1024];

		while ((read = uploadedInputStream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}
		out.close();
	}
	
	public static String getBase64Image(BufferedImage image, String format) throws IOException {
		
		// turn to base 64
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		// change to JPG to conserve space
//		ImageIO.write(image, format, baos);
		ImageIO.write(image, "jpg", baos);
		String base64Image = Base64.getEncoder().encodeToString(baos.toByteArray());
		baos.close();
		
		return "data:image/" + format + ";base64," + base64Image;
	}
	
	public static BufferedImage resizeImage(BufferedImage imageSrc, int width, int height) {
		// resize image
		BufferedImage outImage = new BufferedImage(width, height, imageSrc.getType());
		outImage.createGraphics().drawImage(imageSrc.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);
		return outImage;
	}
	
	public static void removeImageFromFileSystem(Coupon coupon, long companyId) {
		
		File couponImageDir;

		// delete coupon image from server - delete all coupon images from this company if coupon == null
		if (coupon != null) {
			couponImageDir = new File(imageBaseDir + "/" + companyId + "/" + coupon.getTitle() + "/" + coupon.getImage());
			couponImageDir.delete();
			couponImageDir.getParentFile().delete();
		} else {
			couponImageDir = new File(imageBaseDir + "/" + companyId);
			File[] couponDirs = couponImageDir.listFiles();
			for (File couponDir : couponDirs) {
				couponDir.listFiles()[0].delete();
				couponDir.delete();
			}
			couponImageDir.delete();
		}
		return;
	}
	
	public static BufferedImage getImageFromFileSystem(long companyId, String couponTitle, String imageFile) throws RestException, IOException {
		
		String imagePath = null;
		BufferedImage image = null;
		
		imagePath = imageBaseDir + "/" + Long.toString(companyId) + "/" + couponTitle + "/" + imageFile;
		image = ImageIO.read(new File(imagePath));
		return image;
	}
}
