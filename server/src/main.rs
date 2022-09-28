#[macro_use] 
extern crate diesel;
extern crate dotenv;


use std::env;
use actix_cors::Cors;
use actix_identity::IdentityMiddleware;
use actix_session::{storage::RedisSessionStore, SessionMiddleware};
use actix_web::{HttpServer, App, web, cookie::Key, middleware, http::header};
use diesel::{r2d2::ConnectionManager,PgConnection};
use dotenv::dotenv;
use r2d2::{PooledConnection, Pool};

mod routes;
mod models;
mod handlers;
mod schema;

pub type DBPooledConnection = PooledConnection<ConnectionManager<PgConnection>>;
pub type DBPool = Pool<ConnectionManager<PgConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    std::env::set_var(
        "RUST_LOG",
        "simple-auth-server=debug,actix_web=info,actix_server=info",
    );
    env_logger::init();

    // postgres database
    let pg_database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(pg_database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool");

    let secret_key = Key::generate();
    let redis_store = RedisSessionStore::new("redis://167.99.128.248:6379")
        .await
        .expect("Redis connection error");



    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .wrap(IdentityMiddleware::default())
            .wrap(SessionMiddleware::new(
                redis_store.clone(),
                secret_key.clone()
            ))
            .wrap(cors)
            .service(web::scope("/api")
                // Routes here
                .service(routes::auth_routes::register)
                .service(routes::auth_routes::login)
                .service(routes::auth_routes::me)
            )
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
