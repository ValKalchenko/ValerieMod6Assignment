import React, { useState } from 'react';
import styles from './styles';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";


// create constant object that refers to database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create constant that contains the name of the lists table
const hostTableName = 'hosts';

const ExistingHostScreen = props => {

    const post = props.route.params.post;
    

    const [name, setName] = useState(post.name);
    const [email, setEmail] = useState(post.email);
    


    const navigation = useNavigation();


    const onHostUpdate = () => {
        if (!name){
            alert('Please enter your full name.');
            return;
        }
        if (!email){
            alert('Please enter your email address.');
            return;
        }
        

        schedulerDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${hostTableName} SET name = "${name}", email = "${email}" WHERE id = "${post.id}"`,
                [],
                () => {
                    console.log(`${name} updated successfully`);
                },
                error => {
                    console.log('Error on updating host ' + error.message);
                }
            );
        });

        alert(name + ' updated!');

    }

    const onHostDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this host?',
            // code for buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        schedulerDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${hostTableName} WHERE id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${name} deleted successfully`);
                                },
                                error => {
                                    console.log('Error on deleting host ' + error.message);
                                }
                            );
                        });
                        alert('Host Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    }

    const onAssignMeeting = () => {
        navigation.navigate('Assign Meeting', {post: post});
        
    }

    const onViewMeetings = () => {
        navigation.navigate('View Meetings', {post: post});
        
    }


  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                placeholder={'Enter Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.email}
                placeholder={'Enter Email'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.updateButton} onPress={onHostUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onHostDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={onAssignMeeting}>
                <Text style={styles.buttonText}>Assign Meeting</Text>
            </Pressable>
            <Pressable style={styles.viewButton} onPress={onViewMeetings}>
                <Text style={styles.buttonText}>View Meetings</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingHostScreen;