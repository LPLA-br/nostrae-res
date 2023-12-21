#!/bin/bash

# Controle de patrimônio físico
# script opcional.

SERVIDOR='127.0.0.1:8080/'

#configuração inicial
criarUsuario()
{
	echo 'configurando o mono usuário do nostrae res';

	#geração do hash. Verificação no servidor = hash+senha (concatenação simples)
	read -p 'nome do usuário> ' USUARIO ;
	read -p 'senha> ' USUARIO ;
	HASH=cat /dev/urandom | head -n 1 | sha256sum | cut --delimiter=' ' --fields='1' ;

	curl --request GET "$SERVIDOR/usuario" \
	-H 'Content-Type: application/json' | tee ./sal

}

autenticar()
{
	#get sal.
	curl --request GET "$SERVIDOR/usuario" \
	-H 'Content-Type: application/json' | tee ./sal

	#
	curl --request POST "$SERVIDOR/usuario" \
	-H 'Content-Type: application/json' \
	-d '{ "":"" }' | tee ./token
}

#geração do relatório
relatorioPorData()
{
	#integrar script python
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



