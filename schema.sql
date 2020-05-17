DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
        id INT,
        song_id VARCHAR(100),
        song_note VARCHAR(2),
        is_deleted INT DEFAULT 0,
        PRIMARY KEY (id, song_id)
);
