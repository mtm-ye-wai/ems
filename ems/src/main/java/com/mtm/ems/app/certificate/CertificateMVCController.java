package com.mtm.ems.app.certificate;

import java.net.URI;
import java.util.NoSuchElementException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.mtm.ems.app.certificate.domain.CertificateService;
import com.mtm.ems.app.certificate.domain.dto.CertificateMapper;
import com.mtm.ems.app.certificate.domain.dto.CertificateRequest;
import com.mtm.ems.app.certificate.domain.dto.CertificateResponse;
import com.mtm.ems.common.utils.StringUtils;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/certificate")
public class CertificateMVCController {

	@Autowired
	private CertificateService certificateService;

	@Autowired
	private CertificateMapper certificateMapper;
	
	@GetMapping
	public String getAllCertificate(Model model){
		List<CertificateResponse> certificate = this.certificateService.getAllCertificate();
		model.addAttribute("languageList", certificate);
		return "certificate/index";
	}

	@GetMapping("/{id}")
	public ResponseEntity<CertificateResponse> getCertificateById(
			@PathVariable String id) throws NoHandlerFoundException {
		Integer certificateId = StringUtils.pathVartoInteger(id);
		CertificateResponse certificate = this.certificateService
				.getCertificateById(certificateId)
				.orElseThrow(
						() -> new NoSuchElementException(id + " not found"));
		return ResponseEntity.ok(certificate);
	}

	@PostMapping("/create")
	public ResponseEntity<CertificateResponse> createCertificate(
			@Valid @RequestBody CertificateRequest certificateRequest) {
		CertificateResponse certificate = this.certificateService
				.createCertifcate(
						certificateMapper.toEntity(certificateRequest));
		String createdResourceUri = "/api/certificate/" + certificate.certificateId();
		return ResponseEntity.created(URI.create(createdResourceUri))
				.body(certificate);
	}
	
	@PutMapping("/edit/{id}")
	public ResponseEntity<CertificateResponse> updateCertificate(
			@PathVariable String id, 
			@Valid @RequestBody CertificateRequest certificateRequest
			) throws NoHandlerFoundException {
		Integer certificateId = StringUtils.pathVartoInteger(id);	
		CertificateResponse certificate = this.certificateService
				.updateCertificate(certificateId, certificateMapper.toEntity(certificateRequest));
		return ResponseEntity.ok(certificate);
	}
	
}
