## Catalog Reference

### Proprietes

**products** *Product[]* - Liste des produits des differents catalogues.

### Constantes

**MIN_QTY** *int* - Quantite minimale assignable par produit.

**MAX_QTY** *int* - Quantite maximale assignable par produit.

### Methodes

#### load

Charge les catalogues a la volee.

**@param** *function* - Callback appele en fin de chargement.
**@return** *voie*
**@callback** *Product[]* - Liste des produits charges.

#### productIsIndexed

**@param** *int* - Identifiant de produit a verifier.
**@return** *boolean* - Retourne vrai si l'index correspond a un produit.

#### getProduct

**@param** *int* - Identifiant du produit a recuperer.
**@return** *Product* - Retourne le produit trouve ou *NULL* si aucun produit ne correspond a l'identifiant fourni.

### Evenements

#### onLoad

**@param** *Product[]* - Liste des produits charges.