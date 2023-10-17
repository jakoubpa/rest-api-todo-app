package org.example.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "todos")
@Getter
@Setter
public class TodoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long todoId;
    @Column
    private String description;
    @Column
    private LocalDate targetDate;
    @Column
    private boolean done;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
