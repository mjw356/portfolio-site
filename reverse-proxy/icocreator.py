import argparse
from PIL import Image
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))
parser = argparse.ArgumentParser("png to ico converter")
parser.add_argument("-i", "--input", help="input file", required=True)
parser.add_argument("-o", "--output", help="output file", required=True)
args = parser.parse_args()

try:
    img = Image.open(args.input)
    img.save(args.output)
    print('ico successfully saved at: ', dir_path + '/' + args.output)
except Exception as e:
    print(str(e))