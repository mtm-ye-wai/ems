package com.mtm.ems.app.certificate.domain.dto;

public record CertificateResponse(
	String certificateId,
	String certificateName,
	String skillLvl,
	String type,
	String amount,
	String createdAt
	) {}
