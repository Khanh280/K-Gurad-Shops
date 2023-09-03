package com.example.k_guard_shop_be.service.profit;

import com.example.k_guard_shop_be.dto.ProfitDTO;
import com.example.k_guard_shop_be.repository.IProfitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProfitService implements IProfitService {
    @Autowired
    private IProfitRepository iProfitRepository;

    public String checkCurrentDate(String startMonth, String endMonth, String years) {
        String currentYear = String.valueOf(LocalDateTime.now().getYear());
        if (!years.equals("")) {
            return years;
        } else {
            if (startMonth.equals("") && endMonth.equals("")) {
                return String.valueOf(LocalDateTime.now().getYear());
            } else {
                return currentYear;
            }
        }
    }

    @Override
    public List<ProfitDTO> getProfit(String startMonth, String endMonth, String years) {
        String currentYear = checkCurrentDate(startMonth, endMonth, years);
        return iProfitRepository.getProfit(startMonth, endMonth, currentYear);
    }
}
