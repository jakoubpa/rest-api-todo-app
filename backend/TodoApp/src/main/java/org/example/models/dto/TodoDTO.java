package org.example.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoDTO {

    @JsonProperty("todoId")
    private long todoId;

    private String username;

    private String description;

    private LocalDate targetDate;

    private boolean done;


    @Override
    public String toString() {
        return "Todo [todoId=" + todoId + ", username=" + username + ", description=" + description + ", targetDate="
                + targetDate + ", done=" + done + "]";
    }
}
