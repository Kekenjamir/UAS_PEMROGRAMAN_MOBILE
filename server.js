//Library
const express = require('express'); // Framework NodeJS Supaya WEB Dibuka di Browser
const mysql = require('mysql'); // Database
const BodyParser = require('body-parser'); // menangkap data di form

// Menggunakan Express
const app = express();

// Template Engines yang memungkinkan menghasilkan sebuah markup HTML dengan Javascript biasa
app.set('view engine', 'ejs');
app.set('views', 'views');

// Post Form
app.use(BodyParser.urlencoded({ extended: true }));

// Konfigurasi Database
const db = mysql.createConnection({
  host: 'localhost',
  database: 'ukuran_busana',
  user: 'root',
  password: '',
});

// Koneksi Ke Database
db.connect((err) => {
  if (err) throw err;
  console.log('database connected..');

  // Menampilkan Data
  app.get('/', (reg, res) => {
    const sql = 'SELECT * FROM tblukuran ';
    db.query(sql, (err, result) => {
      const ukuran = JSON.parse(JSON.stringify(result)); // mengambil string JSON dan mengubahnya menjadi objek JavaScript
      res.render('index', { ukuran: ukuran });
    });
  });

  // Menambah Data
  app.get('/tambah', (reg, res) => {
    res.render('tambah');
  });

  //insert data
  app.post('/tambah', (req, res) => {
    const insertSql = `INSERT INTO tblukuran (nama_pelanggan, jenis_pesanan, lingkar_badan,panjang_atasan, lingkar_pinggang,panjang_bawahan ) VALUES ('${req.body.namapelanggan}','${req.body.gridRadios}','${req.body.badan}','${req.body.atasan}','${req.body.pinggang}','${req.body.bawahan}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

// Mengubah Data
app.get('/ubah', (reg, res) => {
  res.render('ubah');
});

app.post('/ubah', (req, res) => {
  const sql =
    "UPDATE tblukuran SET nama_pelanggan='" +
    req.body.namapelanggan +
    "', jenis_pesanan='" +
    req.body.gridRadios +
    "', lingkar_badan='" +
    req.body.badan +
    "', panjang_atasan='" +
    req.body.atasan +
    "', lingkar_pinggang='" +
    req.body.pinggang +
    "', panjang_bawahan='" +
    req.body.bawahan +
    "' WHERE id_pelanggan=" +
    req.body.idpelanggan;
  const query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Menghapus Data
app.get('/hapus', (reg, res) => {
  res.render('hapus');
});

app.post('/hapus', (req, res) => {
  const sql = 'DELETE FROM tblukuran WHERE id_pelanggan=' + req.body.idpelanggan + '';
  const query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//server
app.listen(1111, () => {
  console.log('server ready...');
});
