table! {
    channel (id) {
        id -> Int4,
        name -> Text,
        allowed_users -> Int4,
        allowed_roles -> Text,
    }
}

table! {
    server (id) {
        id -> Int4,
        name -> Text,
        created_at -> Nullable<Date>,
        users -> Int4,
        channels -> Int4,
        settings -> Int4,
    }
}

table! {
    server_join (id) {
        id -> Int4,
        user_id -> Int4,
        server_id -> Int4,
        joined_at -> Nullable<Date>,
        settings -> Int4,
    }
}

table! {
    server_role (id) {
        id -> Int4,
        server_id -> Int4,
        name -> Text,
        is_admin -> Bool,
    }
}

table! {
    server_settings (id) {
        id -> Int4,
        roles -> Text,
    }
}

table! {
    user (id) {
        id -> Int4,
        username -> Text,
        email -> Text,
        name -> Text,
        password -> Text,
        created_at -> Nullable<Date>,
        updated_at -> Nullable<Date>,
    }
}

table! {
    user_server_settings (id) {
        id -> Int4,
        roles -> Text,
    }
}

joinable!(server -> channel (channels));
joinable!(server -> server_settings (settings));
joinable!(server_join -> server (server_id));
joinable!(server_join -> user (user_id));
joinable!(server_join -> user_server_settings (settings));

allow_tables_to_appear_in_same_query!(
    channel,
    server,
    server_join,
    server_role,
    server_settings,
    user,
    user_server_settings,
);
