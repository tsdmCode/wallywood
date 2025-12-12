import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.genre.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cartlines' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'No ID' });
  }

  try {
    const data = await prisma.genre.findUnique({
      where: { id },
      select: {
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error Failed to get' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { title, slug, createdAt, updatedAt } = req.body;

  if (!title || !slug || !createdAt || !updatedAt) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.genre.create({
      data: {
        title,
        slug,
        createdAt,
        updatedAt,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create poster' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { title, slug, updatedAt } = req.body;

  if (!title || !slug || !updatedAt) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.genre.update({
      where: { id },
      data: {
        title,
        slug,
        updatedAt,
      },
    });

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ error: 'Server error!' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'No id!' });
  }

  try {
    const data = await prisma.genre.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'user record deleted', deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};
