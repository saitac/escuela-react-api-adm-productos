import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

interface IntProduct extends Model<InferAttributes<IntProduct>, InferCreationAttributes<IntProduct>> {
    name: string;
    price: number;
    availability: boolean;
}

export {
    IntProduct
}