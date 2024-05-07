package com.example.mealplanservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CreateMealPlanResponse {

    private String id;
    private String description;
    private String recipe;
    private String nutritionalInformation;
    private String mealType;
    private String ingredients;
    private String instructions;
    private LocalDateTime createdAt;
    private String userId;
}
