package com.mtm.ems.app.certificate.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository
		extends JpaRepository<Certificate, Integer> {
}
