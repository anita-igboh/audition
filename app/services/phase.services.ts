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