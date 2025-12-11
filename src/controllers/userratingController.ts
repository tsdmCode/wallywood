import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { AuthRequest } from '../middleware/authenticateToken.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.userrating.findMany();
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
    const data = await prisma.userrating.findUnique({
      where: { id },
      select: {
        userId: true,
        user: true,
        posterId: true,
        poster: true,
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
  const { posterId, numStars } = req.body;

  if (!userId || !posterId || !numStars) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.userrating.create({
      data: {
        userId: Number(userId),
        createdAt: new Date(),
        posterId,
        numStars: Number(numStars),
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create rating' });
  }
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user?.id;
  const { posterId, numStars } = req.body;

  if (!posterId || !numStars) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Verificer at cartline tilhører brugeren
    const existingRating = await prisma.userrating.findUnique({
      where: { id },
    });

    if (!existingRating) {
      return res.status(404).json({ error: 'Cartline not found' });
    }

    if (existingRating.userId !== userId) {
      return res.status(403).json({ error: 'You can only update your own cartlines' });
    }

    const data = await prisma.userrating.update({
      where: { id },
      data: {
        posterId: Number(posterId),
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
    const existingRating = await prisma.userrating.findUnique({
      where: { id },
    });

    if (!existingRating) {
      return res.status(404).json({ error: 'Cartline not found' });
    }

    if (existingRating.userId !== userId) {
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
