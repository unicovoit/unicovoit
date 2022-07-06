# UniCovoit

Carpool platform for students

[![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=unicovoit&up_color=green&up_message=online&url=https%3A%2F%2Fcovoit.ozna.me)](https://unicovoit.com)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/finxol/unicovoit)](https://github.com/finxol/unicovoit/releases/)
[![Docker Build Status](https://github.com/finxol/unicovoit/actions/workflows/docker-image.yml/badge.svg)](https://github.com/finxol/unicovoit/actions/workflows/docker-image.yml)

![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fcovoit.ozna.me)
[![GitHub license](https://img.shields.io/github/license/finxol/unicovoit)](https://github.com/finxol/unicovoit/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/finxol/unicovoit)](https://github.com/finxol/unicovoit/issues)

[![GitHub Sponsors](https://img.shields.io/github/sponsors/finxol)](https://github.com/sponsors/finxol)

Official deployment: [unicovoit.com](https://unicovoit.com)

## Summary

- [Features](#features)
- [Contribute and Support](#contribute-and-support)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Public API Reference](#api-reference)

## Features

- [ ] All accounts are verified as belonging to a student
- [ ] Add and book trips between students
- [ ] Mark your trip as recurring so that you don't have to add the same one every week
- [x] Add and book trips up to 3 weeks in advance
- [x] Light/dark mode toggle

*UniCovoit doesn't handle payments*

## Contribute and Support

If you want to contribute to the project, feel free to open an issue or create a pull request.

If you have any feedback, you can reach me on Discord (finxol#8918), Twitter or via email on contact@finxol.io

You can also support the project by donating to the [GitHub Sponsorship Program](https://github.com/sponsors/finxol).

## Tech Stack

**Framework:** Vuetify, Nuxt + Typescript

**Server:** Node (Typescript), Express

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```env
AUTH0_CLIENTID=<your auth0 client ID>
AUTH0_DOMAIN=<your auth0 tenant domain>
MAPBOX_TOKEN=<your mapbox token>
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/finxol/unicovoit
```

Go to the project directory

```bash
  cd unicovoit
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```

## Deployment

Before building, your need a `.dockersecrets` directory

```files
.dockersecrets
├── auth0_clientid.txt
└── auth0_domain.txt
```

The files respectively contain the Auth0 Client ID and the Auth0 tenant domain.

To build and run with podman, run:

```bash
  yarn podman
```

If you prefer using Docker, just replace podman with docker in the commands above.

### Addok

For address auto-completion, an [addok](https://github.com/BaseAdresseNationale/addok-docker) instance is used.

To setup your own, follow the steps detailed in [this issue](https://github.com/finxol/unicovoit/issues/3#issuecomment-1168000850).

## Authors

- [@finxol](https://www.github.com/finxol)

## Acknowledgements

*UniCovoit is still under development. Not all features might be implemented yet*

- [Vuetify frontend framework](https://vuetifyjs.com)
- [Nuxt.js](https://nuxtjs.org)
- Authentication by [Auth0](https://auth0.com)
- Distance and duration calculated by [Mapbox](https://www.mapbox.com)
- Illustrations from [Icons8](https://icons8.com/)
- Font Grammatika from [Font Library](https://fontlibrary.org/en/font/grammatika)

## License

| Can            | Must                         | Cannot    |
|:---------------|:-----------------------------|:----------|
| Commercial Use | Disclose Source              | Liability |
| Distribution   | License and Copyright Notice | Warranty  |
| Modification   | Same License                 |           |
| Patent Use     | State Changes                |           |
| Private Use    |                              |           |

For more information, please read the `LICENSE` file, or go to
[Choose A License](https://choosealicense.com/licenses/agpl-3.0/).

## API Reference

#### Get all published trips

```http
  GET /api/v1/trips
```

#### Get distance between two cities

```http
  GET /api/v1/trips/distance
```

| Parameter | Type     | Description                           |
|:----------|:---------|:--------------------------------------|
| `from`    | `string` | **Required**. Name of the first city  |
| `to`      | `string` | **Required**. Name of the second city |

Returns a json object containing the distace in kilometers and duration in minutes

```json
{
    "distance": 0,
    "duration": 0
}
```

#### Get the average price of Unleaded 95 for France

```http
  GET /api/v1/trips/petrol
```

#### Access the public profile of a user

```http
  GET /api/v1/users/profile/:id
```

**All other API routes are only accessible by authenticated users**

