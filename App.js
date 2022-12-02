import { StyleSheet, Text, View, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ShoppingItem from './components/ShoppingItem';
import {  db, collection, addDoc, getDocs } from "./firebase/index";
import { useEffect, useState } from 'react';

export default function App() {

  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);


  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getShoppingList();
  };

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    setShoppingList(
      querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}))
    );
     
 
  }

  useEffect(() => {
    getShoppingList();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>

        <Text style={styles.noOfItems}>3</Text>

        <Pressable> 
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>
      {
        shoppingList.length > 0 ?(
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => <ShoppingItem
           title={item.title} 
            isChecked={item.isChecked}
            id={item.id}
            />}
          keyExtractor={item => item.id}

        />
        ):(
          <ActivityIndicator/>
        )
        
      }




      <TextInput placeholder='Enter shopping item' style={styles.input} value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  noOfItems: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",

  }

});
