import csv
import json

#
# Convert the CSV file from the BNLC (https://www.data.gouv.fr/en/datasets/base-nationale-des-lieux-de-covoiturage/)
# to a sJSON file that can be used by Addok.
#

if __name__ == '__main__':
    with open('bnlc.csv', 'r', encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        with open('bnlc.sjson', 'w', encoding="utf-8") as jsonfile:
            for row in reader:
                tmp = dict(row)
                pre = '' if 'Aire de covoiturage' in tmp['nom_lieu'] else 'Aire de covoiturage '
                data = {
                    'id': tmp['id_lieu'],
                    'name': pre + tmp['nom_lieu'],
                    'address': tmp['ad_lieu'],
                    'lat': tmp['Ylat'],
                    'lon': tmp['Xlong'],
                    'type': tmp['type'],
                }
                json.dump(data, jsonfile, ensure_ascii=False)
                jsonfile.write('\n')
