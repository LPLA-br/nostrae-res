#!/bin/python

from http import client
from hashlib import sha256  # não recomendado porém simples.
from random import randrange
from os import system
import json

# CLIENTE DA APLICAÇÃO NOSTRAE RES
# Front-end em next.js descartado
# devido à complexidade maior
# no projeto: Tempo e projetos concorrentes
# mais importantes.

class Aleat:

    def __init__(self):
        pass

    def gerarStringHexadecimalPseudoAleatoria(self, tam=16):
        string=''
        while True:
            string = string + str(randrange(0,0xf))
            tam -= 1
            if tam < 0:
                break
        return bytes(string, 'utf-8')

class Disco:

    def __init__(self):
        self.arquivo = open('dadosLocais', 'r+', encoding="utf-8")
        self.dados = {}

    def sobrescreverArquivoLocal(self,dados):
        self.dados.write( json.dumps( dados ) )

    def carregarArquivoLocalMemoria(self):
        self.dados = json.loads( self.arquivo.read() )

    def get_dados(self):
        return self.dados


class ComponentesVisuais:

    def __init__(self):
        pass

    def barra():
        print("############################################################################")

    def inicio():
        print("#################################################################################")
        print("#                NOSTRAE_RES SOFTWARE - LPLA-br 2023                            #")
        print("#Software livre com absolutamente NENHUMA GARANTIA, na medida permitida por lei.#")
        print("#################################################################################\n\n")

    def anteAcesso():
        print("ACESSO AO SISTEMA\n")

    def menu():
        print("1.registrar novo bem institucional")
        print("2.gerar relatorio do status quo e visualiza-lo")
        print("3.editar registro errático")
        print("4.sair")



class Validador:

    def __init__(self):
        pass

    # True|False
    def objeto( listaNomeCampos ,dicionario ):
        for elemento in listaNomeCampos:
            if elemento in dicionario:
                continue
            else:
                return False
        return True

    def simNao( string, nomeCampo ):
        sim = ['sim','s']
        nao = ['não','nao','n']
        for elemento in sim:
            if elemento == string:
                return True
            else
                break
        for elemento in nao:
            if elemento == string:
                return False
            else
                break
        print(f'campo "{nomeCampo}" inválido')
        return False



class Aplicacao:

    CONTEUDO="Content-type: application/json"
    HASH_SIZE=32

    def __init__(self,servidor,porta):

        # injeção de dependências.
        self.cli = client.HTTPConnection(servidor,porta)
        self.aleat = Aleat()
        self.disco = Disco()
        self.visual = ComponentesVisuais()
        self.valido = Validador()

    # {hashsenha:string,sal:string} protected
    def gerarHash(self, senha):
        senha = bytes( senha, 'utf-8')
        sal = self.aleat.gerarStringHexadecimalPseudoAleatoria( HASH_SIZE )
        hashsenha = sha256( senha + sal ).hexdigest()
        return { "hashsenha": hashsenha, "sal", sal }

    # True|False
    def criarUsuarioUnico(self, ):
        requisicao = {}

        requisicao.update( { "username": input('username>') } ) 
        hashGerado = self.gerarHash( input('senha>') )
        requisicao.update( hashGerado )

        self.cli.request( 'POST', '/usuario', requisicao )
        res = self.cli.getresponse()

        return self.valido.objeto( ['username','hashsenha','sal'], res )

    # res|'' protected
    def obterSal(self):
        self.cli.request( 'GET', '/usuario' )
        res = self.cli.getresponse()

        if self.valido.objeto( ['sal'], res ):
            return res
        else:
            return ''

    # True | False
    def login(self):

        senha = bytes(input('senha> '), 'utf-8')
        sal = self.obterSal()

        requisicao = { "hashsenha": sha256( senha + sal ).hexdigest() }

        self.cli.request( 'POST', '/login', json.dumps( requisicao ) )
        res = self.cli.getresponse()
        
        if self.valido.objeto( ['statusCode','msg'], res ):
            return False
        elif self.valido.objeto( ['Authentication'], res ):
            self.disco.sobrescreverArquivoLocal( {"Authentication":res["Authentication"]} )
            self.disco.carregarArquivoLocalMemoria()
            return True
        return False
            

    # True | False
    def sair(self):
        self.disco.sobrescreverArquivoLocal( {"Authentication":"vazio"} )
        self.disco.carregarArquivoLocalMemoria()

        self.cli.request( 'DELETE', '/unlogin' )
        res = self.cli.getresponse()

        print(res)

    def novoRegistro(self):
        requisicao = {}
        requisicao.update({
            "descricao": input('descricao> '),
            "marca": input('marca> '),
            "categoria": input('categoria> '),
            "anoAquisicao": input('anoAquisicao> '),
            "localizacao": input('localizacao> '),
            "utilizavel": self.valido.simNao(input('utilizável(sim|não)> '), 'utilizável')
        })
        self.cli.request( 'POST', '/moveis', requisicao, {"Authorization":self.disco.get_dados()['Authentication'], } )
        res = self.cli.getresponse()

        print(res)

    # resposta:any
    def gerarRelatorio(self):
        self.cli.request( 'GET', '/moveis', {}, {"Authorization":self.disco.get_dados()['Authentication'], } )
        res = self.cli.getresponse()
        print(res)
        return res
        

    def editarRegistro(self):
        #selecionar campos para edição !
        requisicao = {}
        requisicao.update({
            "descricao": input('descricao> '),
            "marca": input('marca> '),
            "categoria": input('categoria> '),
            "anoAquisicao": input('anoAquisicao> '),
            "localizacao": input('localizacao> '),
            "utilizavel": self.valido.simNao(input('utilizável(sim|não)> '), 'utilizável')
        })
        self.cli.request( 'PATCH', '/moveis', requisicao, {"Authorization":self.disco.get_dados()['Authentication'], } )
        res = self.cli.getresponse()

        print(res)

    def interfaceTextual(self):

app = Aplicacao()
app.interfaceTextual()
