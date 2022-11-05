import csv
import json

#
# Convert the CSV file from the Aires de covoiturage de Nantes Métropole dataset (https://www.data.gouv.fr/en/datasets/aires-de-covoiturage-de-nantes-metropole-1/)
# to a sJSON file that can be used by Addok.
#

if __name__ == '__main__':
    with open('nantes_covoiturage.csv', 'r', encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        with open('nantes_covoiturage.sjson', 'w', encoding="utf-8") as jsonfile:
            for row in reader:
                tmp = dict(row)
                print(tmp)
                data = {'id': tmp['idobj'],
                        'type': 'Feature',
                        'name': tmp['nom_complet'],
                        'city': tmp['commune'],
                        'postcode': tmp['code_postal'],
                        'street': tmp['adresse'],
                        'lat': (tmp['location'].split(','))[0],
                        'lon': (tmp['location'].split(','))[1]
                        }
                json.dump(data, jsonfile, ensure_ascii=False)
                jsonfile.write('\n')
