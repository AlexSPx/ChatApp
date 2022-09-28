use actix_web::{web::{self, Data}, post, HttpResponse, HttpRequest, HttpMessage, Responder, get};

use crate::{models::{auth_models::{LoginBody, RegisterBody}, database::User}, DBPool};
use actix_identity::Identity;

#[post("/login")]
async fn login(request: HttpRequest, credentials: web::Json<LoginBody>, pool: Data<DBPool>) -> HttpResponse {
    let mut conn = pool.get().expect("couldn't get DB connection from pool");

    match User::login(credentials, &mut conn) {
        Ok(user) => {
            match Identity::login(&request.extensions(), user.id.to_string()) {
            Ok(_) => todo!(),
            Err(err) => {
                print!("{:?}", err)
            },
        }

            HttpResponse::Ok()
                .content_type(actix_web::http::header::ContentType::json())
                .json(user)
        },
        Err(err) => {
            print!("{}", err);
            HttpResponse::Unauthorized()
                .content_type(actix_web::http::header::ContentType::json())
                .json(err.to_string())
        },
    }
}

#[post("/register")]
pub async fn register(request: HttpRequest, credentials: web::Json<RegisterBody>, pool: Data<DBPool>) -> HttpResponse {
    let mut conn = pool.get().expect("couldn't get DB connection from pool");

    match User::register(credentials, &mut conn) {
        Ok(user) => {
            Identity::login(&request.extensions(), user.id.to_string()).unwrap();

            HttpResponse::Created()
                .content_type(actix_web::http::header::ContentType::json())
                .json(user)
        },
        Err(err) => {
            HttpResponse::Unauthorized()
                .content_type(actix_web::http::header::ContentType::json())
                .json(err.to_string())
        },
    }
}

#[get("/me")]
pub async fn me(user: Option<Identity>, pool: Data<DBPool>) -> impl Responder {
    if let Some(user) = user {
        match user.id() {
            Ok(id) => {
                let mut conn = pool.get().expect("couldn't get DB connection from pool");
                let user_data = User::me(id, &mut conn);

                HttpResponse::Ok()
                    .content_type(actix_web::http::header::ContentType::json())
                    .json(user_data)
            },
            Err(_) => {
                HttpResponse::Unauthorized().body("unauthorized")
            },
        }
    } else {
        HttpResponse::Unauthorized().body("unauthorized")
    }
}