class Product {
    constructor(id, category, colors, photo, name, price, description, weight, specs, branch, origin, discount, shop, user, createdAt, slug, averageRating) {
        this.id = id;
        this.category = category;
        this.colors = colors;
        this.photo = photo;
        this.name = name;
        this.price = price;
        this.description = description;
        this.weight = weight;
        this.specs = specs;
        this.branch = branch;
        this.origin = origin;
        this.discount = discount;
        this.shop = shop;
        this.user = user;
        this.createdAt = createdAt;
        this.slug = slug;
        this.averageRating = averageRating;
    }

}

export default Product
