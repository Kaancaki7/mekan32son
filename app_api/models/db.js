var mongoose = require( 'mongoose' );
var dbURI = 'mongodb+srv://mekan32:mekan32mekan@mekan32.qpqag.mongodb.net/mekan32?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true});

//bağlandığında konsola bağlantı bilgilerini yazdır..
mongoose.connection.on('connected', function() {
  console.log('Mongoose' + dbURI+
    ' adresindeki veri tabanina baglandi\n');
});

//bağlantı hatası olduğunda konsola hata bilgisini yazdır..
mongoose.connection.on('error', function(err) {
  console.log('Mongoose baglanti hatasi\n: ' + err);
});

//bağlantı kesildiğinde konsola kesilme bilgisini yaz..
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose baglantisi kesildi\n');
}); 

kapat = function(msg,callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose kapatildi\n' + msg);
        callback();
    });
};
//nodemon için kapatma..
process.once('SIGUSR2', function() {
    kapat('nodemon kapatildi\n', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//uygulama kapandığında kapat..
process.on('SIGINT', function() {
    kapat('uygulama kapatildi\n', function() {
        process.exit(0);
    });
});
//herokudan kapatma işleminde..
process.on('SIGTERM', function() {
    kapat('heroku kapatildi\n', function() {
        process.exit(0);
    });
});
require('./mekansema');