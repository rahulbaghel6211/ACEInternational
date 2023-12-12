// FileUpload.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const FileUpload = ({ onFileChange }) => {
  const handleFileChange = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        onFileChange(response);
      }
    });
  };

  return (
    <View>
      <Text>Upload Image:</Text>
      <Button title="Choose Image" onPress={handleFileChange} />
    </View>
  );
};

export default FileUpload;
