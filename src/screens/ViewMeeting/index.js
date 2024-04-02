import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import Meeting from '../../components/Meeting';
import { useNavigation } from '@react-navigation/native';


// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant object that refers to database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create constant that contains the name of the lists table
const meetingTableName = 'meetings';
const hostMeetingsTableName = 'host_meetings';

const ViewMeetingsScreen = props => {

  const post = props.route.params.post;
  const navigation = useNavigation();

  const [meetings, setMeetings] = useState([]);
  const [totalMeetings, setTotalMeetings] = useState(0.0);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare variable to compute the total price
      let total = 0.0;
      // declare transaction that will execute SELECT
      schedulerDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT meetings.id, title, location, date FROM ${meetingTableName}, ${hostMeetingsTableName} WHERE meetings.id = meeting_id AND host_id = ${post.id}`,
          [],
          // callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected 
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            

            // if more than one row of data was selected
            if ( len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array
                let item = res.rows.item(i);

                results.push({
                  id: item.id,
                  title: item.title,
                  location: item.location,
                  date: item.date,
                });
                // compute total price
                total = len;
              }
              // assign results array to items state variable
              setMeetings(results);
              // assign computed total price to the total price state variable
              setTotalMeetings(total);
            } else {
              // if no rows of data were selected
              // assign empty array to items state variable
              setMeetings([]);
              // assign a value of 0 to the total price state variable
              setTotalMeetings(0.0);
            }
          },
          error => {
            console.log('Error getting meetings ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>To Host: {post.name}</Text>
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.totalMeeting}>TOTAL MEETINGS: {totalMeetings}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meetings}
        renderItem={({item}) => <Meeting post={item} />}
        ListFooterComponent={ListFooter}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

export default ViewMeetingsScreen;