package com.myspringprojects.ems_backend.repository;

import com.myspringprojects.ems_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {
}
