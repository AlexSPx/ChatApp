use serde::{Deserialize, Serialize};
use crate::schema::user;

#[derive(Debug, Deserialize)]
pub struct LoginBody {
    pub email: String,
    pub password: String
}

#[derive(Insertable, Deserialize, Serialize)]
#[table_name = "user"]
pub struct RegisterBody {
    pub name: String,
    pub username: String,
    pub email: String,
    pub password: String
}