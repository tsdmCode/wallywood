import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.poster.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'No ID' });
  }

  try {
    const data = await prisma.poster.findUnique({
      where: { id },
      select: {
        name: true,
        slug: true,
        description: true,
        image: true,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create poster' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { name, slug, description, image, width, height, price, stock } = req.body;

  if (!name || !slug || !description || !image || !width || !height || !price || stock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.poster.create({
      data: {
        name,
        slug,
        description,
        image,
        width: Number(width),
        height: Number(height),
        price: Number(price),
        stock: Number(stock),
        createdAt: new Date(),
        updatedAt: new Date(),
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

  const { name, slug, description, image, width, height, price, stock } = req.body;

  if (!name || !slug || !description || !image || !width || !height || !price || stock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.poster.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image,
        width: Number(width),
        height: Number(height),
        price: Number(price),
        stock: Number(stock),
        createdAt: new Date(),
        updatedAt: new Date(),
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
    const data = await prisma.poster.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'user record deleted', deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};
