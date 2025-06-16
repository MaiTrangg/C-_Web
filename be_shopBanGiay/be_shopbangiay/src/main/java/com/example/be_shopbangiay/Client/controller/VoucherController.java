package com.example.be_shopbangiay.Client.controller;

import com.example.be_shopbangiay.Client.entity.Voucher;
import com.example.be_shopbangiay.Client.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/voucher")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    @GetMapping("/check")
    public ResponseEntity<?> checkVoucher(@RequestParam String code, @RequestParam(required = false) BigDecimal total) {
        Optional<Voucher> optionalVoucher = voucherService.getVoucherByCode(code);

        if (optionalVoucher.isEmpty()) {
            return ResponseEntity.badRequest().body("Mã không tồn tại");
        }

        Voucher voucher = optionalVoucher.get();

        if (!voucherService.isVoucherValid(voucher)) {
            return ResponseEntity.badRequest().body("Mã đã hết hạn");
        }

        if (total != null && !voucherService.isEligibleForOrder(voucher, total)) {
            return ResponseEntity.badRequest().body("Mã chỉ áp dụng cho đơn hàng từ " + voucher.getMinOrderAmount().intValue() + "đ trở lên");
        }

        return ResponseEntity.ok(voucher);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAvailableVouchers() {
        List<Voucher> vouchers = voucherService.getAvailableVouchers();
        return ResponseEntity.ok(vouchers);
    }



}
