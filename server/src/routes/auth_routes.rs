use actix_web::{web, post};

use crate::models::auth_models::{LoginBody, RegisterBody};

#[post("/login")]
async fn login(credentials: web::Json<LoginBody>) -> String {
    "Ok".to_owned()
}

#[post("/register")]
async fn register(credentials: web::Json<RegisterBody>) -> String {
    "Ok".to_owned()
}