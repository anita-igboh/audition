import PhaseStatus from '../enums/phase.enums';
import { IPhase } from '../interfaces/phase.interface';
import phasesDummy from '../utils/dummy/phases.dummy';
import { Error } from '../utils/helpers/response.helpers';
import { fetchSinglePhase } from './phase.services';

  export const createTask = (taskName: string, phaseId: number) => {
    const phase = fetchSinglePhase(phaseId);
    if (phase.isDone === true) {
      throw Error('The tasks for this phase have already been completed', 400);
    }
    phase.tasks.push({
      taskId: phase.tasks.length + 1,
      taskName,
      isComplete: false,
    });
    return phase;
  };

  export const fetchPhaseTask = (taskId: number, phaseId: number) => {
    const phase = fetchSinglePhase(phaseId);
    const task = phase.tasks.find((el) => el.taskId === Number(taskId));
    if (!task) {
      throw Error('Task not found', 404);
    }
    return task;
  };

  const getPhaseIndex = (phase: IPhase) => phasesDummy.findIndex((el) => el.phaseId === phase.phaseId);

  const getPreviousPhase = (phase: IPhase) => {
    const phaseIndex = getPhaseIndex(phase);
    return phasesDummy[phaseIndex - 1];
  };

  const checkStatusOfPreviousPhase = (phase: IPhase) => {
    if (phase && !phase.isDone) {
      throw Error('You can only update this task if the previous phase is done', 400);
    }
  };

  const getNextPhase = (phase: IPhase) => {
    const phaseIndex = getPhaseIndex(phase);
    return phasesDummy[phaseIndex + 1];
  };

  export const updateTaskStatus = (phaseId: number, taskId: number) => {
    const phase = fetchSinglePhase(phaseId);
  
    if (phase.isDone) {
      throw Error('Phase is completed and cannot be updated', 400);
    }
  
    const task = fetchPhaseTask(phase.phaseId, taskId);
    if (task.isComplete) {
      throw Error('Task is already completed', 400);
    }
  
    const previousPhase = getPreviousPhase(phase);
    const nextPhase = getNextPhase(phase);
    checkStatusOfPreviousPhase(previousPhase);
    task.isComplete = true;
  
    // if all tasks in current phase are completed, unlock next phase 
    phase.isDone = phase.tasks.every((el) => el.isComplete);
    if (nextPhase && phase.isDone) {
      nextPhase.status = PhaseStatus.UNLOCKED;
    }
    return task;
  };