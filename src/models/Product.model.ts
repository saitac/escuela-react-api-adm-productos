
import { PrimaryKey } from "sequelize-typescript";
import db from "../config/db";
import { DataTypes } from "sequelize"

const Product = db.define("Product", {
    name:{
        type: DataTypes.STRING(100)
    },
    price: {
        type: DataTypes.FLOAT
    },
    availability:{
        type: DataTypes.BOOLEAN
    }
}, {tableName:"Products"});

export default Product
    


