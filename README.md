# Saphala

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Documentation

### Authentication Endpoints

#### Sign Up

- **URL**: `/api/signup`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "user_name": "username",
    "full_name": "Full Name"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "data": {user object},
      "message": "Account created!"
    }
    ```
- **Error Responses**:
  - **Code**: 400 - Invalid data
  - **Code**: 401 - User already exists
  - **Code**: 500 - Server error

#### Sign In

- **URL**: `/api/signin`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "data": {
        "_id": "user_id",
        "username": "username",
        "avatar": "avatar_url"
      },
      "message": "Logged in successfully!"
    }
    ```
- **Error Responses**:

  - **Code**: 400 - Invalid data
  - **Code**: 401 - Authentication failed
  - **Code**: 500 - Server error

  ### /movie/[slug]

  - the work is almost done but there is one issue and that is if the movies have same name, it is only showing with the most outdated movie of that name, so i dont know what to do there

  #### Components Used

  - you will find all the componenets use in this in the folder of src/components/ui/movie-ui, the componets of PostCard is usable even in other part of the website

## Technologies Used

- Next.js
- TypeScript
- MongoDB
- NextAuth.js for authentication

## Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
