export interface PAGE{

    "info": {
      "count": number,
      "totalPages": number,
      "pageSize": number,
      "page": number
    },
    "results": [
      {
        "id": number,
        "_id": "",
        "name": "",
        "status": "",
        "species": "",
        "type": "",
        "gender": "",
        "origin": {
          "name": "",
          "url": ""
        },
        "location": {
          "name": "",
          "url": ""
        },
        "image": "",
        "episode": [
          "",
          "",
          // ...
        ],
        "url": "",
        "created": ""
      },
      // ...
    ]
  
}