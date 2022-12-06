import { StyleSheet, Text, View, Pressable, TextInput, FlatList, ActivityIndicator, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ShoppingItem from './components/ShoppingItem';
import { db, collection, addDoc, getDocs, deleteDoc, doc, where,query } from "./firebase/index";
import { useEffect, useState } from 'react';

export default function App() {

  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);


  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: true
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error(c);
    }
    getShoppingList();
  };

  const getShoppingList = async () => {
    const q = query(collection(db, "shopping"), where("isChecked", "==", true));
    const querySnapshot = await getDocs(q);
    setShoppingList(
      querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    );
    getShoppingList();
  }
  
  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));

    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingList();

  }

  useEffect(() => {
    getShoppingList();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>

        <Text style={styles.noOfItems}>{shoppingList.length}</Text>

        <Pressable onPress={deleteShoppingList}>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>
      {
        shoppingList.length > 0 ? (
          <FlatList
            style={{ marginBottom: 7 }}
            data={shoppingList}
            renderItem={({ item }) => <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getShoppingList={getShoppingList}
            />}
            keyExtractor={item => item.id}

          />
        ) : (
          <ActivityIndicator />
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
    flex: 1,
    padding: 6
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
