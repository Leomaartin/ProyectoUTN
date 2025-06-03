const conexion = require('../../database/conexion');

let homeController = {
    home: function(req, res) {
        conexion.query("SELECT * FROM destinos", (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render("home", { results: results });
            }
        });
    }
};

module.exports = homeController;


