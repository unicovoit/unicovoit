import csv
import json

#
# Convert the CSV file from the Topologie des parcs-relais du réseau STAR dataset (https://www.data.gouv.fr/en/datasets/topologie-des-parcs-relais-du-reseau-star-1/)
# to a sJSON file that can be used by Addok.
#

if __name__ == '__main__':
    with open('rennes_parcsrelais.csv', 'r', encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        with open('rennes_parcsrelais.sjson', 'w', encoding='utf-8') as jsonfile:
            for row in reader:
                tmp = dict(row)
                print(tmp)
                data = {'id': tmp['idparc'],
                        'type': 'Feature',
                        'name': 'Parc Relais ' + tmp['nom'],
                        'city': 'Rennes',
                        'postcode': 35000,
                        'street': tmp['adressevoie'],
                        'lat': (tmp['coordonnees'].split(','))[0],
                        'lon': (tmp['coordonnees'].split(','))[1]
                        }
                json.dump(data, jsonfile, ensure_ascii=False)
                jsonfile.write('\n')
