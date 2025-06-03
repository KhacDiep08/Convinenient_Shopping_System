package com.example.backend.entities;

import lombok.Data;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "ingredients")
public class IngredientsEntity extends BaseEntity {
    @Column
    private String image;
    @Column
    private String description;
    @Column
    private LocalDateTime dueDate;
    @Column
    private Integer status;
    @Column
    private String ingredientStatus;
}
