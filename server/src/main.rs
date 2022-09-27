use std::env;

use actix_session::{SessionMiddleware, storage::CookieSessionStore, config::PersistentSession};
use actix_web::{HttpServer, App, web, cookie::{self, Key}};
use diesel::{r2d2::ConnectionManager,PgConnection};
use dotenv::dotenv;
use r2d2::{PooledConnection, Pool};

mod routes;
mod models;
mod handlers;

pub type DBPooledConnection = PooledConnection<ConnectionManager<PgConnection>>;
pub type DBPool = Pool<ConnectionManager<PgConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    // postgres database
    let pg_database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(pg_database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool");

    HttpServer::new(move || {
        App::new()
        .wrap(SessionMiddleware::builder(CookieSessionStore::default(), Key::from(&[0; 64]))
            .cookie_secure(false)
            .session_lifecycle(
                PersistentSession::default().session_ttl(cookie::time::Duration::hours(2)),
            ).build()
        )
        .app_data(web::Data::new(pool.clone()))
        .service(web::scope("/api")
        // Routes here
        )
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
