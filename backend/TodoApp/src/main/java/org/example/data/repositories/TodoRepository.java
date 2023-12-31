package org.example.data.repositories;

import org.example.data.entities.TodoEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

    List<TodoEntity> findByUserUsername(String username);
}
