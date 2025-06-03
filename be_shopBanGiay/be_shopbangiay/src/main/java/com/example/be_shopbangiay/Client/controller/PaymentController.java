package com.example.be_shopbangiay.Client.controller;
//
//import com.example.be_shopbangiay.Client.config.Config;
//import com.example.be_shopbangiay.Client.dto.PaymentResDTO;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.text.SimpleDateFormat;
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/payment")
//public class PaymentController {
//    @GetMapping("create_payment")
//    public ResponseEntity<?> createPayment() throws UnsupportedEncodingException {
//
////        String vnp_Version = "2.1.0";
////        String vnp_Command = "pay";
//        String orderType = "other";
////        long amount = Integer.parseInt(req.getParameter("amount"))*100;
////        String bankCode = req.getParameter("bankCode");
//        long amount = 1000*100;
//
//        String vnp_TxnRef = Config.getRandomNumber(8);
////        String vnp_IpAddr = Config.getIpAddress(req);
//
//
//        String vnp_TmnCode = Config.vnp_TmnCode;
//
//        Map<String, String> vnp_Params = new HashMap<>();
//        vnp_Params.put("vnp_Version", Config.vnp_Version);
//        vnp_Params.put("vnp_Command", Config.vnp_Command);
//        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
//        vnp_Params.put("vnp_Amount", String.valueOf(amount));
//        vnp_Params.put("vnp_CurrCode", "VND");
//        vnp_Params.put("vnp_BankCode", "NCB");
//
////
////        if (bankCode != null && !bankCode.isEmpty()) {
////            vnp_Params.put("vnp_BankCode", bankCode);
////        }
//        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
//        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
//        vnp_Params.put("vnp_Locale", "vn");
//        vnp_Params.put("vnp_OrderType", orderType);
//
////        String locate = req.getParameter("language");
////        if (locate != null && !locate.isEmpty()) {
////            vnp_Params.put("vnp_Locale", locate);
////        } else {
////            vnp_Params.put("vnp_Locale", "vn");
////        }
////        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
////        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
//
//        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_CreateDate = formatter.format(cld.getTime());
//        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//
//        cld.add(Calendar.MINUTE, 15);
//        String vnp_ExpireDate = formatter.format(cld.getTime());
//        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
//
//        List fieldNames = new ArrayList(vnp_Params.keySet());
//        Collections.sort(fieldNames);
//        StringBuilder hashData = new StringBuilder();
//        StringBuilder query = new StringBuilder();
//        Iterator itr = fieldNames.iterator();
//        while (itr.hasNext()) {
//            String fieldName = (String) itr.next();
//            String fieldValue = (String) vnp_Params.get(fieldName);
//            if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                //Build hash data
//                hashData.append(fieldName);
//                hashData.append('=');
//                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                //Build query
//                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
//                query.append('=');
//                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                if (itr.hasNext()) {
//                    query.append('&');
//                    hashData.append('&');
//                }
//            }
//        }
//        String queryUrl = query.toString();
//        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
//        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
//        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
////        com.google.gson.JsonObject job = new JsonObject();
////        job.addProperty("code", "00");
////        job.addProperty("message", "success");
////        job.addProperty("data", paymentUrl);
////        Gson gson = new Gson();
////        resp.getWriter().write(gson.toJson(job));
//        PaymentResDTO paymentResDTO = new PaymentResDTO();
//        paymentResDTO.setStatus("OK");
//        paymentResDTO.setMessage("successfully");
//        paymentResDTO.setUrl(paymentUrl);
//
//        return ResponseEntity.status(HttpStatus.OK).body(paymentResDTO);
//    }
//}
//
//
//
//
//package com.vnpay.controller;

import com.example.be_shopbangiay.Client.config.Config;
import com.example.be_shopbangiay.Client.dto.*;
import com.example.be_shopbangiay.Client.service.OrderService;
import com.nimbusds.jose.shaded.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    OrderService orderService;

    @PostMapping("/create_payment")
    public ResponseEntity<PaymentResDTO> createPayment(
            @RequestBody PaymentOrderRequest request,
            HttpServletRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("user: "+userDetails);
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new PaymentResDTO("401", "Bạn cần đăng nhập để thực hiện thanh toán", null)
            );
        }
        int amount = request.getAmount();
        String bankCode = request.getBankCode();
        String language = request.getLanguage();

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long vnp_Amount = amount * 100;

        Integer userId = extractUserIdFromUserDetails(userDetails);

        // Gọi service tạo đơn hàng, trạng thái "Chờ thanh toán"
        OrderResponse orderResponse = orderService.placeOrder(userId, request.getOrderRequest());

        // Giả sử OrderResponse có thêm transactionId (hoặc orderId) để làm vnp_TxnRef
        Long vnp_TxnRef = orderResponse.getId();

//        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = Config.getIpAddress(req);
        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(vnp_Amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }

        vnp_Params.put("vnp_TxnRef",String.valueOf(vnp_TxnRef) );
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", (language != null && !language.isEmpty()) ? language : "vn");
        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(calendar.getTime());
        calendar.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(calendar.getTime());

        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Iterator<String> it = fieldNames.iterator(); it.hasNext(); ) {
            String name = it.next();
            String value = vnp_Params.get(name);
            if (value != null && !value.isEmpty()) {
//                hashData.append(name).append("=").append(value);
                hashData.append(name).append("=").append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                query.append(URLEncoder.encode(name, StandardCharsets.US_ASCII))
                        .append("=")
                        .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                if (it.hasNext()) {
                    hashData.append("&");
                    query.append("&");
                }
            }
        }

        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());

        System.out.println("vnp_SecureHash gửi đi: " + vnp_SecureHash);

        query.append("&vnp_SecureHash=").append(vnp_SecureHash);
        String paymentUrl = Config.vnp_PayUrl + "?" + query;
        System.out.println("hashData khi gửi sang VNPAY: " + paymentUrl);

        PaymentResDTO response = new PaymentResDTO("00", "success", paymentUrl);
        return ResponseEntity.ok(response);
    }

    private Integer extractUserIdFromUserDetails(UserDetails userDetails) {
        System.out.println("UserDetails class: " + (userDetails == null ? "null" : userDetails.getClass().getName()));

        if (userDetails instanceof CustomUserDetails custom) {
            return custom.getUserID();
        }
        throw new IllegalArgumentException("Invalid user details");
    }


    @PostMapping("/vnpay_return")
    public ResponseEntity<?> handleVnpayReturn(@RequestBody Map<String, String> vnpParams,
                                               @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Bạn cần đăng nhập để thực hiện thanh toán"));
        }

//        // Tách chữ ký ra khỏi map
//        String receivedHash = vnpParams.remove("vnp_SecureHash");
//        vnpParams.remove("vnp_SecureHashType");
//
//        System.out.println("vnp_SecureHash nhận được từ frontend: " + receivedHash);
//
//        // Tính lại hash
//        String calculatedHash = Config.hashAllFields(vnpParams);
//        System.out.println("vnp_SecureHash tính lại từ server: " + calculatedHash);
//
//        if (!calculatedHash.equals(receivedHash)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(Map.of("message", "Sai chữ ký (Invalid signature)"));
//        }

        // Nếu hợp lệ thì xử lý đơn hàng
        String responseCode = vnpParams.get("vnp_ResponseCode");
        String txnRef = vnpParams.get("vnp_TxnRef");

        if ("00".equals(responseCode)) {
            orderService.updateOrderStatus(Long.parseLong(txnRef), "Đã thanh toán");
            return ResponseEntity.ok(Map.of("message", "Thanh toán thành công"));
        } else {
            orderService.updateOrderStatus(Long.parseLong(txnRef), "Thanh toán thất bại");
            return ResponseEntity.ok(Map.of("message", "Thanh toán thất bại"));
        }
    }




}
