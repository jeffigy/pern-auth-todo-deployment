-- CREATE DATABASE authtodo;
CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- INSERT INTO
--     users(user_name, user_email, user_password)
-- VALUES
--     ('doe', 'doe@m.com', 'doe');
-- INSERT INTO
--     todos(user_id, description)
-- VALUES
--     (
--         'a5f0a115-5e25-4885-950c-190b03866456',
--         'does 1st todo'
--     );