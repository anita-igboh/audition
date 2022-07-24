import PhaseStatus from '../enums/phase.enums';
import { IPhase } from '../interfaces/phase.interface';
import phasesDummy from '../utils/dummy/phases.dummy';
import { Error } from '../utils/helpers/response.helpers';

export const fetchPhases = () => phasesDummy;

export const fetchSinglePhase = (phaseId: number) => {
  const data: IPhase | undefined = phasesDummy.find(
    (phase: IPhase) => phase.phaseId === phaseId,
  );
  if (!data) {
    throw Error('Phase not found', 404);
  }
  return data;
};

export const createPhase = (phaseName: string) => {
    const newPhase: IPhase = {
      phaseId: phasesDummy.length + 1,
      phaseName,
      status: phasesDummy.length === 0 ? PhaseStatus.UNLOCKED : PhaseStatus.LOCKED,
      isDone: false,
      tasks: [],
    };
  
    phasesDummy.push(newPhase);
    
    return newPhase;
  };