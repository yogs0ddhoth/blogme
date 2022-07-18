import "express-session";
import { IntegerDataType, StringDataType } from "sequelize/types";

declare module "express-session" {
    interface SessionData {
      user_id: number,
      user_name: string,
      logged_in: boolean
    }
}