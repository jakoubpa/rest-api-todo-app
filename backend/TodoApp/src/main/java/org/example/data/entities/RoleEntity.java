package org.example.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.models.dto.ERole;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public RoleEntity() {

    }

    public RoleEntity(ERole name) {
        this.name = name;
    }

}