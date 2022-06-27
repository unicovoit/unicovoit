# convert bnlc-.csv to json

import csv
import json

if __name__ == '__main__':
    with open('bnlc-.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        data = []
        for row in reader:
            tmp = dict(row)
            tmp['name'] = tmp['nom_lieu'] + ', ' + tmp['ad_lieu']
            tmp['lat'] = tmp.pop('Ylat')
            tmp['lon'] = tmp.pop('Xlong')
            data.append(tmp)

    with open('bnlc.sjson', 'w') as jsonfile:
        for row in data:
            json.dump(row, jsonfile)
            jsonfile.write('\n')
