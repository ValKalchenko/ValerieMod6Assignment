import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Host from '../../components/Host';
// import oponDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create constants for tables in database
const hostTableName = 'hosts';

const HostsScreen = props => {

  const navigation = useNavigation();

  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      let results = [];
      schedulerDB.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${hostTableName}`,
          [],
          (_, res) => {
            let len = res.rows.length;
            console.log('Length of hosts ' + len);
            if (len > 0){
              for (let i = 0; i < len; i++){
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  email: item.email,
                });
              }
              setHosts(results);
            } else {
              setHosts([]);
            }
          },
          error => {
            console.log('Error getting hosts ' + error.message);
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
          data={hosts}
          renderItem={({item}) => <Host post={item}/>}
          keyExtractor={item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Host')}>
                <Text style={styles.buttonText}>Add Host</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default HostsScreen;