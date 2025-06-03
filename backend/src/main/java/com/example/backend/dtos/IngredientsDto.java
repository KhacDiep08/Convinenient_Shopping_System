package com.example.backend.dtos;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Getter
public class IngredientsDto {
    private Integer id;
    private String name;
    private String image;
    private String description;
    private Integer status;
    private LocalDateTime dueDate;
    private LocalDate createAt;
    private LocalDate updateAt;
    private String ingredientStatus;
}