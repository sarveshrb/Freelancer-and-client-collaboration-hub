package com.freelancing.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freelancing.entity.PgTransaction;
import com.freelancing.entity.User;

@Repository
public interface PgTransactionRepo extends JpaRepository<PgTransaction, Integer> {

	List<PgTransaction> findByUserOrderByIdDesc(User user);

	List<PgTransaction> findByOrderIdOrderByIdDesc(String orderId);
	
	PgTransaction findByTypeAndOrderId(String type, String orderId);

}
