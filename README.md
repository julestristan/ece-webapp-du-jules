# Blogging application - ECE Webtech project

*presentation, introduction, ...*

## Production

- Vercel URL: https://...
- Supabase project URL: https://app.supabase.com/project/...

## Usage

*how to start and use the application, run the tests, ...*

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
  *place your graduation and comments*
- Project structure  
  *place your graduation and comments*
- Git  
  *place your graduation and comments*
- Code quality  
  *place your graduation and comments*
- Design, UX, and content  
  *place your graduation and comments*

**Application development:**

- Home page  
  1/2  
  A améliorer
- Login and profile page  
  3/4  
  En cours  
  Login with github
- New articles creation  
  6/6  
  Done
- New comment creation  
  4/4  
  Done
- Resource access control  
  /6  
  TO DO
- Article modification  
  4/4  
  Done
- Article removal  
  2/2  
  Done, when the article is removed all its comments are removed too
- Comment modification  
  2/2  
  Done
- Comment removal  
  2/2
  Done
- Account settings  
  /4  
  Done (username, firstname, lastname, email)
- WYSIWYG integration  
  /2  
  TO DO
- Gravatar integration  
  2/2  
  Done
- Light/dark theme  
  2/2  
  Done
- Accent color selection  
  /4
  TO DO

## Bonus

- Task title  
  *place your graduation and comments*
