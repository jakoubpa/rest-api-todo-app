package org.example.models.dto.mappers;

import org.example.data.entities.TodoEntity;
import org.example.models.dto.TodoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TodoMapper {

    TodoEntity toEntity(TodoDTO source);
    @Mapping(source = "user.username", target = "username")
    TodoDTO toDTO(TodoEntity source);
    void updateTodoDTO(TodoDTO source, @MappingTarget TodoDTO target);
    void updateTodoEntity(TodoDTO source, @MappingTarget TodoEntity target);

}
