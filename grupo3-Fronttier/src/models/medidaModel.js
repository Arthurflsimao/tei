var database = require("../database/config");

function buscarUltimasMedidas(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        percentualCpu, 
                        freqAtual, 
                        discoUsado,
                        memoriaUsada,
                        dataHora,
                        CONVERT(varchar, dataHora, 108) as horario
                        from dados 
                        where fkServidor = ${idServidor}
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                        dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor
                    from dados
                    where fkServidor = ${idServidor} 
                    order by idDados desc limit ${limite_linhas}`;
    }
    else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        percentualCpu,
                        freqAtual,
                        discoUsado,
                        memoriaUsada,
                        dataHora, 
                             CONVERT(varchar, dataHora, 108) as horario,
                             fkServidor
                        from dados 
                        where fkServidor = ${idServidor}
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select  
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkservidor 
                        from dados
                        where fkServidor = ${idServidor}
                    order by idDados desc limit 1`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 






// Criação teste freq



function buscarMedidas(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select  
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkservidor 
                        from dados
                        where fkServidor = ${idServidor}
                    order by idDados desc limit 1
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        freqAtual,
        percentualCpu,
        discoUsado,
        memoriaUsada
                    from dados  
                    order by idDados desc limit 1`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 



function ultimasMedidasDisco(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        discoTotal, 
                        discoUso, 
                        discoLivre,
                        porcentagem,
                        discoLido,
                        discoEscrito,
                        dataHora,
                        CONVERT(varchar, dataHora, 108) as horario
                        from Disco 
                        where fkServidor = ${idServidor}
                    order by idDisco desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        discoTotal,
        discoUso,
        discoLivre,
        porcentagem,
        discoLido,
        discoEscrito
                        dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor
                    from Disco
                    where fkServidor = ${idServidor} 
                    order by idDisco desc limit ${limite_linhas}`;
    }
    else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasDisco(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        discoTotal,
                        discoUso,
                        discoLivre,
                        porcentagem,
                        discoLido,
                        discoEscrito,
                        dataHora, 
                             CONVERT(varchar, dataHora, 108) as horario,
                             fkServidor
                        from Disco 
                        where fkServidor = ${idServidor}
                    order by idDisco desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select  
        discoTotal,
        discoUso,
        discoLivre,
        porcentagem,
        discoLido,
        discoEscrito,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor 
                        from Disco
                        where fkServidor = ${idServidor}
                    order by idDisco desc limit 1`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 




module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidas,
    ultimasMedidasDisco,
    buscarMedidasDisco
}
