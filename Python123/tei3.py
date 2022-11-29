import psutil
import time
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
# import platform

# def get_size(bytes, suffix="B"):
#     """
#     Scale bytes to its proper format
#     e.g:
#         1253656 => '1.20MB'
#         1253656678 => '1.17GB'
#     """
#     factor = 1024
#     for unit in ["", "K", "M", "G", "T", "P"]:
#         if bytes < factor:
#             return f"{bytes:.2f}{unit}{suffix}"
#         bytes /= factor

#         print("="*40, "System Information", "="*40)
# uname = platform.uname()


try:
        db_connection = mysql.connector.connect(
            host='localhost',
            user='aluno',
            password='sptech',
            database='fronttier2'
        )
        print("Conexão com o Banco de Dados MySQL efetuada com sucesso!")
        # LeituraLocal(conn)
    # Validações de Erro:
except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Algo está errado com o Usuário do Banco ou a Senha.")
            time.sleep(10)
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("O banco de dados direcionado não existe.")
            time.sleep(10)
        else:
            print(err)
            time.sleep(10)

# Inserir leituras Banco local
# def LeituraLocal(conn):
while True:
    
    discoTotal = round((psutil.disk_usage('/')[0] / 10**12), 2)
    discoUsado = round((psutil.disk_usage('/')[1] / 10**12), 2)
    discoLivre = round((psutil.disk_usage('/')[2] / 10**12), 2)
    porcentagem = psutil.disk_usage('/')[3]
    discoLido = round(psutil.net_io_counters()[1] / 10**6, 2)
    discoEscrito = round(psutil.net_io_counters()[0] / 10**6, 2)

    datahora = datetime.now()
    # formato = datahora.strftime("%d/%m/%Y %H:%M:%S")

    crsr = db_connection.cursor()
    
    sql = "INSERT INTO Disco (dataHora, discoTotal, discoUso, discoLivre, porcentagem, discoLido, discoEscrito) VALUES (%s,%s,%s,%s,%s,%s,%s)"
    values = [datahora, discoTotal, discoUsado, discoLivre, porcentagem, discoLido, discoEscrito]
    crsr.execute(sql, values)

    print("Inserindo leitura no banco de dados local!")
    
    db_connection.commit()

    time.sleep(3.0)
    
# ConectarBancoLocal()