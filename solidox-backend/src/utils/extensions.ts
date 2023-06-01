import { Request } from 'express';

export interface ExtendedRequest extends Request {
  orgId?: string;
  orgAddress?: string;
}
