# Astro
Api Astro.
> Projet personnel d'Astrologie en responsive.

## Astro Back-End
![NodeJs](https://img.shields.io/badge/NodeJs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-EEEEEE?style=for-the-badge&logo=express&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
### Installation
Dans le répertoire `back`, créez un fichier `.env` contenant l'url, le port du serveur et l'url de MongoDB.
```
HOST="127.0.0.1"
PORT=8080
DB_MONGODB="mongodb+srv://..."
```
Ouvrez le répertoire `back` dans le terminal, exécutez :

```terminal
npm install
```
Une fois l'installation terminé exécutez l'une des commandes disponibles.

### Commandes disponibles
Ouvrez le répertoire `back` dans le terminal, exécutez :

```terminal
npm start
```
_Exécute le serveur de l'api._

```terminal
npm run dev
```
_Exécute le serveur de l'api en mode développement. (nodemon)_

### Requêtes disponibles
#### Les signes
Pour récuperer la liste des signes.

> **GET** [http://localhost:8080/api/signs/:type](http://localhost:8080/api/signs/:type)\
_Remplacer :type par 'chinese' / 'occidental'_

Pour récuperer le signe selon son identifiant.

> **GET** [http://localhost:8080/api/signs/:type/:id](http://localhost:8080/api/signs/:type/:id)\
_Remplacer :type par 'chinese' / 'occidental'._\
_Et :id par l'identifiant du signe._

#### Les années
Pour récuperer la liste des années du calendrier chinois.

> **GET** [http://localhost:8080/api/signs/years](http://localhost:8080/api/signs/years)
#### Les éléments
Pour récuperer la liste des éléments chinois.

> **GET** [http://localhost:8080/api/elements](http://localhost:8080/api/elements)

Pour récuperer l'élément chinois selon son identifiant.

> **GET** [http://localhost:8080/api/elements/:id](http://localhost:8080/api/elements/:id)\
_Remplacer :id par l'identifiant de l'élément._

## Astro Front-End
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
### Commandes disponibles
> À venir...

## Aperçu
> À venir...
