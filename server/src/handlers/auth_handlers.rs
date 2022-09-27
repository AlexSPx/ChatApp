use actix_web::web;

use crate::models::auth_models::RegisterBody;

async fn register(credentials: web::Json<RegisterBody>) {

}