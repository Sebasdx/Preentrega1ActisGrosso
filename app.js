/* class ProductManager {
    constructor() {
        this.productos = [];
        this.siguienteId = 1;
    }

    addProduct(title, descripcion, precio, miniatura, codigo, stock) {
        if (!title || !descripcion || !precio || !miniatura || !codigo || !stock) {
            throw new Error('faltan Datos');
        }

        if (this.productos.some(producto => producto.codigo === codigo)) {
            throw new Error('Ya existe un producto con ese codigo');
        }

        const nuevoProducto = {
            id: this.siguienteId++,
            title,
            descripcion,
            precio,
            miniatura,
            codigo,
            stock
        };

        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const producto = this.productos.find(producto => producto.id === id);
        if (!producto) {
            throw new Error('Not found');
        }
        return producto;
    }
} */

const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.productos = [];
        this.loadProducts();
        this.siguienteId = this.productos.length > 0 ? Math.max(...this.productos.map(producto => producto.id)) + 1 : 1;  /* ok */
    }

    addProduct(title, description, price, thumbnail, code, stock) {  /* modifique el spaniglish :V */
        const nuevoProducto = {
            id: this.siguienteId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.productos.push(nuevoProducto); /* ok */
        this.saveProducts();
        return nuevoProducto;
    }

    getProducts() {  /* oko */
        return this.productos;
    }

    getProductById(id) {
        const producto = this.productos.find(producto => producto.id === id); /* ok */
        if (!producto) {
            throw new Error('no hay producto');
        }
        return producto;
    }

    updateProduct(id, updatedFields) {
        const index = this.productos.findIndex(producto => producto.id === id); /* ok */
        if (index === -1) {
            throw new Error('no hay producto');
        }
        this.productos[index] = { ...this.productos[index], ...updatedFields };
        this.saveProducts();
        return this.productos[index];
    }

    deleteProduct(id) {
        this.productos = this.productos.filter(producto => producto.id !== id); /* ok */
        this.saveProducts();
    }

    loadProducts() {  
        try {
            const data = fs.readFileSync(this.path, 'utf8'); /* ok */
            this.productos = JSON.parse(data);
        } catch (error) {
            this.productos = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.productos, null, 2)); /* ok */
    }
}