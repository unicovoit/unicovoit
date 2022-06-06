# convert bnlc-.csv to json

import csv
import json

if __name__ == '__main__':
    with open('bnlc-.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        data = []
        for row in reader:
            data.append(dict(row))

    with open('bnlc.json', 'w') as jsonfile:
        for row in data:
            json.dump(row, jsonfile)
            jsonfile.write('\n')
