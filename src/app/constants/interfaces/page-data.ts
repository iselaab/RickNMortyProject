export interface PAGE{

    "info": {
      "count": number,
      "pages": number,
      "next": string | null ,
      "prev": string | null
    },
    "results": [
      {
        "id": number,
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