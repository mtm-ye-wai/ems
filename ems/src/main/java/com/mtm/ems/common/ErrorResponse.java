package com.mtm.ems.common;

public record ErrorResponse(
		String error, 
		String details
		) {}
