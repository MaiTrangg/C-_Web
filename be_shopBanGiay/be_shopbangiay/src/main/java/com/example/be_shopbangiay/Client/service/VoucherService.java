package com.example.be_shopbangiay.Client.service;

import com.example.be_shopbangiay.Client.entity.Voucher;
import com.example.be_shopbangiay.Client.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherService {

    private final VoucherRepository voucherRepository;

    public Optional<Voucher> getVoucherByCode(String code) {
        return voucherRepository.findByCode(code);
    }

    public boolean isVoucherValid(Voucher voucher) {
        return voucher != null && (voucher.getExpiryDate() == null || !voucher.getExpiryDate().isBefore(LocalDate.now()));
    }

    public boolean isEligibleForOrder(Voucher voucher, BigDecimal orderTotal) {
        if (voucher.getMinOrderAmount() == null) return true;
        return orderTotal.compareTo(voucher.getMinOrderAmount()) >= 0;
    }

    public List<Voucher> getAvailableVouchers() {
        LocalDate today = LocalDate.now();
        return voucherRepository.findAll().stream()
                .filter(v -> v.getExpiryDate() == null || !v.getExpiryDate().isBefore(today))
                .collect(Collectors.toList());
    }
}
