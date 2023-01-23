# Pack Buster


## Overview
---

Pack Buster is an application where users can open virtual booster packs of the trading card game, Magic the Gathering.  Packs from various sets over the years will be available to open.  If you get a good hit, you can save your pack for other users to view and comment on.


## Technologies used
---
    HTML
    Javascript
    CSS
    Mongoose
    Express
    Liquid

---
## User Stories

    As a user I want the ability to sign up
    As a user I want the ability to sign in
    As a user I want the ability to sign out
    As a user I want the ability to choose a set to open a pack from
    As a user I want the ability to see the cards in the pack
    As a user I want the ability to see more information about the cards
    As a user I want the ability to save a pack that I liked
    As a user I want the ability to comment on my own and other users saved packs
    As a user I want the ability to see a list of my saved packs
    As a user I want the ability to remove saved packs from my collection

## Route Tables for Documents
---
## Users

| URL       |   HTTP Verb|  Action |
| ----------- | ----------- | ----|
| /users/signup     | GET       | new      |
| /users/signup  |    POST      | create     |
| /users/login  |    GET      | login     |
| /users/login  |    POST      | create     |
| /users/logout  |    POST     | destroy     |


## Packs

| URL       |   HTTP Verb|  Action |
| ----------- | ----------- | ----|
| /packs/open     | GET       | show      |
| /packs/new  |    POST     | create     |
| /packs/:id  |    GET      | show     |
| /packs/  |    GET      | index     |
| /packs/:id |    DELETE      | destroy     |

## Comments

| URL       |   HTTP Verb|  Action |
| ----------- | ----------- | ----|
| /comments/:packId     | POST       | create      |
| /comments/delete/:packId/:commentId  |    DELETE     | destroy     |

---
## Wireframes
---

![Pack Buster Wireframes](https://i.imgur.com/f6zYjiA.png)

## ERD
---

![Pack Buster ERD](https://i.imgur.com/LR4PWj6.png)