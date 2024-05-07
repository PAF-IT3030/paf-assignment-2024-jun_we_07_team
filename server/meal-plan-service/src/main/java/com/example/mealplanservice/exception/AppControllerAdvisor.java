package com.example.mealplanservice.exception;

import com.example.mealplanservice.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppControllerAdvisor {

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler({MealPlanNotFoundException.class})
    public ErrorResponse handleError(Exception exception) {
        System.out.println("exception occurred: " + exception.getMessage());

        ErrorResponse response = new ErrorResponse();
        response.setMessage("bad request");
        return response;
    }
}
