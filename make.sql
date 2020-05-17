DROP DATABASE IF EXISTS songs;
DROP USER IF EXISTS songs_user@localhost;

CREATE DATABASE songs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER songs_user@localhost IDENTIFIED BY 'kookies';
GRANT ALL PRIVILEGES ON songs.* TO songs_user@localhost;
