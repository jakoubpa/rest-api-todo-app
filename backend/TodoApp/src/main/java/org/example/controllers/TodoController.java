package org.example.controllers;

import org.example.models.dto.TodoDTO;
import org.example.models.services.TodoService;
import org.example.models.services.TodoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TodoController {
    @Autowired
    private TodoService todoService;


    @GetMapping("/users/{username}/todos")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<TodoDTO> retrieveTodos(@PathVariable String username) {
        List<TodoDTO> debug = todoService.getAll(username);
        return todoService.getAll(username);
    }

    @GetMapping("/users/{username}/todos/{todoId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public TodoDTO retrieveTodoDetail(@PathVariable String username, @PathVariable long todoId) {
        return todoService.getById(todoId);
    }

    @DeleteMapping("/users/{username}/todos/{todoId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{todoId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public TodoDTO editTodo(@PathVariable String username, @PathVariable long todoId, @RequestBody TodoDTO todoDTO) {
        todoService.editTodo(todoDTO);
        return todoDTO;
    }

    @PostMapping("/users/{username}/todos")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public TodoDTO createTodo(@PathVariable String username, @RequestBody TodoDTO todoDTO) {
        todoDTO.setUsername(username);
        TodoDTO createdTodo = todoService.addTodo(todoDTO);
        return createdTodo;
    }

}
