import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';

const database = require('../../components/Handlers/database.js');

const AddMeetingScreen = props => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const locationNames = ['SJ 48', 'SJ 49', 'SJ 249', 'SJ 250', 'MH 215'];

    function showDatePicker() {
        setDatePicker(true);
    }

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        setSelectedDate(value.toLocaleDateString());
    }

    const onMeetingAdd = () => {
        if (!title){
            alert('Please enter a meeting title.');
            return;
        }
        if (!location){
            alert('Please select a meeting location.');
            return;
        }
        if (!selectedDate){
            alert('Please select a meeting date.');
            return;
        }
        
        try {
            database.addMeeting(title, location, date.toLocaleDateString());
        } catch (error) {
            console.log('Error adding meeting ' + error);
        }

        alert(title + ' Added.');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={title}
                onChangeText={value => setTitle(value)}
                style={styles.title}
                placeholder={'Enter Meeting Title'}
                placeholderTextColor={'grey'}
            />
            <SelectDropdown
                data={locationNames}
                defaultValue={location}
                defaultButtonText={'Select Meeting Location'}
                onSelect={(selectedItem, index) => {
                    setLocation(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
            />
            {datePicker && (
                <DateTimePickerAndroid
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                    minimumDate={new Date(Date.now())}
                />
            )}
            {!datePicker && (
                <View>
                    <Pressable 
                        onPress={showDatePicker} 
                        style={styles.dateButton}>
                            <Text style={styles.dateButtonText}>Select Meeting Date</Text>
                    </Pressable>
                </View>
            )}
            <TextInput 
                value={selectedDate}
                style={styles.date}
                placeholder={'Selected Meeting Date'}
                editable={false}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onMeetingAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddMeetingScreen;