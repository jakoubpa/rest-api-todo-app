package org.example.models.services;

import org.example.data.entities.TodoEntity;
import org.example.data.repositories.TodoRepository;
import org.example.data.repositories.UserRepository;
import org.example.models.dto.TodoDTO;
import org.example.models.dto.mappers.TodoMapper;
import org.example.models.exceptions.TodoNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TodoServiceImp implements TodoService {

    @Autowired
    TodoMapper todoMapper;
    @Autowired
    TodoRepository todoRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public TodoDTO addTodo(TodoDTO todoDTO) {
        TodoEntity entity = todoMapper.toEntity(todoDTO);
        entity.setUser(userRepository.findByUsername(todoDTO.getUsername()).get());
        TodoEntity savedTodoEntity = todoRepository.save(entity);
        return  todoMapper.toDTO(savedTodoEntity);
    }

    @Override
    public List<TodoDTO> getAll(String username) {
        return  todoRepository.findByUserUsername(username).stream()
                .map(x -> todoMapper.toDTO(x))
                .toList();
    }
    @Override
    public TodoDTO getById(long todoId) {
        return todoMapper.toDTO(getTodoOrThrow(todoId));
    }
    @Override
    public void deleteTodo(long todoId) {
        TodoEntity fetched = getTodoOrThrow(todoId);
        todoRepository.delete(fetched);
    }
    @Override
    public void editTodo(TodoDTO todoDTO) {
        TodoEntity fetched = getTodoOrThrow(todoDTO.getTodoId());
        todoMapper.updateTodoEntity(todoDTO, fetched);
        // must update associated user
        todoRepository.save(fetched);
    }
    private TodoEntity getTodoOrThrow(long todoId) {
        return todoRepository.findById(todoId).orElseThrow(TodoNotFoundException::new);
    }

}
