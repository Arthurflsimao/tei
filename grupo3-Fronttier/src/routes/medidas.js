var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


// rota maquina 1 
router.get("/ultimas/:idServidor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idServidor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
}) 

// fim rota maquina 1 



// rotas Freq
router.get("/ultimasFreq/:idAquario", function (req, res) {
    medidaController.buscarMedidas(req, res);
});


router.get("/ultimasDisco/:idServidor", function (req, res) {
    medidaController.buscarMedidasDisco(req, res);
});

router.get("/tempo-real-Disco/:idServidor", function (req, res) {
    medidaController.ultimasMedidasDisco(req, res);
});





    
module.exports = router;