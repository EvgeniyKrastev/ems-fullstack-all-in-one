package com.myspringprojects.ems_backend.service;

import com.myspringprojects.ems_backend.dto.TaskDto;

import java.util.List;

public interface TaskService {

    List<TaskDto> getAllTasks();

    TaskDto getTaskById(Long taskDtoId);

    TaskDto createTask(TaskDto taskDto);

    TaskDto updateTask(Long taskDtoId ,TaskDto updatedTaskDto);

    void deleteTask(Long taskDtoId);
}
