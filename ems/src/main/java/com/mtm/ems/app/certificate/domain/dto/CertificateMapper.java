package com.mtm.ems.app.certificate.domain.dto;

import java.util.List;
import java.util.Optional;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.mtm.ems.app.certificate.domain.Certificate;

@Component
@Mapper(componentModel = "spring")
public interface CertificateMapper {
	
	@Mapping(target = "certificateId", ignore = true)
	@Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "updatedAt", expression = "java(java.time.LocalDateTime.now())")
	Certificate toEntity(CertificateRequest certificateRequet);
	
	CertificateResponse toResponse(Certificate certificate);
	
	default Optional<CertificateResponse> toResponceOptional(Optional<Certificate> certificate) {
        return certificate.map(this::toResponse);
    }
	
	List<CertificateResponse> toResponseList(List<Certificate> certificates);
}
