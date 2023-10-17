package org.example.models.services;

import org.example.models.dto.TodoDTO;

import java.util.List;

public interface TodoService {

    TodoDTO addTodo(TodoDTO todoDTO);
    void deleteTodo(long todoId);
    void editTodo(TodoDTO todoDTO);
    List<TodoDTO> getAll(String username);
    TodoDTO getById(long todoId);
}
