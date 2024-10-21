import { PrismaClient }  from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'password456',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      userId: alice.id,
      postId: 1,
      title: 'Full Stack Development Overview',
      slug: 'full-stack-development-overview',
      summary: 'An in-depth look at modern full-stack development.',
      description: 'Full-stack development covers both frontend and backend development...',
      category: 'Development',
    },
  });

  const post2 = await prisma.post.create({
    data: {
      userId: bob.id,
      postId: 2,
      title: 'Learning AI: A Beginner’s Guide',
      slug: 'learning-ai-beginners-guide',
      summary: 'A comprehensive guide to getting started with Artificial Intelligence.',
      description: 'Artificial Intelligence (AI) is reshaping the future...',
      category: 'AI',
    },
  });

  // Create comments for posts
  await prisma.comment.create({
    data: {
      userId: alice.id,
      postId: post2.id,
      postSlug: post2.slug,
      comment: 'This is a great starting point for AI enthusiasts!',
    },
  });

  await prisma.comment.create({
    data: {
      userId: bob.id,
      postId: post1.id,
      postSlug: post1.slug,
      comment: 'Thanks for this detailed breakdown of full-stack development!',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
