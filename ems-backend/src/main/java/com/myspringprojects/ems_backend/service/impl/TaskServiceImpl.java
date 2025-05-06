package com.myspringprojects.ems_backend.service.impl;

import com.myspringprojects.ems_backend.dto.TaskDto;
import com.myspringprojects.ems_backend.entity.Task;
import com.myspringprojects.ems_backend.exception.ResourceNotFoundException;
import com.myspringprojects.ems_backend.mapper.TaskMapper;
import com.myspringprojects.ems_backend.repository.TaskRepository;
import com.myspringprojects.ems_backend.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<TaskDto> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map((task -> TaskMapper.mapToTaskDto(task)))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto getTaskById(Long taskDtoId) {

        Task task = taskRepository.findById(taskDtoId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException("Task with this id = "+ taskDtoId +" doesn't exist")
                );

        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public TaskDto updateTask(Long taskDtoId, TaskDto updatedTaskDto) {
        Task task = taskRepository.findById(taskDtoId).orElseThrow(
                ()-> new ResourceNotFoundException("Task with Id: " + taskDtoId + "doesn't exist!")
        );

        task.setDescription(updatedTaskDto.getDescription());
        task.setTitle(updatedTaskDto.getTitle());
        Task updatedTaskObj = taskRepository.save(task);

        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public void deleteTask(Long taskDtoId) {
        Task task = taskRepository.findById(taskDtoId).orElseThrow(
                ()-> new ResourceNotFoundException("Task with Id: " + taskDtoId + "doesn't exist!")
        );
        taskRepository.deleteById(taskDtoId);
    }
}
