#!/bin/python

import fileinput
import json
from sys import argv

# captura string vinda na stdin

for linha in fileinput.input():
    print( linha )

if argv[1] == 'extrairsal':
    primeiraLinha = fileinput.input()
    d = json.loads( primeiraLinha )
    return d['sal']


