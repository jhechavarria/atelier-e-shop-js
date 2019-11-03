## Cart Reference

### Proprietes

### Methodes

#### load

Charge les produits stockes en memoire.

**@param** *void*

**@return** *boolnqn* - Retourne vrai si le chargement est effectue

#### save

Sauvegarde les produits du panier en memoire

**@param** *void*

**@return** *void*

#### hasProduct

Verifie si un produit se trouve deja dans le panier

**@param** *Product* - Le produit a chercher.

**@return** *boolean* - Retourne vrai si le produit existe.

#### productIsIndexed

Cherche si un produit existe par son ID.

**@param** *int* - L'identifiant a verifier.

**@return** *boolean* - Retourne vrai si le produit existe.

#### getProduct

Recuperer un produit du panier.

**@param** *int* - L'identifiant du produit.

**@return** *Product* - Retourne le produit ou *NULL* si rien n'est trouve.

#### getProducts

Recuperer la liste complete des produits du panier.

**@param** *void*

**@return** *Product[]* - Liste complete des produits du panier.

#### addProduct

Ajouter un produit au panier. Si le produit existe deja, seule sa quantite sera augmentee.

**@param** *Product* - Le produit a ajouter.

**@param** *int* - La quantite a affecter. Si ce parametre n'est pas defini, la quantite du produit passe en parametre sera prise en compte.

**@return** *boolean* - Retourne vrai si le produit est ajoute ou si la quantite est modifiee.

#### removeProduct

Supprime un produit du panier.

**@param** * int* - L'identifiant du produit a supprimer.

**@return** *boolean* - Retourne vrai si le produit est supprime.

#### setQty

Definit la quantite du produit.

**@param** *int* - Quantite a affecter.

**@return** *void*

#### increaseQty

Augmente la quantite d'un produit.

**@param** *qty* - Quantite a affecter. Augmente de 1 par defaut.

**@return** *void*

#### decreaseQty

Diminue la quantite d'un produit.

**@param** *qty* - Quantite a affecter. Diminue de 1 par defaut.

**@return** *void*

#### getTotal

Calcule le prix total du panier.

**@param** *void*

**@return** *int* - Prix total du panier.

#### count

Compte le nombre de produits differents presents dans le panier.

**@param** *void*

**@return** *int* - Le nombre de produits differents dans le panier.

#### clear

Supprime tous les produits de la memoire et du panier.

**@param** *void*

**@return** *void*

#### on

Associe un callback a des evenements a ecouter.

**@param** *string* - Evenements a ecouter.

**@param** *funciton* - Le callback a appeler

**@return** *void*

```js
// Exemple 1: Ecoute d'un evenement
Cart.on('qtyChange', function(item) {
    console.log('La quantite un produit '+item.name+' est passee a '+item.qty);
});
```

```js
// Exemple 2: Ecoute simultanee de plusieurs evenements
Cart.on('qtyChange productAdd productRemove', function() {
    console.log('Le panier a ete mis a jour.');
});
```

### Evenements

#### load

**@param** *Product[]* - Liste des produits sauvegardes en memoire.

#### productAdd

**@param** *Product* - Produit nouvellement ajoute au panier.

#### productRemove

**@param** *Product* - Produit supprime du panier.

#### qtyChange

**@param** *Product* - Produit avec la nouvelle quantite.

#### qtySet

**@param** *Product* - Produit avec la nouvelle quantite.

#### qtyIncrease

**@param** *Product* - Produit avec la nouvelle quantite.

#### qtyDecrease

**@param** *Product* - Produit avec la nouvelle quantite.

#### clear

**@param** *void*