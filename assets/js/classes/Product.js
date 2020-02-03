var Product = function(data={}) {
    this.id = null;
    this.name = null;
    this.description = null;
    this.image = null;
    this.price = null;
    this.qty = 0;

    /**
     * Affecte les proprietes d'un objet quelconque au produit
     * 
     * @param Object Donnees a affecter
     * @return void
     */
    this.hydrate = function(data) {
        for (var prop in data) {
            if (this[prop] !== undefined) {
                this[prop] = data[prop];
            }
        } 
    }

    /**
     * Definit une quantite au produit
     * 
     * @param int La quantite a affecter
     * @return void
     */
    this.setQty = function(qty) {
        if (qty > Catalog.MAX_QTY) {
            qty = Catalog.MAX_QTY;
        } else if (qty < Catalog.MIN_QTY) {
            qty = Catalog.MIN_QTY;
        }
        this.qty = qty;
    }

    /**
     * Incremente la quantite du produit
     * 
     * @param int Quantite a incrementer
     * @return void
     */
    this.increaseQty = function(qty=1) {
        this.setQty(this.qty + qty);
    }

    /**
     * Decremente la quantite du produit
     * 
     * @param int Quantite a decrementer
     * @return void
     */
    this.decreaseQty = function(qty=1) {
        this.setQty(this.qty - qty);
    }

    /**
     * Teste l'egalite des proprietes de deux produits
     * 
     * @param Product Le produit a comparer
     * @return bool Retourne vrai si les produits sont identiques
     */
    this.equals = function(cmp) {
        let props = ['name', 'description', 'image'];
        for (var idx in props) {
            let prop = props[idx];
            if (this[prop] !== cmp[prop]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Cree une copie du produit
     * 
     * @paramvoid
     * @return Produit Nouvelle copie de l'objet
     */
    this.clone = function() {
        return new Product(this);
    }

    /**
     * Pseudo constructeur qui hydrate l'objet
     */
    this.hydrate(data);
}