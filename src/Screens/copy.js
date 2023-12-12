import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const AddNewScreen = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState([{ name: '' }]);
  const [pickedImage, setPickedImage] = useState(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState(
    'https://cdn2.vectorstock.com/i/1000x1000/74/56/add-photo-icon-line-image-symbol-vector-21087456.jpg'
  );

  const handleSubcategoryChange = (text, index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = { name: text };
    setSubCategories(updatedSubCategories);
  };

  const handleAddSubcategory = () => {
    setSubCategories([...subCategories, { name: '' }]);
  };

  const handleRemoveSubcategory = (index) => {
    if (subCategories.length > 1) {
      const updatedSubCategories = subCategories.filter((_, i) => i !== index);
      setSubCategories(updatedSubCategories);
    }
  };

  const handleImagePick = async () => {
    setPickedImage(null); // Reset picked image to null before attempting to pick a new image

    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result) {
        console.log("-----------hello-------",result.type)
        if (result[0].type === 'image/jpeg') {
          console.log("-----------insicde-------")
          const imagePath = await RNFS.readFile(result[0].uri, 'base64');
          setPickedImage(`data:image/jpeg;base64,${imagePath}`);
        } else {
          console.log('Picked document:', result);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled picking');
      } else {
        console.error('Error picking image:', err);
      }

      setPickedImage(defaultImageUrl); // Set default image only when there's an error or cancellation
    }
  };

  const handleSubmit = async () => {
    const category = {
      category_name: categoryName,
      sub_cateries: subCategories,
      image: "asdfghjkl",
    };

    try {
      const response = await fetch('https://dmapi.ipaypro.co/app_task/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add additional headers if required by the API
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        console.error('Error adding category:', response.status, await response.text());
        throw new Error('Failed to add category');
      }

      // Handle the success response as needed
      console.log('Category added successfully');

      // Reset form fields or navigate to another screen
      setCategoryName('');
      setSubCategories([]);
      setImage(null);

    } catch (error) {
      // Handle other errors
      console.error('Error adding category:', error.message);
    }
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: '800', fontSize: 24, paddingVertical: 10, color: 'black', textAlign: 'center' }}>
        Add Categories & Subcategories
      </Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5, marginVertical: 10, width: '80%', alignSelf: 'center' }} />
      <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Category Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: '95%',
          alignSelf: 'center',
          borderRadius: 5,
        }}
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />

      <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Category Image</Text>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: 120, width: '50%', borderWidth: 1, borderStyle: 'dashed', marginLeft: 10, borderRadius: 5 }}>
          <Image source={{ uri: pickedImage || defaultImageUrl }} style={{ flex: 1, borderRadius: 5, width: '100%', height: '100%' }} resizeMode="cover" />
        </View>

        <TouchableOpacity onPress={handleImagePick} style={{ marginLeft: 5, height: 40, marginTop: 40 }}>
          <View style={{ borderRadius: 5, flex: 1, flexDirection: 'row', backgroundColor: '#00A1E4' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>Pick Image</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Create sub-categories</Text>
      <FlatList
        data={subCategories}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <TextInput
              style={{ width: '75%', height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 10, borderRadius: 5 }}
              value={item.name}
              onChangeText={(text) => handleSubcategoryChange(text, index)}
            />
            {index === subCategories.length - 1 ? (
              <TouchableOpacity onPress={handleAddSubcategory} style={{ marginLeft: 5 }}>
                <View style={{ borderRadius: 5, flex: 1, flexDirection: 'row', backgroundColor: '#00A1E4' }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>+</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleRemoveSubcategory(index)}>
                <View style={{ borderRadius: 5, marginLeft: 5, flex: 1, flexDirection: 'row' }}>
                  <Text style={{ color: 'white', backgroundColor: '#939393', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>-</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
};

export default AddNewScreen;
