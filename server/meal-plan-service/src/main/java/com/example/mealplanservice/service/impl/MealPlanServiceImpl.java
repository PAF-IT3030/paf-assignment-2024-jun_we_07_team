package com.example.mealplanservice.service.impl;

import com.example.mealplanservice.dto.request.CreateMealPlanRequest;
import com.example.mealplanservice.dto.response.CreateMealPlanResponse;
import com.example.mealplanservice.exception.MealPlanNotFoundException;
import com.example.mealplanservice.model.MealPlan;
import com.example.mealplanservice.repository.MealPlanRepository;
import com.example.mealplanservice.service.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MealPlanServiceImpl implements MealPlanService {

    private final MealPlanRepository mealPlanRepository;

    @Override
    public MealPlan create(CreateMealPlanRequest request, String userId) {
        MealPlan mealPlan = new MealPlan();
        BeanUtils.copyProperties(request, mealPlan);
        mealPlan.setCreatedAt(LocalDateTime.now());
        mealPlan.setUserId(request.getUserId());
        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public List<CreateMealPlanResponse> getAll() {

        List<MealPlan> mealPlans = mealPlanRepository.findAll();

        return mealPlans.stream()
                .map(mealPlan -> CreateMealPlanResponse.builder()
                        .id(mealPlan.getId())
                        .description(mealPlan.getDescription())
                        .recipe(mealPlan.getRecipe())
                        .nutritionalInformation(mealPlan.getNutritionalInformation())
                        .mealType(mealPlan.getMealType())
                        .ingredients(mealPlan.getIngredients())
                        .instructions(mealPlan.getInstructions())
                        .createdAt(mealPlan.getCreatedAt())
                        .userId(mealPlan.getUserId())
                        .build())
                .toList();
    }

    @Override
    public List<CreateMealPlanResponse> getById(String userId) throws MealPlanNotFoundException {
        List<MealPlan> mealPlans = mealPlanRepository.findByUserId(userId);

        if (mealPlans.isEmpty()) {
            throw new MealPlanNotFoundException("Not found meal plans for user with id: " + userId);
        }

        return mealPlans.stream()
                .map(mealPlan -> CreateMealPlanResponse.builder()
                        .id(mealPlan.getId())
                        .description(mealPlan.getDescription())
                        .recipe(mealPlan.getRecipe())
                        .nutritionalInformation(mealPlan.getNutritionalInformation())
                        .mealType(mealPlan.getMealType())
                        .ingredients(mealPlan.getIngredients())
                        .instructions(mealPlan.getInstructions())
                        .createdAt(mealPlan.getCreatedAt())
                        .userId(mealPlan.getUserId())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public MealPlan updateById(String userId, CreateMealPlanRequest request, String mealPlanId) throws MealPlanNotFoundException{

        MealPlan mealPlan = mealPlanRepository.findByUserIdAndId(userId, mealPlanId)
                .orElseThrow(() -> new MealPlanNotFoundException("Not found meal plan with id: " + mealPlanId));

        mealPlan.setDescription(request.getDescription());
        mealPlan.setRecipe(request.getRecipe());
        mealPlan.setNutritionalInformation(request.getNutritionalInformation());
        mealPlan.setMealType(request.getMealType());
        mealPlan.setIngredients(request.getIngredients());
        mealPlan.setInstructions(request.getInstructions());
        mealPlan.setCreatedAt(LocalDateTime.now());

        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public void delete(String userId, String mealPlanId) throws MealPlanNotFoundException {

        MealPlan mealPlan = mealPlanRepository.findByUserIdAndId(userId, mealPlanId)
                .orElseThrow(() -> new MealPlanNotFoundException("Not found meal plan with id: " + mealPlanId));

        mealPlanRepository.delete(mealPlan);
    }
}
