import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import icons from "../../../Bookworms/constants/icons.js";
import { supabase } from '../../lib/supabase.js';
import Shelf from './Shelf.jsx';

const ShelvesView = ({userID}) => {

  const [shelves, setShelves] = useState([])

  async function getShelves(userID) {
    
    const { data, shelvesError } = await supabase
      .from('shelves')
      .select('name, id')
      .eq('user_id', userID);

    if (shelvesError) {
      Alert.alert(shelvesError);
      return;
    }

    setShelves(data)
  }

  useEffect(() => {
    getShelves(userID);
  }, [userID]);

  return (
    // flexShrink: 1 in android causes scrolling to not work so the 2nd shelf cuts off at the bottom
    <ScrollView contentContainerStyle={{ flexGrow: 1, flexShrink: 1 }}>
      <TouchableOpacity 
      className="justify-center items-center pt-5 mb-5"
      activeOpacity={0.4}>
          <Image
              source={icons.plus}
              className="w-8 h-8"
              resizeMode="contain"
          />
      </TouchableOpacity>
      
      {shelves.map((shelf, index) => (
        <Shelf
          key={index}
          title={shelf.name}
          shelfID={shelf.id}
        />
      ))}

    </ScrollView>
  )
}

export default ShelvesView

const styles = StyleSheet.create({})