package com.example.mealplanservice.controller;

import com.example.mealplanservice.dto.request.CreateMealPlanRequest;
import com.example.mealplanservice.dto.response.CreateMealPlanResponse;
import com.example.mealplanservice.exception.MealPlanNotFoundException;
import com.example.mealplanservice.model.MealPlan;
import com.example.mealplanservice.service.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class MealPlanController {

    private final MealPlanService mealPlanService;

    @PostMapping("users/{user-id}/meal-plans")
    public MealPlan create(@RequestBody CreateMealPlanRequest request,
                           @PathVariable ("user-id") String userId) {
        return mealPlanService.create(request, userId);
    }

    @GetMapping("/meal-plans")
    public List<CreateMealPlanResponse> list() {
        return mealPlanService.getAll();
    }

    @GetMapping("/users/{user-id}/meal-plans")
    public List<CreateMealPlanResponse> getById(@PathVariable ("user-id") String userId) throws MealPlanNotFoundException {
        return mealPlanService.getById(userId);
    }

    @PutMapping("/users/{user-id}/meal-plans/{meal-plan-id}")
    public MealPlan update(@PathVariable ("user-id") String userId,
                           @PathVariable ("meal-plan-id") String mealPlanId,
                           @RequestBody CreateMealPlanRequest request) throws MealPlanNotFoundException{
        return mealPlanService.updateById(userId,request,mealPlanId);
    }

    @DeleteMapping("/users/{user-id}/meal-plans/{meal-plan-id}")
    public void deleteById(@PathVariable ("user-id") String userId,
                           @PathVariable ("meal-plan-id") String mealPlanId) throws MealPlanNotFoundException {
        mealPlanService.delete(userId, mealPlanId);
    }
}
