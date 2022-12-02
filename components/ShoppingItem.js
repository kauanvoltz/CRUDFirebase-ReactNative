import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react'

const ShoppingItem = (props) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <AntDesign name="checkcircleo" size={24} color="black" />
      </Pressable>

      <Text style={styles.title}>{props.title}</Text>

      <Pressable>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    backgroundColor:"lightgray",
    justifyContent:"space-between",
    padding:10,
    marginTop:25,
    alignItems:"center",
    width:"90%",
    alignSelf:"center",
    borderRadius:10,
  },
  title:{
    flex:1,
    marginLeft:10,
    fontSize:17,
    fontWeight:"500"
  }
})