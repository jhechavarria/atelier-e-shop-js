## Atelier e-shop.js

e-shop.js est un projet de groupe realise au cours de divers ateliers de developpement a l'ecole.

### Kezako

Le projet consiste a creer une partie d'une application de vente en ligne: listing du catalogue de produits et gestion du panier.

## Fonctionnalités

### Catalogue

#### Chargement du catalogue

- Chargement initial de N articles préconfigurés
- Chargement de N articles au scroll
- Injection groupée des N articles dans le DOM
- Image temporaire de préchargement sur chaque article
- Image produit par défaut si non renseignée
- Message de catalogue vide si pas de produits ou pas de variable catalogue

#### Filtres

- Ordonner les articles par noms/prix croissants/décroissants
- Définition du nombre de produits "par page" à charger
- Recherche d'articles par nom avec filtrage de la liste du catalogue

#### Actions Produit Catalogue

- Gestion de quantité avec ajout de produits
- Détails produit et gestion dans un modal via clic sur photo/nom du produit

### Panier

#### Chargement du panier

- Sauvegarde et chargement à partir du LocalStorage du navigateur
- Calcul du total du prix du panier
- Prise en compte des produits manquants: si produit sauvegardé dans le panier et non présent dans le catalogue. Les produits manquants sont exclus du calcul du total.

#### Actions Produit Panier

- Gestion des quantités
- Suppression du produit du panier
- Option pour vider le panier complet avec message de confirmation

## Read the docs

Consulter la documentation complete pour plus de details basiques et plus techniques.

[App Documentation](https://jhechavarria.github.io/atelier-e-shop-js/)