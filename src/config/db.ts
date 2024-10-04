
import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config();

//const db = new Sequelize("postgresql://escuela_rect_api_adm_productos_user:aqQwbyU7rKiKPoFFHg9mLd7jZao6zD7t@dpg-crg9val6l47c73dttbqg-a.oregon-postgres.render.com/escuela_rect_api_adm_productos?ssl=true");

const db = new Sequelize(<string>process.env.DATABASE_URL,
    {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: false
            }
        },
        logging: false
    }
);

export default db;