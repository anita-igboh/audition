import { Request, Response, NextFunction } from 'express';
import * as service from '../services/task.services';
import { successResponse } from '../utils/helpers/response.helpers';


export const createTask = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {  body: { name, phaseId } } = req;
        const data = service.createTask(name, Number(phaseId));
        return successResponse(res, 'Task added successfully to phase', 201, data);
    } catch (error) {
        return next(error);
    }
    };