#!/bin/bash

# Controle de patrimônio físico
# script opcional. cada curl necessita
# de tratamento json com python.

SERVIDOR='127.0.0.1:8080/'

tokenExiste()
{
	if [[ -f ./token ]]; then
		:
	else
		echo 'não logaste no sistema. Ação negada !';
	fi
}

#configuração inicial
criarUsuario()
{
	echo 'configurando o mono-usuário do nostrae res';

	#geração do hash. Verificação no servidor = hash+senha (concatenação simples)
	read -p 'nome do usuário> ' USUARIO ;
	read -p 'senha> ' SENHA ;

	SAL=cat /dev/urandom | head -n 1 | sha256sum | cut --delimiter=' ' --fields='1' ;
  HASHSENHA=echo "$SENHA$SAL" | sha256sum | cut -f 1 -d ' ';

	curl --request POST "$SERVIDOR/usuario" \
	-H 'Content-Type: application/json'
  -d "{\"username\":\"$USUARIO\",\"senha\":"$HASHSENHA",\"sal\":\"$SAL\"}" | ./componente.py status;

  clear;
}

iniciarSessao()
{
	read -p 'nome do usuário> ' USUARIO ;
	read -p 'senha> ' SENHA ;

	SAL=curl --request GET "$SERVIDOR/usuario" | ./componente.py extrairsal;
  HASHSENHA=echo "$SENHA$SAL" | sha256sum | cut -f 1 -d ' ';

	curl -v --request POST "$SERVIDOR/auth/login" \
	-H 'Content-Type: application/json' \
  -d "{\"hashsenha\":\"$HASHSENHA\"}" 2>&1 | grep Authentication > ./token ;
}

encerrarSessao()
{
	rm ./token 2> /dev/null;
}

#geração do "relatórios"
relatorioPorData()
{
	tokenExiste;
	read -p 'anoAquisicao> ' ANAQUISI;

	curl --request GET "$SERVIDOR/moveis/relatorio?anoAquisicao=$ANAQUISI" \
	-H 'Content-Type: application/json' \
	-H "Authorization: bearer $(cat ./token)" | ./componente.py extrairdados;
}

relatorioPorCategoria()
{
	tokenExiste;
	read -p 'categoria> ' CATEG;

	curl --request GET "$SERVIDOR/moveis/relatorio?categoria=$CATEG" \
	-H 'Content-Type: application/json' \
	-H "Authorization: bearer $(cat ./token)" | ./componente.py extrairdados;
}

relatorioPorLocalizacao()
{
	tokenExiste;
	read -p 'localizacao> ' LOC;

	curl --request GET "$SERVIDOR/moveis/relatorio?localizacao=$LOC" \
	-H 'Content-Type: application/json' \
	-H "Authorization: bearer $(cat ./token)" | ./componente.py extrairdados;
}

criarRegistro()
{
	tokenExiste;
	read -p 'descricao> ' DESC;
	read -p 'marca> ' MARCA;
	read -p 'categoria> ' CATEG;
	read -p 'anoAquisição> ' ANAQUISI;
	read -p 'localizacao> ' LOC;

	curl --request POST "$SERVIDOR/moveis" \
	-H 'Content-Type: application/json' \
	-H "Authorization: bearer $(cat ./token)" \
	-d "{\"descricao\":\"$DESC\",\"marca\":\"$MARCA\",\"categoria\":\"$CATEGORIA\",\"anoAquisicao\":$ANAQUISI,\"localizacao\":\"$LOC\"}" \
	| ./componente.py status;
}

# input não variável.
atualizarRegistro()
{
	tokenExiste;
	read -p 'descricao> ' DESC;
	read -p 'marca> ' MARCA;
	read -p 'categoria> ' CATEG;
	read -p 'anoAquisição> ' ANAQUISI;
	read -p 'localizacao> ' LOC;

	curl --request PATCH "$SERVIDOR/moveis" \
	-H 'Content-Type: application/json' \
	-H "Authorization: bearer $(cat ./token)" \
	-d "{\"descricao\":\"$DESC\",\"marca\":\"$MARCA\",\"categoria\":\"$CATEGORIA\",\"anoAquisicao\":$ANAQUISI,\"localizacao\":\"$LOC\"}" \
	| ./componente.py status;
}



