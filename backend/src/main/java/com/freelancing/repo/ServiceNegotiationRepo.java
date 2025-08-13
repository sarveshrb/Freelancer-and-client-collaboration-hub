package com.freelancing.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freelancing.entity.ServiceNegotiation;

@Repository
public interface ServiceNegotiationRepo extends JpaRepository<ServiceNegotiation, Integer> {

}
