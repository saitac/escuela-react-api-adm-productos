
import db from "../config/db";
import { DataTypes } from "sequelize"
import { IntProduct } from "../interfaces/interfaces";

const Product = db.define<IntProduct>("Product", {
    name:{
        type: DataTypes.STRING(100)
    },
    price: {
        type: DataTypes.FLOAT
    },
    availability:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {tableName:"Products"});

export default Product
    


