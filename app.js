const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
        return {
                notes: row.song_note,
        };
}

app.get('/song/:id', (request, response) => {
        const query = 'SELECT song_note FROM notes WHERE song_id = ? AND is_deleted = 0';
        const params = [request.params.id];
        connection.query(query, params, (error, rows) => {
                response.send({
                        ok: true,
                        songs: rows.map(rowToObject),
                });
        });
});


app.post('/song/', (request, response) => {
        const query = 'INSERT INTO notes(id, song_id, song_note) VALUES (?, ?, ?)';
        const params = [request.body.id, request.body.song_id, request.body.song_note];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                        id: result.insertId,
                });
        });
});

app.patch('/song/:song_id/:id', (request, response) => {
        const query = 'UPDATE notes SET id = ?, song_id = ?, song_note = ? WHERE song_id = ? AND id = ?';
        const params = [request.body.id, request.body.song_id, request.body.song_note, request.params.song_id, request.params.id];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                });
        });
});


app.delete('/song/:song_id', (request, response) => {
        const query = 'UPDATE notes SET is_deleted = 1 WHERE song_id = ?'
        const params = [request.params.song_id];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                });
        });
});




const port = 3443;
app.listen(port, () => {
        console.log(`We are live on port ${port}`);
});
