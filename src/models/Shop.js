class Shop{
    constructor(id, user, name, description, phone, address, createdAt, slug, products) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.address = address;
        this.createdAt = createdAt;
        this.slug = slug;
        this.products = products;
    }

}

export default Shop
