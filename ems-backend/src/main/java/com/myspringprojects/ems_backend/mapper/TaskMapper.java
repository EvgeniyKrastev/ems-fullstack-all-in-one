package com.myspringprojects.ems_backend.mapper;

import com.myspringprojects.ems_backend.dto.TaskDto;
import com.myspringprojects.ems_backend.entity.Task;

public class TaskMapper {

    public static TaskDto mapToTaskDto (Task task){
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription()
        );
    }

    public static Task mapToTask(TaskDto taskDto){
        return new Task(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription()
        );
    }
}
