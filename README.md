This is a proof of concept of the authentication implemented using Next.js, Next-ui, Next-auth, Prisma. My goal was to test these libraries and set up working authentication inside the Next.js application.

## Getting Started

After cloning this repository, run the command to create your personal auth key:

```bash
openssl rand -base64 32
```

Copy the existing `.env` file and rename it as `.env.local`. Previously created key fill in the missing variable.

After that, run `docker compose` command to launch the developer environment. To do that, use the command:

```bash
docker compose up -d --build
```

It will pull the required images, and build the image for the next.js application.

The next step is to execute database migrations. Database integration has been implemented using Prisma ORM. Using `docker compose`, execute the migration command:

```bash
docker compose exec node npx prisma migrate dev
```

When you have the proper schema in your database, it's time to execute the seeder to add the required first user. To do that, use the command mentioned below:

```bash
docker compose exec node npx prisma db seed
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing login form

When you have properly set the environment, you can try to login. The default user has `admin@example.com` email and `qwerty123` password. After successful login, you should see page with message and button to logout. Click it. You should be back, on the page with login form.
