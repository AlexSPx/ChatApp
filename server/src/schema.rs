// @generated automatically by Diesel CLI.

diesel::table! {
    channel (id) {
        id -> Int4,
        name -> Text,
        allowed_users -> Int4,
        allowed_roles -> Text,
    }
}

diesel::table! {
    server (id) {
        id -> Int4,
        name -> Text,
        created_at -> Date,
        users -> Int4,
        channels -> Int4,
        settings -> Int4,
    }
}

diesel::table! {
    server_join (id) {
        id -> Int4,
        user_id -> Int4,
        server_id -> Int4,
        joined_at -> Date,
        settings -> Int4,
    }
}

diesel::table! {
    server_role (id) {
        id -> Int4,
        server_id -> Int4,
        name -> Text,
        is_admin -> Bool,
    }
}

diesel::table! {
    server_settings (id) {
        id -> Int4,
        roles -> Text,
    }
}

diesel::table! {
    user (id) {
        id -> Int4,
        username -> Text,
        email -> Text,
        name -> Text,
        password -> Text,
        created_at -> Date,
        updated_at -> Date,
    }
}

diesel::table! {
    user_server_settings (id) {
        id -> Int4,
        roles -> Text,
    }
}

diesel::joinable!(server -> channel (channels));
diesel::joinable!(server -> server_settings (settings));
diesel::joinable!(server_join -> server (server_id));
diesel::joinable!(server_join -> user (user_id));
diesel::joinable!(server_join -> user_server_settings (settings));

diesel::allow_tables_to_appear_in_same_query!(
    channel,
    server,
    server_join,
    server_role,
    server_settings,
    user,
    user_server_settings,
);
