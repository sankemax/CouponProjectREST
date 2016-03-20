package utilities;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import com.sun.jersey.core.header.FormDataContentDisposition;

import core.beans.Coupon;

public class ImageUtility {
	
	private static String imageBaseDir = MainUtility.IMAGE_BASE_DIR;
	
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
	
	public static void removeImage(Coupon coupon, long companyId) {
		// delete coupon image from server
		File couponImageDir = new File(imageBaseDir + "/" + companyId + "/" + coupon.getTitle());
		
		// delete coupon image/s
		String[] filesToDelete = couponImageDir.list();
		if (filesToDelete != null) {

			File image = new File(couponImageDir, coupon.getImage());
			if (image.exists()) image.delete();
		}
		
		// delete coupon dir
		couponImageDir.delete();

	}
	
	public static BufferedImage createImage(long companyId, String couponTitle, String imageFile) throws RestException {
		
		String imagePath = null;
		BufferedImage image = null;
		
		imagePath = imageBaseDir + "/" + Long.toString(companyId) + "/" + couponTitle + "/" + imageFile;
		try {
			image = ImageIO.read(new File(imagePath));
		} catch(IOException e) {
			throw new RestException(e.getMessage());
		}
		
		return image;
	}
}
