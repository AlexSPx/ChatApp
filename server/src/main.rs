use actix_web::{HttpServer, App};
use dotenv::dotenv;

mod routes;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    HttpServer::new(|| {
        App::new()
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
