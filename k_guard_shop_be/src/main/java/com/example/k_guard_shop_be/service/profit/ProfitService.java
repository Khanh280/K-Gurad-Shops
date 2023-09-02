package com.example.k_guard_shop_be.service.profit;

import com.example.k_guard_shop_be.dto.ProfitDTO;
import com.example.k_guard_shop_be.repository.IProfitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProfitService implements IProfitService{
    @Autowired
    private IProfitRepository iProfitRepository;
    @Override
    public List<ProfitDTO> getProfit() {
        return iProfitRepository.getProfit();
    }
}
