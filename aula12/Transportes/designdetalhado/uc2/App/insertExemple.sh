docker exec -it mongo bash -c 'mongo mongodb://mongo:27017/viagensDB <<EOF
db.viagens.insertOne({"origem": "Campinas",
		        "destino": "Piraporinha",
			"horarioPartida": "12:34",
			"horarioChegada": "13:24",
			"dataPartida": "24/12",
			"dataChegada": "24/12",
			"poltronas" : [{"ocupado": false, "idPassagem": 123456},
				       {"ocupado": false, "idPassagem": 312458},
				       {"ocupado": true, "idPassagem": 312478}]})
EOF'
