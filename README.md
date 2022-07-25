# UniCovoit

Plateforme de covoiturage pour étudiants

[![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=unicovoit&up_color=green&up_message=online&url=https%3A%2F%2Fcovoit.ozna.me)](https://status.unicovoit.fr)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/finxol/unicovoit)](https://github.com/finxol/unicovoit/releases/)
[![Docker Build Status](https://github.com/finxol/unicovoit/actions/workflows/docker-image.yml/badge.svg)](https://github.com/finxol/unicovoit/actions/workflows/docker-image.yml)
![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fcovoit.ozna.me)
[![GitHub license](https://img.shields.io/github/license/finxol/unicovoit)](https://github.com/finxol/unicovoit/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/finxol/unicovoit)](https://github.com/finxol/unicovoit/issues)

![GitHub stars](https://img.shields.io/github/stars/finxol/unicovoit)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/finxol)](https://github.com/sponsors/finxol)

Site officiel : [unicovoit.fr](https://unicovoit.fr)

Suivi de la disponibilité des services : [https://status.unicovoit.fr](https://status.unicovoit.fr)

#### Langue

- Français
- [English](README.en.md)

## Sommaire

- [Features](#features)
- [Contribuer et soutenir](#contribuer-et-soutenir)
- [Stack Technologique](#stack-technologique)
- [Variables d'environnement](#variables-denvironnement)
- [Lancer localement](#lancer-localement)
- [Déployer avec Docker](#dploiement-avec-docker)
- [Auteurs](#auteurs)
- [Mentions particulières](#mentions-particulires)
- [Licence](#licence)
- [Référence d'API publiques](#rfrence-dapi-publiques)

## Features

- [ ] Tous les comptes sont vérifiés comme appartenant à un étudiant
- [ ] Ajouter et réserver des voyages entre étudiants
- [ ] Marquez vos voyages comme récurrents afin de ne pas avoir à ajouter le même voyage chaque semaine.
- [x] Ajouter et réserver des voyages jusqu'à 3 semaines à l'avance.
- [x] Mode clair/sombre

*UniCovoit ne prend pas en charge les paiements*

## Contribuer et soutenir

Si vous souhaitez contribuer au projet, n'hésitez pas à ouvrir une issue ou à créer une pull request.

Si vous avez des retours, vous pouvez me joindre sur Discord (finxol#8918), Twitter (@_finxol) ou par mail à contact@finxol.io.

Vous pouvez également soutenir le projet en faisant un don par le [Programme de parrainage GitHub](https://github.com/sponsors/finxol).

## Stack technologique

**Framework:** Vuetify, Nuxt + Typescript

**Serveur:** Node (Typescript), Express

## Variables d'Environnement

Pour lancer ce projet localement, vous devez avoir les variables d'environnement suivantes :

```env
AUTH0_CLIENTID=<your auth0 client ID>
AUTH0_DOMAIN=<your auth0 tenant domain>
MAPBOX_TOKEN=<your mapbox token>
DISCORD_SECRET=<your Discord token>
MONGO_USER=<username for Mongo>
MONGO_PASSWORD=<password for Mongo>
VERIFICATION_SECRET=<secret to use with Auth0 Action>
```

## Lancer Localement

```bash
# Cloner le projet
git clone https://github.com/finxol/unicovoit
cd unicovoit

# Installer les dépendances
yarn install

# Démarrer le serveur de développement
  yarn dev
```

## Déploiement avec Docker

Avant de construire l'image Docker, vous devez avoir un répertoire `.dockersecrets`.

```
.dockersecrets
├── auth0_clientid.txt
└── auth0_domain.txt
```

Ces fichiers contiennent respectivement l'ID du client Auth0 et le domaine du tenant Auth0..

Vous devez également avoir un fichier `.env` avec les variables d'environnement déclarées plus tôt,
ainsi qu'un fichier `.mongo.env` complété.

```bash
# Construire l'image et l'exécuter avec Podman
yarn podman

# Construire l'image 
yarn podman:build

# Arrêter le container, reconstruire l'image et la lancer
yarn podman:rebuild

# Exécuter l'image
yarn podman:run

# Arrêter le container
yarn podman:kill
```

Si vous préférez utiliser Docker, remplacez simplement `podman` par `docker` dans les commandes ci-dessus.

### Addok

Pour l'autocomplétion des adresses, une instance [addok](https://github.com/BaseAdresseNationale/addok-docker) est utilisée.

Pour configurer la vôtre, suivez les étapes détaillées dans [cette issue](https://github.com/finxol/unicovoit/issues/3#issuecomment-1168000850).

## Auteurs

- [@finxol](https://www.github.com/finxol)

## Mentions particulières

*UniCovoit est encore en cours de développement. Toutes les fonctionnalités ne sont pas encore implémentées.*

- [Vuetify frontend framework](https://vuetifyjs.com)
- [Nuxt.js](https://nuxtjs.org)
- Authentification avec [Auth0](https://auth0.com)
- Distance et temps de trajet calculés avec [Mapbox](https://www.mapbox.com)
- Illustrations de [Icons8](https://icons8.com/)
- Police Grammatika de [Font Library](https://fontlibrary.org/en/font/grammatika)

## Licence

| Autorisé                | Obligatoire                        | Interdit              |
|:------------------------|:-----------------------------------|:----------------------|
| Utilisation commerciale | Publier la source                  | Responsabilité civile |
| Distribution            | Licence et Avis de droits d'auteur | Garanties             |
| Modification            | Même Licence                       |                       |
| Utilisation Privée      | Déclarer les changements           |                       |

Pour plus d'informations, veuillez lire le fichier `LICENSE`, ou allez à
[Choose A License](https://choosealicense.com/licenses/agpl-3.0/).

## Référence d'API publiques

#### Obtenir tous les voyages publiés

```http
  GET /api/v1/trips
```

#### Obtenir le prix moyen du Sans Plomb 95 pour la France

```http
  GET /api/v1/trips/petrol
```

#### Accéder au profil public d'un utilisateur

```http
  GET /api/v1/users/profile/:id
```

**Toutes les autres routes API ne sont accessibles qu'aux utilisateurs authentifiés.**

