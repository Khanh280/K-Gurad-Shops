package com.example.k_guard_shop_be.service.profit;

import com.example.k_guard_shop_be.dto.ProfitDTO;

import java.util.List;

public interface IProfitService {
    List<ProfitDTO> getProfit(String startMonth,String endMonth,String years);
}
