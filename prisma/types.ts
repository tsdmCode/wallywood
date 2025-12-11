import { title } from 'process';

export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  user: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
    role: 'string',
    isActive: 'boolean',
    createdAt: 'date',
  },
  cartline: {
    id: 'number',
    userId: 'number',
    user: 'string',
    posterId: 'number',
    quantity: 'number',
    createdAt: 'date',
  },
  poster: {
    id: 'number',
    name: 'string',
    slug: 'string',
    description: 'string',
    image: 'string',
    width: 'number',
    height: 'number',
    price: 'number',
    stock: 'number',
    createdAt: 'date',
    updatedAt: 'date',
  },
  userrating: {
    id: 'number',
    userId: 'number',
    posterId: 'number',
    numStars: 'number',
    createdAt: 'date',
  },
  genre: {
    id: 'number',
    title: 'string',
    slug: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
  genrePosterRel: {
    posterId: 'number',
    genreId: 'number',
  },
};
