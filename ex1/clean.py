import json

f = open('cidades.json', encoding="utf8")
cidades = json.load(f)

#print(mapa)

for elem in cidades:
    elem["_id"] = elem["id"]
    elem.pop("id")

out = open('cidades_limpo.json','w',encoding='utf8')
out.write(json.dumps(cidades, indent = 4,ensure_ascii=False))

