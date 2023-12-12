import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

const ViewScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://dmapi.ipaypro.co/app_task/categories'
        );
        setCategories(response.data.result);
        console.log()
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Categories & Subcategories </Text>
      <FlatList
        data={categories.slice(5, 11).reverse()} // Display only the top 5 categories
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View style={styles.categoryContainer}>
              <View style={{ flexDirection: 'row' }}>
                {/* Conditionally render images based on the category index */}
                {item.category_name == "Fresh Vegetables" && (
                  <Image
                    source={{
                      uri:
                        'https://c.ndtvimg.com/v0mri5hg_green-leafy-vegetables-_625x300_24_July_18.jpg?im=Resize=(1230,900)',
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                )}
                {item.category_name == "Diet Food" && (
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxcqUGpeOeOcTw0V_Y_RzVQqjMfSw2Ld5HPTaCe6tbPf3_WUpM3jyHu2r041cWMcyAec&usqp=CAU',
                    }}
                    style={{ width: 40, height: 40,borderRadius:10 }}
                  />
                )}
               {item.category_name == "Healthy Food" && (
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP8KxwSTSCwyL9O7sbDjR73Lrqn-dH5M8qIxhQnAYnjDea4nDg',
                    }}
                    style={{ width: 40, height: 40,borderRadius:10 }}
                  />
                )}
               {item.category_name == "Fast Food Items" && (
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrH7A_QJ5e3idzvfackWMs64ihRwKMF2ddg&usqp=CAU',
                    }}
                    style={{ width: 40, height: 40,borderRadius:10 }}
                  />
                )}
              {item.category_name == "Juicy Fruits" && (
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWmptXIFWEVvJxhPzON8T8Viff_aU4qSwB0g&usqp=CAU',
                    }}
                    style={{ width: 40, height: 40,borderRadius:10 }}
                  />
                )}

                <Text style={styles.categoryName}>{item.category_name}</Text>
              </View>

              {selectedCategory?._id === item._id && (
                <>
                  <FlatList
                    data={item.sub_cateries}
                    keyExtractor={(subItem) => subItem._id}
                    renderItem={({ item: subItem }) => (
                      <View style={styles.subCategoryContainer}>
                        <Text style={styles.subCategoryName}>{subItem.name}</Text>
                      </View>
                    )}
                  />
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    color: 'black',
    textAlign:'center'
  },
  categoryContainer: {
    //marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
    padding: 30,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
  },
  subCategoryContainer: {
    marginLeft: 20,
    marginBottom: 5,
  },
  subCategoryName: {
    fontSize: 18,
    marginTop:2,
    color:'black',
    fontWeight:'800'

  },
});

export default ViewScreen;
