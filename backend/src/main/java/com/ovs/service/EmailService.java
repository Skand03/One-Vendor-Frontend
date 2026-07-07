package com.ovs.service;

import com.ovs.entity.Booking;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendBookingNotification(Booking booking) {
        String recipient = "onevendorsolutions@gmail.com";
        String subject = "New Service Booking Request - " + booking.getFullName();

        String htmlContent = "<html>" +
                "<body style='font-family: Arial, sans-serif; color: #0E1D27; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D4AF37; border-radius: 8px;'>" +
                "<h2 style='background-color: #0A2342; color: #ffffff; padding: 15px; margin-top: 0; text-align: center; border-radius: 4px;'>One Vendor Solutions</h2>" +
                "<h3>New Booking Request Details</h3>" +
                "<table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold; width: 150px;'>Customer Name:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'>" + booking.getFullName() + "</td>" +
                "  </tr>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold;'>Phone:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'><a href='tel:" + booking.getPhone() + "'>" + booking.getPhone() + "</a></td>" +
                "  </tr>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold;'>Email:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'><a href='mailto:" + booking.getEmail() + "'>" + booking.getEmail() + "</a></td>" +
                "  </tr>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold;'>Category:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'>" + (booking.getCategory() != null ? booking.getCategory().getName() : "N/A") + "</td>" +
                "  </tr>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold;'>Service:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'>" + (booking.getService() != null ? booking.getService().getName() : "N/A") + "</td>" +
                "  </tr>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold;'>Preferred Date:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'>" + booking.getPreferredDate() + " (" + (booking.getTimeSlot() != null ? booking.getTimeSlot() : "Anytime") + ")</td>" +
                "  </tr>" +
                "  <tr>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9; font-weight: bold;'>Address:</td>" +
                "    <td style='padding: 8px; border-bottom: 1px solid #E2E4E9;'>" + booking.getAddress() + "</td>" +
                "  </tr>" +
                "</table>" +
                "<div style='margin-top: 20px; background-color: #F6FAFF; padding: 15px; border-left: 4px solid #D4AF37;'>" +
                "  <p style='margin: 0; font-weight: bold;'>Customer Message:</p>" +
                "  <p style='margin: 10px 0 0 0;'>" + (booking.getMessage() != null ? booking.getMessage() : "No message provided.") + "</p>" +
                "</div>" +
                "<p style='font-size: 11px; color: #74777E; text-align: center; margin-top: 30px;'>This is an automated request sent from the One Vendor Solutions Platform.</p>" +
                "</body>" +
                "</html>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("Booking notification email sent successfully to {}", recipient);
        } catch (Exception e) {
            // Log failure but do not crash the booking process
            logger.error("Failed to send booking notification email to {}. Error: {}", recipient, e.getMessage());
            logger.info("FALLBACK - Displaying email details that would have been sent:\nSubject: {}\nContent: {}", subject, htmlContent);
        }
    }
}
