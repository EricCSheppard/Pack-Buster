# Pack Buster


## Overview
---

Pack Buster is an application where users can open virtual booster packs of the trading card game, Magic the Gathering.  Packs from various sets over the years will be available to open.  If you get a good hit, you can save your card to your collection for other users to view and comment on!  Each saved card can be viewed to see more information and get additional links.  


## Technologies used
---
    HTML
    Javascript
    CSS
    Mongoose
    Express
    Liquid
    Axios
---
## User Stories

    As a user I want the ability to sign up
    As a user I want the ability to sign in
    As a user I want the ability to sign out
    As a user I want the ability to choose a set to open a pack from
    As a user I want the ability to see the cards in the pack
    As a user I want the ability to see more information about the cards
    As a user I want the ability to save a card that I liked
    As a user I want the ability to comment on my own and other users card collections
    As a user I want the ability to see a list of my saved cards
    As a user I want the ability to remove saved cards from my collection
    As a user I want the ability to add custom notes to my cards

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


## Cards

| URL       |   HTTP Verb|  Action |
| ----------- | ----------- | ----|
| /savedCards/new  |    POST     | create     |
| /savedCards/  |    GET     | index     |
| /savedCards/:id  |    GET      | show     |
| /savedCards/user/:id  |    GET      | index     |
| /savedCards/edit/:id |    PUT      | update     |
| /savedCards/:id |    DELETE      | destroy     |

## API

| URL       |   HTTP Verb|  Action |
| ----------- | ----------- | ----|
| /mtgapi/open     | GET       | index      |
| /mtgapi/*    | GET       | search      |



## Comments

| URL       |   HTTP Verb|  Action |
| ----------- | ----------- | ----|
| /comments/:userId     | POST       | create      |
| /comments/delete/:userId/:commentId  |    DELETE     | destroy     |

---
## Wireframes
---

![Pack Buster Wireframes](https://i.imgur.com/f6zYjiA.png)

## ERD
---

![Pack Buster ERD](./img/Pack%20Buster%20ERD.png)