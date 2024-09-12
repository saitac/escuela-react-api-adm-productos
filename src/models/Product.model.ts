
import db from "../config/db";
import { DataTypes } from "sequelize"

const Product = db.define("Product", {
    name:{
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    availability:{
        type: DataTypes.BOOLEAN
    }
},{tableName:"Products"});

export default Product
    


