package com.freelancing.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freelancing.entity.ServiceRequestMessage;

@Repository
public interface ServiceRequestMessageRepo extends JpaRepository<ServiceRequestMessage, Integer> {

}
