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
        width: true,
        height: true,
        price: true,
        genrePosterRels: {
          select: {
            genre: true,
          },
        },
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create poster' });
  }
};

export const getPostersByGenre = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  if (!slug) {
    return res.status(400).json({ error: 'Genre slug is required' });
  }

  try {
    console.log('Looking for genre with slug:', slug);

    const genre = await prisma.genre.findFirst({
      where: { slug },
      include: {
        genrePosterRels: {
          include: {
            poster: true,
          },
        },
      },
    });

    console.log('Found genre:', genre);

    if (!genre) {
      return res.status(404).json({ error: `Genre with slug '${slug}' not found` });
    }

    const posters = genre.genrePosterRels.map((rel) => rel.poster);

    console.log('Found posters:', posters.length);

    return res.status(200).json(posters);
  } catch (error) {
    console.error('Error in getPostersByGenre:', error);
    return res.status(500).json({ error: 'Failed to get posters by genre' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { name, slug, description, image, width, height, price, stock, genreIds } = req.body;

  if (!name || !slug || !description || !image || !width || !height || !price || stock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    console.log('making poster');
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

    if (genreIds && Array.isArray(genreIds) && genreIds.length > 0) {
      console.log('skaber genrer');
      await prisma.genrePosterRel.createMany({
        data: genreIds.map((genreId: number) => ({
          posterId: data.id,
          genreId: Number(genreId),
        })),
      });
    } else {
      console.log('No genreIds provided or not an array');
    }

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
