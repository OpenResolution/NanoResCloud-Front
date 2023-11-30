import { Request, Response } from 'express';

const tasks = [
  {
    id: 1,
    task_name: 'Task 1',
    task_description: 'Mapping the Distribution of Mitochondrial Proteins',
    create_time: new Date('2023-08-20T09:30:51.01'),
    update_time: new Date('2023-08-23T08:25:15.26'),
    user_id: '1',
    input_file_id: 2,
    task_config_id: 2,
    total_cycles: 60,
    current_cycle: 23,
    task_status: 'processing',
  },
  {
    id: 2,
    task_name: 'Task 2',
    task_description: 'Synaptic Vesicle Proteins in Neurons',
    create_time: new Date('2023-07-15T11:45:23.17'),
    update_time: new Date('2023-09-03T07:57:09.35'),
    user_id: '1',
    input_file_id: 3,
    task_config_id: 2,
    total_cycles: 60,
    current_cycle: 60,
    task_status: 'success',
  },
  {
    id: 3,
    task_name: 'Task 3',
    task_description: 'Membrane Protein Clustering in Bacteria',
    create_time: new Date('2023-10-02T16:37:52.19'),
    update_time: new Date('2023-10-03T17:45:32.37'),
    user_id: '1',
    input_file_id: 5,
    task_config_id: 2,
    total_cycles: 60,
    current_cycle: 52,
    task_status: 'processing',
  },
  {
    id: 4,
    task_name: 'Task 4',
    task_description: 'draft',
    create_time: new Date('2023-10-05T16:37:52.19'),
    update_time: new Date('2023-10-06T17:45:32.37'),
    user_id: '1',
    input_file_id: 5,
    task_config_id: 2,
    total_cycles: 60,
    current_cycle: 0,
    task_status: 'waiting',
  },
  {
    id: 5,
    task_name: 'Task 5',
    task_description: 'Mapping the Distribution of Mitochondrial Proteins',
    create_time: new Date('2023-06-15T08:52:01.03'),
    update_time: new Date('2023-08-31T21:05:50.23'),
    user_id: '2',
    input_file_id: 12,
    task_config_id: 9,
    total_cycles: 60,
    current_cycle: 2,
    task_status: 'processing',
  },
];

export default {
  'GET /api/task': (req: Request, res: Response, u: string) => {
    const { user_id } = req.query;
    const userTasks = tasks.filter((task) => task.user_id === user_id);
    const result = {
      data: userTasks,
      total: userTasks.length,
      success: true,
    };

    return res.json(result);
  },
};
