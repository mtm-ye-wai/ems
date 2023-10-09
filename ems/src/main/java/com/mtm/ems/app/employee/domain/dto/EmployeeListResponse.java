package com.mtm.ems.app.employee.domain.dto;

public record EmployeeListResponse(
        String employeeId,
        String cardId,
        String name,
        String department,
        String position,
        String joinDate
    ){}
