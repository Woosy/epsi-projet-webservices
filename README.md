# Projet Webservices (Arthur DUFOUR - EPSI B3 DNT2 G1)


---


## Table des matières

1. [Choix des technologies](#choix-des-technologies)
    - [Choix du SGBD](#choix-du-sgbd)
    - [Choix technologie backend](#choix-technologie-backend)
    - [Choix technologie frontend](#choix-technologie-frontend)
2. [Mise en place du backend](#mise-en-place-du-backend)
3. [Mise en place du frontend](#mise-en-place-du-frontend)
4. [Challenges](#challenges)
    - Challenge n°1 ~ Recherche en moins de 3 secondes
    - Challenge n°2 ~ Intérruption de service
    - Challenge n°3 ~ Analytics
5. [Installation](#installation)


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

### Choix technologie backend

Je me suis orienté vers un backend Node avec express.js pour les raisons suivantes :
- affinité & expérience
- rapidité de mise en place 

### Choix technologie frontend

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


## Challenges

### Challenge n°1 ~ Recherche en moins de 3 secondes

Ce challenge est réalisé par le simple choix des technologies utilisées :

Grâce à la rapidité de Mongo, les requêtes sur chacun des champs des 500k entrées de la collection ne prennent que quelques dizaines de millisecondes !

![](https://i.imgur.com/yEz4Re5.png)

De plus, express gère automatiquement la mise en cache des résultats, permettant d'obtenir des temps de réponses encore plus faibles lorsque l'on fait deux fois de suite la même requête !

![](https://i.imgur.com/EQMcl34.png)

### Challenge n°2 ~ Intérruption de service

Dans le cadre de ce challenge, j'ai implémenté un mini système de cache en me basant sur le diagramme fourni dans le cahier des charges.

Son fonctionnement est le suivant :

```javascript
handleSearchChange () {
    const query = this.searchQuery

    // if query's result is in cache
    const result = this.cache.find(item => item.query === query)
    if (result) {
        this.items = result.items
        return
    }

    // otherwise, query the API and store the response in the cache
    axios.get(`http://localhost:3005/v1/customers/search?search=${query}`).then(res => {
    this.items = res.data.customers

    // update the cache
    this.cache.push({ query, items: res.data.customers })
    try {
        localStorage.setItem('projet-webservices.cache', JSON.stringify(this.cache))
    } catch (err) {
        console.error(err)
        console.alert('LocalStorage might be full')
    }
    })
}
```

![](https://i.imgur.com/BDXMOfi.png)

### Challenge n°3 ~ Analytics

Afin d'intégrer rapidement et facilement les fonctionnalités de Google Analytics, j'ai utilisé le package [vue-analytics](https://github.com/MatteoGabriele/vue-analytics).

Ainsi, je n'ai qu'à rajouter le snippet suivant afin d'enregistrer la recherche ainsi que le nombre de résultats qu'elle retourne.
(le lieu, la date, l'heure, ainsi que les informations de l'OS & du navigateur sont également enregistrées (configuration par défaut))

```javascript
this.$ga.event({
    eventCategory: 'category',
    eventAction: 'customer_search',
    eventLabel: this.searchQuery,
    eventValue: res.data.customers.length
})
```


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

![](https://i.imgur.com/P0RQpbQ.png)