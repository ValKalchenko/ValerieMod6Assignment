import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'blue',
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bottomContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 30,
  },
  topContainer: {
    top: 10,
    padding: 15,
    width: '100%',
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  date: {
    fontSize: 16,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey',
  },
  dateButton: {
    backgroundColor: 'blue',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 30,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'blue',
    marginVertical: 10,
  },
  dropdownBtnTxtStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownDropdownStyle: {
    borderRadius: 5,
  },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdownRowTxtStyle: {
    color: '#000',
    textAlign: 'left',
    fontSize: 16,
  }
});

export default styles;