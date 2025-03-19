# Bootcamp Blog

A full-stack blogging platform built with Next.js, Prisma, and PostgreSQL. 

This project is fork of an example taken from [Vercel](https://vercel.com/guides/nextjs-prisma-postgres).

## Technology Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Testing**: Jest

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Bootcamp2025-Pega/bootcamp-blog.git cd bootcamp-blog
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

- POSTGRES_PRISMA_URL
- POSTGRES_URL_NON_POOLING


## Development

### Database

The project uses Docker Compose to run a PostgreSQL database:

```bash
docker-compose up -d
```

### Testing

Run the test suite:

```bash
npm test
```

## Acknowledgements

- [Vercel](https://vercel.com/guides/nextjs-prisma-postgres) for the original project
