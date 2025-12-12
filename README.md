# Wallywood API

API til håndtering af poster, genrer, brugere, ratings og indkøbskurve for Wallywood.

## Forudsætninger

Før du starter, skal du have følgende installeret:

- [Node.js](https://nodejs.org/) (version 18 eller nyere)
- [MySQL](https://www.mysql.com/) database
- [npm](https://www.npmjs.com/) eller [yarn](https://yarnpkg.com/)

## Installation

1. **Klon repository:**

   ```bash
   git clone https://github.com/tsdmCode/wallywood.git
   cd wallywood
   ```

2. **Installér dependencies:**

   ```bash
   npm install
   ```

3. **Konfigurér miljøvariabler:**

   Opret en `.env` fil i projektets root og tilføj følgende:

   ```env
   DATABASE_URL="mysql://brugernavn:adgangskode@localhost:3306/wallywood"
   JWT_SECRET="din_hemmelige_jwt_nøgle"
   ```

   Erstat `brugernavn`, `adgangskode` og `wallywood` med dine egne MySQL credentials og databasenavn.

4. **Kør Prisma migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed databasen med testdata:**
   ```bash
   npx prisma db seed
   ```

## Opstart

### Development mode (med hot-reload):

```bash
npm run dev
```

### Production build:

```bash
npm run build
npm start
```

API'et kører nu på `http://localhost:3000`

## Prisma kommandoer

- **Generer Prisma Client:**

  ```bash
  npm run prisma:generate
  ```

- **Kør migrations:**

  ```bash
  npm run prisma:migrate
  ```

- **Reset database:**

  ```bash
  npm run prisma:reset
  ```

- **Åbn Prisma Studio (database GUI):**
  ```bash
  npx prisma studio
  ```

## API Endpoints

API'et indeholder følgende hovedressourcer:

- `/auth` - Authentication (login, user profile)
- `/users` - Brugerhåndtering
- `/posters` - Postere og poster-relaterede operationer
- `/genres` - Genrer
- `/cartlines` - Indkøbskurvlinjer
- `/userratings` - Brugerratings af posters

### Authentication

For at tilgå beskyttede endpoints (POST, PUT, DELETE), skal du:

1. Logge ind via `/auth/login` med email og password
2. Få et JWT token tilbage
3. Inkludere token i Authorization header: `Bearer <token>`

### Postman Documentation

Fuld API dokumentation med eksempler er tilgængelig her:

**[Wallywood API - Postman Documentation](https://documenter.getpostman.com/view/40472349/2sB3dSR94K)**

## Projektstruktur

```
wallywood/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seedCSV.ts             # Seed script
│   └── csv/                   # CSV seed data
├── src/
│   ├── index.ts               # Express app entry point
│   ├── prisma.ts              # Prisma client instance
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Authentication & authorization
│   ├── routes/                # API routes
│   └── services/              # Business logic
├── package.json
└── tsconfig.json
```

## Database Schema

API'et bruger følgende hovedmodeller:

- **User** - Brugere med roller (ADMIN/USER)
- **Poster** - Poster produkter
- **Genre** - Poster genrer
- **GenrePosterRel** - Many-to-many relation mellem Genre og Poster
- **Cartline** - Indkøbskurvlinjer tilknyttet brugere
- **Userrating** - Brugerratings af posters

## Teknologier

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM (Object-Relational Mapping)
- **MySQL** - Database
- **TypeScript** - Type-safe JavaScript
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## Support

For spørgsmål eller problemer, kontakt projektteamet eller opret et issue på GitHub.
