sed -E 's/\}\,\{/\n/g' | sed -E 's/\]}/\n/g' | sed -E 's/\[\{/\n/g' | sed -E '1d' | sed -E 's/,/\t/g' | tr ' ' '_' | column -t ;
echo "RELATÓRIO NOSTRAE RES GERADO EM $(date +'%d/%m/%Y')"
