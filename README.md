# Blogging application - ECE Webtech project

## Production

- Vercel URL: <https://ece-webapp-du-jules.vercel.app>
- Supabase project URL: <http://localhost:3001>

## Usage

- Clone this repository, from your local machine:

  ```bash
  git clone git@github.com:julestristan/ece-webapp-du-jules.git
  cd ece-webapp-du-jules
  ```

- Start the application

  ```bash
  # From root
  cd app
  # .env file configuration
  cp .env.example .env
  # Install dependencies (use yarn or npm)
  npm install
  npm run build
  npm start
  ```

- Register the application on github in order to login with github

  Use this [link](https://github.com/settings/applications/new) or go to "Settings > Settings Developer settings > OAuth Apps > New OAuth App".

  To register your application, GitHub asks for:

  Application name: Local Supabase for WebTechNext  
  Homepage URL: <http://localhost:3000>  
  Authorization callback URL: <http://localhost:8000/auth/v1/callback>

  Keep you clientID et generate the client secret.

  ```bash
  # From root
  cd supabase
  # .env file configuration
  cp .env.example .env
  ```

  Open and update `.env` file accordingly with:
  
  - `GOTRUE_EXTERNAL_GITHUB_CLIENT_ID`
  - `GOTRUE_EXTERNAL_GITHUB_SECRET`

- Start Supabase

  ```bash
  docker-compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml up
  ```

## Authors

- Du Thomas, thomas.du@edu.ece.fr
- Jules Tristan, tristan.jules@edu.ece.fr

## Tasks
  
**Project management:**

- Naming convention  
  2/2  
  Conventional commits respected.
- Project structure  
  2/2  
  Project is relatively well structured.
- Git  
  2/2  
  Conventional commits respected.
- Code quality  
  3/4  
  Code is relatively clean
- Design, UX, and content  
  3/4  
  Relatively good.

**Application development:**

- Home page  
  1/2  
  Done, not much content.
- Login and profile page  
  3/4  
  Login with github, user information is persisted in React context.
- New articles creation  
  6/6  
  Done, user can create a new article witch will be stored to the self-hosted database.
- New comment creation  
  4/4  
  Done.
- Resource access control  
  6/6  
  Done.
- Article modification  
  4/4  
  Done.
- Article removal  
  2/2  
  Done, when the article is removed all its comments are removed too.
- Comment modification  
  2/2  
  Done.
- Comment removal  
  2/2  
  Done.
- Account settings  
  4/4  
  Done (username, firstname, lastname, email).
- WYSIWYG integration  
  0/2  
  TO DO.
- Gravatar integration  
  2/2  
  Done.
- Light/dark theme  
  2/2  
  Done.
- Accent color selection  
  1/4  
  TO FINSIH, user can choose favorite color.

