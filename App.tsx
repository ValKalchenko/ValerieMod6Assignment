/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';

const database = require('./src/components/Handlers/database.js');

const App: () => Node = () => {
  try {
    database.createHostsTable();
  } catch (error) {
    console.log('Failed to create hosts table ' + error);
  }
  try {
    database.createMeetingsTable();
  } catch (error) {
    console.log('Failed to create meetings table ' + error);
  }
  try {
    database.createHostMeetingsTable();
  } catch (error) {
    console.log('Failed to create host meetings table ' + error);
  }
  return <Router />;
};

export default App;