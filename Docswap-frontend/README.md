# Isomorphic

## Getting Started 

System Requirements:

1. [Node.js 18.17^](https://nodejs.org/en) or later.
2. [pnpm - package manager](https://pnpm.io/installation#using-npm) (recommended)

First, install dependencies:

```bash
npm i
# or
pnpm install
# or
yarn install
```

Now, run the development server, but first please configure (env variables)[https://isomorphic-doc.vercel.app/getting-started/installation#setting-environment-variables]:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/(hydrogen)/page.tsx`. The page auto-updates as you edit the file to learn more about this template please visit our **[Official Documentation](https://isomorphic-doc.vercel.app/)**.

checkout our `package.json` scripts for more command.

## Learn More.

To learn more about Isomorphic & Next.js, take a look at the following resources:

- [Isomorphic Documentation](https://isomorphic-doc.vercel.app/) - learn about Isomorphic.
- [RizzUI](https://www.rizzui.com/) - a react ui library by [REDQ](https://redq.io/).
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

https://www.youtube.com/watch?v=MAtaT8BZEAo

## Custom Environment Variables

In order for the application to communicate with the DocSwap API, the following environment variable must be defined:

```
NEXT_PUBLIC_DOCSWAP_API_BASE_URL="<api-url>"
```

When developing locally, you should have a `.env.local` file and the value of this variable should be `http://localhost:8080/api/v1`.

When running on a cloud server, the value should be set to the url/domain of the cloud api server.

For Authentication to work the following environment variables must be set in Azure or .env.local:

```
AZURE_AD_B2C_CLIENT_ID=""
AZURE_AD_B2C_CLIENT_SECRET=""
AZURE_AD_B2C_PRIMARY_USER_FLOW=""
AZURE_AD_B2C_TENANT_NAME=""
NEXTAUTH_SECRET="" 
NEXTAUTH_URL="http://localhost:3000" 
```

For security reasons, these values will be kept in our internal documentation and set in Azure. 

To test development without authentication enabled you can enter the admin@admin.com and admin password combination into the normal email/password form on the login page.