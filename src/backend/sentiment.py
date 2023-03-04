from monkeylearn import MonkeyLearn
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000"
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

@app.get("/classify/{input}")
def getResult(input: str):
    ml = MonkeyLearn('7bf7ff2892f6b9eceba44aebe3a671919e9fbc6e')
    data = [input]
    model_id = 'cl_S7wQ7HoF'
    
    
    result = [{'text': 'I love trout!', 'external_id': None, 'error': False, 'classifications': [{'tag_name': 'Increase in population', 'tag_id': 124263161, 'confidence': 0.722}]}, 
    {'text': 'I love trout!', 'external_id': None, 'error': False, 'classifications': [{'tag_name': 'Decrease in population', 'tag_id': 124263161, 'confidence': 0.722}]},
    {'text': 'I love trout!', 'external_id': None, 'error': False, 'classifications': [{'tag_name': 'Neutral effect on population', 'tag_id': 124263161, 'confidence': 0.722}]}]
    result = result[random.randint(0, 2)]

    # - uncomment for actual purposes
    #result = ml.classifiers.classify(model_id, data)
    #result = result.body[0]


    tag_title = result["classifications"][0]["tag_name"]
    confidence = result["classifications"][0]["confidence"]

    results = {"tag": tag_title,
                "confidence" : confidence}
    
    return results
