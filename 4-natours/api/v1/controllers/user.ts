import { Request, Response } from 'express';
// import UserModel from '../models/user';

async function getAllUsers(req: Request, res: Response): Promise<Response> {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function getUser(req: Request, res: Response): Promise<Response> {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function createUser(req: Request, res: Response): Promise<Response> {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function updateUser(req: Request, res: Response): Promise<Response> {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function deleteUser(req: Request, res: Response): Promise<Response> {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
