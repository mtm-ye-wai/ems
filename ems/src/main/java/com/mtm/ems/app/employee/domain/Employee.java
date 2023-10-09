package com.mtm.ems.app.employee.domain;

import java.time.LocalDateTime;

import com.mtm.ems.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name= "employee")
public class Employee {
	
	@Id
    @GeneratedValue
    @Column(name = "employee_id")
    private String employeeId;

	@Column(name = "company_id")
    private Integer companyId;

	@Column(name = "card_id")
    private String cardId;

	@Column(name = "contract_no")
    private String contractNo;

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "employee_type")
	private Role employeeType;
	
    private String position;

    private String password;

    private String address;

    @Column(name = "employee_name")
    private String employeeName;
    
    private String nrc;
    
    private String phone;
    
    private String email;
    
    @Column(name = "office_email")
    private String officeEmail;
    
    private String gender;
    
    @Column(name = "marital_status")
    private String maritalStatus;
    
    private Integer type;
    
    @Column(name = "date_of_birth")
    private LocalDateTime dateOfBirth;
    
    @Column(name = "nrc_dob")
    private LocalDateTime nrcDob;
    
    private String photo;
    
    @Column(name = "basic_salary")
    private Double basicSalary;
    
    @Column(name = "sign_out_date")
    private LocalDateTime signOutDate;
    
    @Column(name = "join_date")
    private LocalDateTime joinDate;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(name = "contact_name")
    private String contactName;

    private String relation;
    
    @Column(name = "home_address")
    private String homeAddress;

    @Column(name = "mac_address")
    private String macAddress;
    
    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "graduate_university")
    private String graduateUniversity;

    @Column(name = "pc_no")
    private String pcNo;

    @Column(name = "pc_password")
    private String pcPassword;
    
    private String jlpt;
    
    @Column(name = "language_skill")
    private String languageSkill;
    
    @Column(name = "iq_test_remark")
    private Double iqTestRemark;
    
    @Column(name = "tax_id")
    private String taxId;

    @Column(name = "transportation_flg")
    private boolean tranFlg;

    @Column(name = "ferry")
    private Boolean useFerry;
    
    @Column(name = "del_flag")
    private Boolean delFlag;
    
    @Column(name = "blacklist_flag")
    private Boolean blackList;

    @Column(name = "created_user_id")
    private String createdUserId;

    @Column(name = "created_datetime")
    private LocalDateTime createdDateTime;
    
    @Column(name = "updated_user_id")
    private String updatedUserId;
    
    @Column(name = "updated_datetime")
    private LocalDateTime updatedDateTime;
    
    private String religion;

    @Column(name = "ssb_no")
    private String ssbNo;
    
    @Column(name = "ssb_card_issue_date")
    private LocalDateTime ssbCardIssueDate;

    @Column(name = "graduate_degree")
    private String graduateDegree;

    @Column(name = "bank_account_type")
    private String bankAccountType;

    @Column(name = "is_special")
    private Boolean isSpecial;

//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		return List.of(new SimpleGrantedAuthority(employeeType.name()));
//	}
//
//	@Override
//	public String getUsername() {
//		return employeeId;
//	}
//
//	@Override
//	public boolean isAccountNonExpired() {
//		return true;
//	}
//
//	@Override
//	public boolean isAccountNonLocked() {
//		return true;
//	}
//
//	@Override
//	public boolean isCredentialsNonExpired() {
//		return true;
//	}
//
//	@Override
//	public boolean isEnabled() {
//		return true;
//	}
}
