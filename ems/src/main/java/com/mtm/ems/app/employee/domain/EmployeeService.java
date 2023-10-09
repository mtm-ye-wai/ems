package com.mtm.ems.app.employee.domain;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtm.ems.app.employee.domain.dto.EmployeeMapper;
import com.mtm.ems.app.employee.domain.dto.EmployeeListResponse;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    public EmployeeListResponse getAllEmployee() {
        List<Employee> employees = this.employeeRepository.findAll();
        return null;
		// return EmployeeMapper.toResponseList(employees);
    }
}
