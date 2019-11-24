# Projet Webservices (Arthur DUFOUR - EPSI B3 DNT2 G1)


---


## Table des matières

1. [Choix des technologies](#choix-des-technologies)
    - Choix du SGBD
    - Choix technologie du backend
    - Choix technologie du frontend
2. [Mise en place du backend](#mise-en-place-du-backend)
3. [Mise en place du frontend](#mise-en-place-du-frontend)
4. [Installation](#installation)


---


## Choix des technologies

Le cahier des charges présentant le fait de devoir rechercher des informations sur un client (tout en déléguant la recherche sur le serveur), j'ai décidé de mettre en place un système de recherche approximative (fuzzy search).

Le principe est le suivant :
- le front présente une barre de recherche unique, dans laquelle on peut taper ce que l'on veut
- en validant la recherche, on envoi le contenu de l'input au serveur
- le serveur effectue la recherche dans la base de données en attribuant un score à chaque résultat
- le serveur renvoi la liste des résultats aillant matchés avec la recherche, en les triant en fonction du score (le plus élevé correspondant au meilleur résultat)

Cela permet, en ne connaissant que certains morceaux d'informations sur un client, de le retrouver facilement (ou encore, en orthographiant mal son adresse mail, de quand même obtenir le bon résultat).

Afin de mettre en place cela, j'ai utilisé les technologies suivantes pour les raisons listées ci-dessous.

> On notera également que j'ai utilisé Docker afin de faciliter la mise en place du projet (cf. partie [installation](#installation))...


### Choix du SGBD

J'ai choisi mon SGBD en fonction du cahier des charges qui m'imposait deux éléments importants :
- effectuer des recherches sur des champs textuels 
- effectuer ces recherches en moins de 3 secondes (dans une base avec 500k entrées).

Je me suis donc tourné vers MongoDB car :
- plus rapide que les SGBD relationnels sur les gros volumes de données
- possibilité de recherche textuels avancés via la création d'index

### Choix de la technologie du backend

Je me suis orienté vers un backend Node avec express.js pour les raisons suivantes :
- affinité & expérience
- rapidité de mise en place 

### Choix de la technologie du front

Je me suis orienté vers Vue.js pour les raisons suivantes :
- affinité & expérience
- simplicité de mise en place
- simplicité du traitement des données (requêtes AJAX & réactivité des données)


---


## Mise en place du backend

J'ai très rapidement pu mettre mon backend sur pied, en utilisant un boilerplate d'API REST que j'avais auparavant réalisé pour la création de POC rapide.
Ce boilerplate est basé sur le framework web [Express](https://expressjs.com/), et suit une architecture MVC permettant une conception claire et efficace.

À cela j'ai rajouté l'ORM [Mongoose](https://mongoosejs.com/) pour faciliter les intéractions avec ma base de données.


---


## Mise en place du frontend

J'ai utilisé le [CLI officiel de Vue](https://cli.vuejs.org/) qui m'a permis, via l'execution d'une seule commande de créer la base de mon projet.

À cette base j'ai rajouté la librairie [boostrap-vue](https://bootstrap-vue.js.org/) qui m'a permit de mettre en place le tableau, le champ de recherche et le composant gérant la pagination.

J'ai ensuite rajouté la librairie [axios](https://github.com/axios/axios) pour faire toutes mes requêtes HTTP à mon API.
Grâce à mes appels AJAX & à Vue, mon application est dynamique sans occasionner aucun rechargement de la page principale.


---


## Installation

### Prérequis

- Avoir installé `git` sur son poste.
- Avoir installé `docker-ce` & `docker-compose`.
- Avoir installé [MongoDB Compass](https://www.mongodb.com/products/compass?lang=fr-fr)

### Installation & utilisation

- Cloner le repository : `git clone https://github.com/Woosy/epsi-projet-webservices`
- Lancer le projet : `docker-compose up` (lance le projet en environnement de dev)
- Monter dans la base avec MongoDB Compass (user: username, password: password)
- Depuis MongoDB Compass : importer les données dans une collection `customers` (bien utiliser le fichier `clients.csv` inclus dans ce repo sans quoi l'importation ne fonctionnera pas).
- Lancer son navigateur à l'adresse http://localhost:8080

---

![](https://i.imgur.com/3jxpb4i.png)