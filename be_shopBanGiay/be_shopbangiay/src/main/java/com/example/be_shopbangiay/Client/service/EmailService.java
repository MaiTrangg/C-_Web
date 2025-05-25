package com.example.be_shopbangiay.Client.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetPasswordEmail(String toEmail, String resetLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String htmlContent = "<p>You requested to reset your password.</p>"
                + "<p>Click the button below to reset it:</p>"
                + "<a href=\"" + resetLink + "\" "
                + "style=\"display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; "
                + "text-decoration: none; border-radius: 5px;\">Reset Password</a>"
                + "<p>If the button doesn't work, you can copy and paste the link below into your browser:</p>"
                + "<p style=\"word-break: break-all; color: #888; font-size: 14px;\">" + resetLink + "</p>";

        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request");
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}

