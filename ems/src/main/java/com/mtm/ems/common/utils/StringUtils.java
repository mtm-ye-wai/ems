package com.mtm.ems.common.utils;

import org.springframework.web.servlet.NoHandlerFoundException;

public class StringUtils {
	public static Integer pathVartoInteger(String id) throws NoHandlerFoundException {
		try {
			return Integer.valueOf(id);
		} catch (NumberFormatException e) {
			throw new NoHandlerFoundException(id, id, null); 
		}
	}
}
