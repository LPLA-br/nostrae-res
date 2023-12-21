#!/bin/bash

# Controle de patrimônio físico
# script opcional. cada curl necessita
# de tratamento json com python.

SERVIDOR='127.0.0.1:8080/'

#configuração inicial
criarUsuario()
{
	echo 'configurando o mono usuário do nostrae res';

	#geração do hash. Verificação no servidor = hash+senha (concatenação simples)
	read -p 'nome do usuário> ' USUARIO ;
	read -p 'senha> ' SENHA ;

	SAL=cat /dev/urandom | head -n 1 | sha256sum | cut --delimiter=' ' --fields='1' ;
  HASHSENHA=echo "$SENHA$SAL" | sha256sum | cut -f 1 -d ' ';

	curl --request POST "$SERVIDOR/usuario" \
	-H 'Content-Type: application/json'
  -d "{\"username\":\"$USUARIO\",\"senha\":"$HASHSENHA",\"sal\":\"$SAL\"}" ;

  clear;
}

autenticar()
{
	read -p 'nome do usuário> ' USUARIO ;
	read -p 'senha> ' SENHA ;

	SAL=curl --request GET "$SERVIDOR/usuario" | ./componente.py extrairsal;
  HASHSENHA=echo "$SENHA$SAL" | sha256sum | cut -f 1 -d ' ';

	curl -v --request POST "$SERVIDOR/auth/login" \
	-H 'Content-Type: application/json' \
  -d "{\"hashsenha\":\"$HASHSENHA\"}" 2>&1 | grep Authentication > ./token ;

}

#geração do relatório
relatorioPorData()
{
}

relatorioPorTipoDePatrimonio()
{
}

criarRegistro()
{

}

#input variável
atualizarRegistro()
{

}



