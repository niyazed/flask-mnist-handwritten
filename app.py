
from flask import Flask, render_template, request
from scipy.misc import imread, imresize, imsave
import numpy as np
import re
import sys
import base64
import os

# Path to saved model
sys.path.append(os.path.abspath("./model"))

from load import *

# Initialize flask app
app = Flask(__name__)

#Initialize some global variables
global model, graph
model, graph = init()

def convertImage(imgData1):
  imgstr = re.search(r'base64,(.*)', str(imgData1)).group(1)
  with open('output.png', 'wb') as output:
    output.write(base64.b64decode(imgstr))

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/predict/', methods=['GET', 'POST'])
def predict():
  #get the image
  imgData = request.get_data()
  #convert the image
  convertImage(imgData)
  # read the image into memory
  x = imread('output.png', mode='L')
  # make it the right size
  x = imresize(x, (28, 28))/255
  #save the image 
  imsave('final_image.jpg', x)
  x = x.reshape(1, 28, 28, 1)

  with graph.as_default():
    out = model.predict(x)
    response = np.argmax(out, axis=1)
    return str(response[0])

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)