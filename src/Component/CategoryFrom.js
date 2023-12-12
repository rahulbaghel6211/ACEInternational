// CategoryForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import FileUpload from './FileUpload';

const CategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [image, setImage] = useState(null);

  const handleSubcategoryChange = (text, index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = { name: text };
    setSubCategories(updatedSubCategories);
  };

  const handleAddSubcategory = () => {
    setSubCategories([...subCategories, { name: '' }]);
  };

  const handleRemoveSubcategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  const handleFileChange = (file) => {
    setImage(file);
  };

  const handleSubmit = () => {
    const category = {
      category_name: categoryName,
      sub_categories: subCategories,
      image,
    };
    onSubmit(category);
  };

  return (
    <View>
      <Text>Category Name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />

      <Text>Subcategories:</Text>
      <FlatList
        data={subCategories}
        renderItem={({ item, index }) => (
          <View>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5 }}
              value={item.name}
              onChangeText={(text) => handleSubcategoryChange(text, index)}
            />
            <Button title="Remove" onPress={() => handleRemoveSubcategory(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity onPress={handleAddSubcategory}>
        <Text>Add Subcategory</Text>
      </TouchableOpacity>

      <FileUpload onFileChange={handleFileChange} />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CategoryForm;
