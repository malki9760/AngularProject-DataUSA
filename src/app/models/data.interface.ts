export interface Idata {
    "ID Nation": string,
    "Nation": string,
    "ID Year": number,
    "Year": string,
    "Population": number,
    "Slug Nation": string,
   "Growth percentages":number

}

export interface ISource {
    "measures": [string],
    "annotations": {
        "source_name": string,
        "source_description": string,
        "dataset_name": string,
        "dataset_link": string,
        "table_id": string,
        "topic": string,
        "subtopic": string
    },
    "name": string,
    "substitutions": []

}

export interface Result {
    'data': Idata[],
    "source": ISource[]
}



