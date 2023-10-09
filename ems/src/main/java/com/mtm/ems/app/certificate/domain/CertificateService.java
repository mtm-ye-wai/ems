package com.mtm.ems.app.certificate.domain;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtm.ems.app.certificate.domain.dto.CertificateMapper;
import com.mtm.ems.app.certificate.domain.dto.CertificateResponse;

@Service
public class CertificateService {

	@Autowired
	private CertificateRepository certificateRepository;

	@Autowired
	private CertificateMapper certificateMapper;

	public List<CertificateResponse> getAllCertificate() {
		List<Certificate> certificates = this.certificateRepository.findAll();
		return certificateMapper.toResponseList(certificates);
	}

	public Optional<CertificateResponse> getCertificateById(Integer id) {
		Optional<Certificate> certificate = this.certificateRepository
				.findById(id);
		return certificateMapper.toResponceOptional(certificate);
	}

	public CertificateResponse createCertifcate(Certificate certificate) {
		return certificateMapper
				.toResponse(certificateRepository.save(certificate));
	}

	public CertificateResponse updateCertificate(Integer id, Certificate certificate) {
		Optional<Certificate> cert = this.certificateRepository.findById(id);
		cert.orElseThrow(() -> 
			new NoSuchElementException(id + " not found"));
		certificate.setCertificateId(id);
		Certificate c = this.certificateRepository.save(certificate);
		return certificateMapper.toResponse(c);
	}
	
	
}
