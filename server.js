const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3306;

// 1. Setup Koneksi ke MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        
    password: '71826quantum#sql',
    database: 'duskcoffee_db'
});

db.connect((err) => {
    if (err) {
        console.error('Waduh, gagal konek ke MySQL wok: ' + err.stack);
        return;
    }
    console.log('Mantap wok! Berhasil konek ke MySQL dengan id ' + db.threadId);
});

// 2. Bikin API Route buat ngambil data kopi
app.get('/api/products', (req, res) => {
    const sqlQuery = "SELECT * FROM products";
    
    db.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Kirim data hasil SELECT dari MySQL ke browser berbentuk JSON
        res.json(results);
    });
});

// 3. Jalankan Server Express
app.listen(PORT, () => {
    console.log(`Server Express-chan udah jalan di http://localhost:${PORT}`);
});