package com.mtm.ems.app.certificate.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name= "language")
public class Certificate {
	
    @Id
    @GeneratedValue
    @Column(name = "language_id")
    private Integer certificateId;

    @Column(name = "language_name")
    private String certificateName;

    @Column(name = "skill_lvl")
    private String skillLvl;

    @Column(name = "type")
    private String type;

    @Column(name = "amount")
    private String amount;

    @Column(name = "del_flg")
    private String delFlg;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
