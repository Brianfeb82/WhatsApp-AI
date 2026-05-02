import { Request, Response, NextFunction } from 'express'
import { AppError } from './app.error'
import { logger } from '../logger/logger'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.code,
      message: err.message,
    })
  }

  logger.error('Unhandled error', { error: err })

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
