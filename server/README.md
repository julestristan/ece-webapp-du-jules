# Webapp 2022

Repository du projet Webtech 2022

## Prérequis

Express :

```bash
npm install express
```

## Essayer le code

Commencez par initialiser npm :

```bash
npm init -y
```

Puis :

```bash
npm run develop
```

Accedez à la page d'accueil via : http://localhost:3000/

Voici les routes disponibles :

- http://localhost:3000/hello/ + *nom*
- http://localhost:3000/about
- http://localhost:3000/articles

## Test

Tester avec la console :

```bash
curl -X POST http://localhost:3000/articles -H 'Content-Type: application/json' -d '{"title":"Article x", "content":"Content", "author":"Thomas"}'
curl -X GET http://localhost:3000/articles 
```

## Contributeurs

- Tristan JULES
- Thomas DU
