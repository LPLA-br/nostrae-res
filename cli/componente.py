#!/bin/python

import fileinput
import json
from sys import argv

primeiraLinha = fileinput.input()
d = json.loads( primeiraLinha )

if len(argv) > 3:
    print( d, 'debug ativo devido à 3 argumentos ./componente.py A B' )

if argv[1] == 'extrairsal':
    print( d['sal'] )
elif argv[1] == 'status':
    if d["status"] == 500:
        print( "Ação falhou" )
    elif d["status"] == 200:
        print( "feito!" )
    else:
        print( d["status"] )
elif argv[1] == 'extrairdados':
    # cada objeto em linha separada na saída
    # preserva-se sintaxe JSON.
    for objeto in d:
        print( objeto )


