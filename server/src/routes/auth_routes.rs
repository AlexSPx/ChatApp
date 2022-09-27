use actix_web::{web::{self, Data}, post, HttpResponse};

use crate::{models::{auth_models::{LoginBody, RegisterBody}, database::User}, DBPool};
use actix_session::{Session};

#[post("/login")]
async fn login(credentials: web::Json<LoginBody>, pool: Data<DBPool>, session: Session) -> HttpResponse {
    let mut conn = pool.get().expect("couldn't get DB connection from pool");

    match User::login(credentials, &mut conn) {
        Ok(user) => {
            HttpResponse::Ok()
                .content_type(actix_web::http::header::ContentType::json())
                .json(user)
        },
        Err(err) => {
            HttpResponse::Created()
                .content_type(actix_web::http::header::ContentType::json())
                .json(err.to_string())
        },
    }
}

#[post("/register")]
pub async fn register(credentials: web::Json<RegisterBody>, pool: Data<DBPool>, session: Session) -> HttpResponse {
    let mut conn = pool.get().expect("couldn't get DB connection from pool");
    

    match User::register(credentials, &mut conn) {
        Ok(user) => {
            HttpResponse::Created()
                .content_type(actix_web::http::header::ContentType::json())
                .json(user)
        },
        Err(err) => {
            HttpResponse::Created()
                .content_type(actix_web::http::header::ContentType::json())
                .json(err.to_string())
        },
    }
}