package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.dto.ProfitDTO;
import com.example.k_guard_shop_be.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProfitRepository extends JpaRepository<OrderDetail, Long> {
    @Query(value = "select\n" +
            "       p.id as id,\n" +
            "       p.name as productName,\n" +
            "       sum(od.price * od.quantity) as totalProfit,\n" +
            "       sum(od.quantity) as quantity,\n" +
            "       i.link as image \n" +
            "from order_detail od\n" +
            "         inner join product_size ps on od.product_size_id = ps.id\n" +
            "         inner join product p on ps.product_id = p.id\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "where i.id in (select min(i.id)\n" +
            "               from images i\n" +
            "               group by i.product_id)\n" +
            "  and week(od.create_date) = week(current_date)\n" +
            "group by p.id, i.link\n" +
            "order by totalProfit desc\n" +
            "limit 10;", nativeQuery = true)
    List<ProfitDTO> getProfit();
}
