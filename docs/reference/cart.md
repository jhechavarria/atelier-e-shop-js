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

#### productIsIndexed

#### getProduct

#### getProducts

#### addProduct

#### removeProduct

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

#### count

#### clear

#### on

Associe un callback a des evenements a ecouter.

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