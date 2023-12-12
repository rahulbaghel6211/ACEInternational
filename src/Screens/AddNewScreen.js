// import React, { useState } from 'react';
// import { View, Text, Button, TouchableOpacity, TextInput, Image } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

// const AddNewScreen = () => {
//   const [categoryName, setCategoryName] = useState('');
//   const [subCategories, setSubCategories] = useState([{ name: '' }]);
//   const [pickedImage, setPickedImage] = useState(null);
//   const [imageurl, setimageurl] = useState(null);
//   const [defaultImageUrl, setDefaultImageUrl] = useState(
//     'https://cdn2.vectorstock.com/i/1000x1000/74/56/add-photo-icon-line-image-symbol-vector-21087456.jpg'
//   );

//   const handleSubcategoryChange = (text, index) => {
//     const updatedSubCategories = [...subCategories];
//     updatedSubCategories[index] = { name: text };
//     setSubCategories(updatedSubCategories);
//   };

//   const handleAddSubcategory = () => {
//     setSubCategories([...subCategories, { name: '' }]);
//   };

//   const handleRemoveSubcategory = (index) => {
//     if (subCategories.length > 1) {
//       const updatedSubCategories = subCategories.filter((_, i) => i !== index);
//       setSubCategories(updatedSubCategories);
//     }
//   };

//   const handleImagePick = async () => {
//     setPickedImage(null);

//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.images],
//       });

//       if (result) {
//         setimageurl(result[0].uri);
//         if (result[0].type === 'image/jpeg') {
//           const imagePath = await RNFS.readFile(result[0].uri, 'base64');
//           setPickedImage(`data:image/jpeg;base64,${imagePath}`);
//         } else {
//           console.log('Picked document:', result);
//         }
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled picking');
//       } else {
//         console.error('Error picking image:', err);
//       }

//       setPickedImage(defaultImageUrl);
//     }
//   };

//   const handleSubmit = async () => {
//     const category = {
//       category_name: categoryName,
//       sub_cateries: subCategories,
//       image: imageurl,
//     };

//     try {
//       const response = await fetch('https://dmapi.ipaypro.co/app_task/categories/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(category),
//       });

//       if (!response.ok) {
//         console.error('Error adding category:', response.status, await response.text());
//         throw new Error('Failed to add category');
//       }

//       console.log('Category added successfully');
//       setCategoryName('');
//       setSubCategories([]);

//     } catch (error) {
//       console.error('Error adding category:', error.message);
//     }
//   };

//   return (
//     <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
//       <Text style={{ fontWeight: '800', fontSize: 24, paddingVertical: 5, color: 'black', textAlign: 'center' }}>
//         Add Categories & Subcategories
//       </Text>
//       <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5, marginVertical: 10, width: '80%', alignSelf: 'center' }} />
//       <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Category Name</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 10,
//           width: '95%',
//           alignSelf: 'center',
//           borderRadius: 5,
//         }}
//         value={categoryName}
//         onChangeText={(text) => setCategoryName(text)}
//       />

//       <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Category Image</Text>

//       <View style={{ flexDirection: 'row' }}>
//         <View style={{ height: 120, width: '50%', borderWidth: 1, borderStyle: 'dashed', marginLeft: 10, borderRadius: 5 }}>
//           <Image source={{ uri: pickedImage || defaultImageUrl }} style={{ flex: 1, borderRadius: 5, width: '100%', height: '100%' }} resizeMode="cover" />
//         </View>

//         <TouchableOpacity onPress={handleImagePick} style={{ marginLeft: 5, height: 40, marginTop: 40 }}>
//           <View style={{ borderRadius: 5, flex: 1, flexDirection: 'row', backgroundColor: '#00A1E4' }}>
//             <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>Pick Image</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Create sub-categories</Text>
//       {subCategories.map((item, index) => (
//         <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
//           <TextInput
//             style={{ width: '75%', height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 10, borderRadius: 5 }}
//             value={item.name}
//             onChangeText={(text) => handleSubcategoryChange(text, index)}
//           />
//           {index === subCategories.length - 1 ? (
//             <TouchableOpacity onPress={handleAddSubcategory} style={{ marginLeft: 5 }}>
//               <View style={{ borderRadius: 5, flex: 1, flexDirection: 'row', backgroundColor: '#00A1E4' }}>
//                 <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>+</Text>
//               </View>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={() => handleRemoveSubcategory(index)}>
//               <View style={{ borderRadius: 5, marginLeft: 5, flex: 1, flexDirection: 'row' }}>
//                 <Text style={{ color: 'white', backgroundColor: '#939393', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>-</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         </View>
//       ))}

//       <Button title="Add" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default AddNewScreen;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addCategory, viewCategory } from '../Redux/action/Action';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker
import RNFS from 'react-native-fs'; // Import RNFS for file system operations

const AddNewScreen = () => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategoryName, setNewSubCategoryName] = useState(['']); // Initialize with an array for subcategories
  const [pickedImage, setPickedImage] = useState(null);
  const [imageurl, setimageurl] = useState(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState(
    'https://cdn2.vectorstock.com/i/1000x1000/74/56/add-photo-icon-line-image-symbol-vector-21087456.jpg'
  );

  const handleAddCategory = async () => {
    const apiUrl = 'https://dmapi.ipaypro.co/app_task/categories/add';

    const newCategory = {
      category_name: newCategoryName,
      sub_categories: newSubCategoryName,
      image: imageurl,
    };

    console.log('Adding category...', newCategory);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

     // console.log('Response status:', response.status);

      if (response) {
        const addedCategory = await response.json();
        console.log('Category added successfully:', addedCategory);
        dispatch(addCategory(addedCategory));
      } else {
        console.error('Failed to add category. Status:', response.status);

        // Add specific error handling for parsing response as JSON
        try {
          const errorResponse = await response.json();
          console.error('Error response:', errorResponse);
        } catch (parseError) {
          console.error('Error parsing response as JSON:', parseError);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAddSubcategory = () => {
    setNewSubCategoryName([...newSubCategoryName, '']); // Add an empty string for a new subcategory
  };

  const handleRemoveSubcategory = (index) => {
    if (newSubCategoryName.length > 1) {
      const updatedSubCategories = [...newSubCategoryName];
      updatedSubCategories.splice(index, 1);
      setNewSubCategoryName(updatedSubCategories);
    }
  };

  const handleImagePick = async () => {
    setPickedImage(null);

    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result) {
        setimageurl(result[0].uri);
        if (result[0].type === 'image/jpeg') {
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

      setPickedImage(defaultImageUrl);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: '800', fontSize: 24, paddingVertical: 5, color: 'black', textAlign: 'center' }}>
        Add Categories & Subcategories
      </Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5, marginVertical: 10, width: '80%', alignSelf: 'center' }} />

      {/* Input for Category Name */}
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
        value={newCategoryName}
        onChangeText={(text) => setNewCategoryName(text)}
      />

      {/* Display and Pick Image */}
      <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Category Image</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: 120, width: '50%', borderWidth: 1, borderStyle: 'dashed', marginLeft: 10, borderRadius: 5 }}>
          <Image source={{ uri: pickedImage || defaultImageUrl }} style={{ flex: 1, borderRadius: 5, width: '100%', height: '100%' }} resizeMode="cover" />
        </View>

        {/* Pick Image Button */}
        <TouchableOpacity onPress={handleImagePick} style={{ marginLeft: 5, height: 40, marginTop: 40 }}>
          <View style={{ borderRadius: 5, flex: 1, flexDirection: 'row', backgroundColor: '#00A1E4' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>Pick Image</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Input for Subcategories */}
      <Text style={{ fontWeight: '800', fontSize: 16, paddingVertical: 10, color: 'black', marginLeft: 10 }}>Create sub-categories</Text>
      {newSubCategoryName.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
          {/* Input for each Subcategory */}
          <TextInput
            style={{ width: '75%', height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 10, borderRadius: 5 }}
            value={item}
            onChangeText={(text) => {
              const updatedSubCategories = [...newSubCategoryName];
              updatedSubCategories[index] = text;
              setNewSubCategoryName(updatedSubCategories);
            }}
          />

          {/* Add or Remove Subcategory Button */}
          {index === newSubCategoryName.length - 1 ? (
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
      ))}

      {/* Add Category Button */}
      <Button title="Add" onPress={handleAddCategory} />
    </View>
  );
};

export default AddNewScreen;
