use std::fmt::Display;

use actix_web::web;
use diesel::{result::{Error, DatabaseErrorKind}, RunQueryDsl};
use scrypt::{Scrypt,password_hash::{SaltString, rand_core::OsRng, PasswordHasher, PasswordHash, PasswordVerifier}};

use crate::{models::{auth_models::{RegisterBody, LoginBody}, database::User}, DBPooledConnection};

#[derive(Debug)]
pub enum UserCreationError {
    DuplicatedEmail,
    DuplicatedUsername,
}

impl From<Error> for UserCreationError {
    fn from(err: Error) -> UserCreationError {
        if let Error::DatabaseError(DatabaseErrorKind::UniqueViolation, info) = &err {
            match info.constraint_name() {
                Some("users_username_key") => return UserCreationError::DuplicatedUsername,
                Some("users_email_key") => return UserCreationError::DuplicatedEmail,
                _ => {}
            }
        }
        panic!("Error creating user: {:?}", err)
    }
}

impl Display for UserCreationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::DuplicatedUsername => write!(f, "Username is already taken"),
            Self::DuplicatedEmail => write!(f, "Email is already taken")
        }
    }
}

#[derive(Debug)]
pub enum UserLoginError {
    InvalidEmail,
    PasswordsDoesNotMatch
}

impl Display for UserLoginError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            UserLoginError::InvalidEmail => write!(f, "Invalid email"),
            UserLoginError::PasswordsDoesNotMatch => write!(f, "Incorect password"),
        }
    }
}

impl User {
    pub fn register(credentials: web::Json<RegisterBody>, conn: &mut DBPooledConnection) -> Result<User, UserCreationError>{
        use crate::schema::user::dsl::*;
    
        let mut user_data = credentials.0;
        
        let salt = SaltString::generate(&mut OsRng);
        let hashed_password = Scrypt
            .hash_password(user_data.password.as_bytes(), &salt)
            .expect("Hash Error")
            .to_string()
            .to_owned();
    
        user_data.password = hashed_password;
    
        diesel::insert_into(user)
            .values(user_data)
            .get_result::<Self>(conn)
            .map_err(Into::into)
    }
    pub fn login(credentials: web::Json<LoginBody>, conn: &mut DBPooledConnection) -> Result<User, UserLoginError> {
        use crate::schema::user::dsl::*;
        use crate::diesel::query_dsl::methods::FilterDsl;
        use diesel::expression_methods::ExpressionMethods;

        let user_data = user
            .filter(email.eq(credentials.0.email))
            .get_result::<Self>(conn)
            .map_err(|_| UserLoginError::InvalidEmail)?;

        let parsed_hash = PasswordHash::new(&user_data.password).unwrap();
        Scrypt
            .verify_password(&credentials.0.password.as_bytes(), &parsed_hash)
            .map_err(|_| UserLoginError::PasswordsDoesNotMatch)?;

        Ok(user_data)
    }
}