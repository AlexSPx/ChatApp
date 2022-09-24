use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct LoginBody {
    pub email: String,
    pub password: String
}

#[derive(Debug, Deserialize)]
pub struct RegisterBody {
    pub name: String,
    pub username: String,
    pub email: String,
    pub password: String
}