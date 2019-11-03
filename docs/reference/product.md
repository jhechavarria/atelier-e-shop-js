## Product Reference

### Proprietes

**id** *int* - L'identifiant du produit. Actuellement l'index du tableau de base.

**name** *string* - La nom du produit.

**description** *string* - La description du produit.

**image** *string* - Lien de l'image rattachee au produit.

**price** *float* - Prix unitaire du produit.

**qty** *int* - Quantite du produit a associer au panier.

### Methodes

#### hydrate

Assigne les proprietes d'un objet quelconque aux proprietes du produit.

**@param** *Object* data - Objet source.

**@return** *void*

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

#### equals

Compare deux produits.

**@param** *Product* - Le produit a comparer.

**@return** *boolean* - Retourne vrai si les deux produits sont egaux.

#### clone

Cree une copie du produit courant.

**@param** *void*

**@return** *Product* - Le nouveau produit.