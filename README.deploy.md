Deployment options for this Next.js project

Vercel (recommended):

- Push the repository to GitHub and connect the repo in the Vercel dashboard.
- Alternatively use the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Docker (self-host):

```bash
docker build -t jansetu:latest .
docker run -p 3000:3000 jansetu:latest
```

Local (developer):

```bash
npm install
npm run dev
```

Notes:
- This project uses the Next.js `app/` directory. Vercel supports this by default.
- If you want me to push and deploy from this machine, allow me to create a git repo and run the deploy commands.

Temporal (local development):

- Start a local Temporal server (Docker):

```bash
docker run --name temporal -d -p 7233:7233 temporalio/auto-setup:latest
```

- Run the Temporal worker (from project root):

```bash
# install deps first
npm install
# start the worker
npm run temporal:dev
```

You can then trigger workflows using the `@temporalio/client` from the app or a Node script that connects to `localhost:7233`.
