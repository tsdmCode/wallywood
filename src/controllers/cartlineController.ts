import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { AuthRequest } from '../middleware/authenticateToken.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cartline.findMany();
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
    const data = await prisma.cartline.findUnique({
      where: { id },
      select: {
        userId: true,
        user: true,
        posterId: true,
        poster: true,
        quantity: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error Failed to get' });
  }
};

export const createRecord = async (req: AuthRequest, res: Response) => {
  // Træk userId fra token i stedet for req.body
  const userId = req.user?.id;
  const { posterId, quantity } = req.body;

  if (!userId || !posterId || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.cartline.create({
      data: {
        userId: Number(userId),
        posterId: Number(posterId),
        quantity: Number(quantity),
        createdAt: new Date(),
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create cartline' });
  }
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user?.id;
  const { posterId, quantity } = req.body;

  if (!posterId || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Verificer at cartline tilhører brugeren
    const existingCartline = await prisma.cartline.findUnique({
      where: { id },
    });

    if (!existingCartline) {
      return res.status(404).json({ error: 'Cartline not found' });
    }

    if (existingCartline.userId !== userId) {
      return res.status(403).json({ error: 'You can only update your own cartlines' });
    }

    const data = await prisma.cartline.update({
      where: { id },
      data: {
        posterId: Number(posterId),
        quantity: Number(quantity),
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error!' });
  }
};

export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user?.id;

  if (!id) {
    return res.status(400).json({ error: 'No id!' });
  }

  try {
    // Verificer at cartline tilhører brugeren
    const existingCartline = await prisma.cartline.findUnique({
      where: { id },
    });

    if (!existingCartline) {
      return res.status(404).json({ error: 'Cartline not found' });
    }

    if (existingCartline.userId !== userId) {
      return res.status(403).json({ error: 'You can only delete your own cartlines' });
    }

    await prisma.cartline.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Cartline deleted', deletedId: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
