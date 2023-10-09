package com.mtm.ems.app.certificate.domain.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class CertificateRequest {
	@NotEmpty(message = "Certificate Name is required")
	private String certificateName;

	@NotEmpty(message = "Skill Level is required")
	private String skillLvl;

	private String type;

	private Boolean delFlg;

	@NotNull(message = "Amount is required")
	private Integer amount;

	private Date created_at;

	private Date updated_at;

	public void setAmount(String amount) {
		try {
			this.amount = Integer.parseInt(amount);
		} catch (Exception e) {
			this.amount = 0;
		}
	}

	public void setDelFlg(String delFlg) {
		this.delFlg = "true".equalsIgnoreCase(delFlg);
	}
}
