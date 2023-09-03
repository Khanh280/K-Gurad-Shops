package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.dto.ProfitDTO;
import com.example.k_guard_shop_be.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProfitRepository extends JpaRepository<OrderDetail, Long> {
    @Query(value = "select p.id as id,\n" +
            "       p.name as productName,\n" +
            "       sum(od.price * od.quantity) as totalProfit,\n" +
            "       sum(od.quantity) as quantity,\n" +
            "       i.link as image\n" +
            "from order_detail od\n" +
            "         inner join product_size ps on od.product_size_id = ps.id\n" +
            "         inner join product p on ps.product_id = p.id\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "where i.id in (select min(i.id)\n" +
            "               from images i\n" +
            "               group by i.product_id)\n" +
            "  AND YEAR(od.create_date) LIKE :currentYear\n" +
            "  AND (\n" +
            "    CASE\n" +
            "        WHEN :startMonth = '' AND :endMonth = '' THEN LPAD(MONTH(od.create_date), 2, '0') LIKE '%%'\n" +
            "        WHEN :startMonth = '' THEN LPAD(MONTH(od.create_date), 2, '0') LIKE CONCAT('%', LPAD(:endMonth, 2, '0'), '%')\n" +
            "        WHEN :endMonth = '' THEN LPAD(MONTH(od.create_date), 2, '0') LIKE CONCAT('%', LPAD(:startMonth, 2, '0'), '%')\n" +
            "        WHEN :startMonth != '' AND :endMonth != ''\n" +
            "            THEN LPAD(MONTH(od.create_date), 2, '0') BETWEEN COALESCE(LPAD(:startMonth, 2, '0'),\n" +
            "                                                                      LPAD(MONTH(od.create_date), 2, '0')) AND COALESCE(\n" +
            "                LPAD(:endMonth, 2, '0'), LPAD(MONTH(od.create_date), 2, '0'))\n" +
            "        END)\n" +
            "group by p.id, i.link\n" +
            "order by totalProfit desc\n" +
            "limit 10", nativeQuery = true)
    List<ProfitDTO> getProfit(@Param("startMonth") String startMonth, @Param("endMonth") String endMonth, @Param("currentYear") String currentYear);
}
