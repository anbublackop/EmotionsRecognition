import os
import numpy as np
caffe_root = '/home/ubuntu/caffe/' 
import sys
from PIL import Image
sys.path.insert(0, caffe_root + 'python')
import caffe

DEMO_DIR = '.'

categories = [ 'Angry' , 'Disgust' , 'Fear' , 'Happy'  , 'Neutral' ,  'Sad' , 'Surprise']

cur_net_dir = 'VGG_S_rgb'

mean_filename=os.path.join('/home/ubuntu/l3test/VGG_S_rgb/mean.binaryproto')
proto_data = open(mean_filename, "rb").read()
a = caffe.io.caffe_pb2.BlobProto.FromString(proto_data)
mean  = caffe.io.blobproto_to_array(a)[0]

net_pretrained = os.path.join('/home/ubuntu/l3test/VGG_S_rgb/EmotiW_VGG_S.caffemodel')
net_model_file = os.path.join('/home/ubuntu/l3test/VGG_S_rgb/deploy.prototxt')
VGG_S_Net = caffe.Classifier(net_model_file, net_pretrained,
                       mean=mean,
                       channel_swap=(2,1,0),
                       raw_scale=255,
                       image_dims=(256, 256))

#file_name=raw_input('Enter image name:\n')
file_name=sys.argv[1]

input_image = caffe.io.load_image('/home/ubuntu/node/server/{}'.format(file_name))
prediction = VGG_S_Net.predict([input_image],oversample=False)
print 'predicted category is {0}'.format(categories[prediction.argmax()])
