import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Meeting from '../../components/Meeting';
// import oponDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create constants for tables in database
const meetingTableName = 'meetings';

const MeetingsScreen = props => {

  const navigation = useNavigation();

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      let results = [];
      schedulerDB.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${meetingTableName}`,
          [],
          (_, res) => {
            let len = res.rows.length;
            console.log('Length of meetings ' + len);
            if (len > 0){
              for (let i = 0; i < len; i++){
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  title: item.title,
                  location: item.location,
                  date: item.date,
                });
              }
              setMeetings(results);
            } else {
              setMeetings([]);
            }
          },
          error => {
            console.log('Error getting meetings ' + error.message);
          }
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={meetings}
          renderItem={({item}) => <Meeting post={item}/>}
          keyExtractor={item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Meeting')}>
                <Text style={styles.buttonText}>Add Meeting</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default MeetingsScreen;