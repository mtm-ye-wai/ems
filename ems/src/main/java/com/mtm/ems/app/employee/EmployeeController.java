package com.mtm.ems.app.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtm.ems.app.employee.domain.EmployeeService;
import com.mtm.ems.app.employee.domain.dto.EmployeeListResponse;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public ResponseEntity<EmployeeListResponse> getAllEmployee() {
        return ResponseEntity.ok(this.employeeService.getAllEmployee());
    }
}
