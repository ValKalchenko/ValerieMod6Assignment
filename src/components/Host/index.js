import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const Host = props => {

    const post = props.post;

    const navigation = useNavigation();
    
    const onPress = () => {
        navigation.navigate('Existing Host', {post: post});
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 1}}>
                <Text style={styles.nameLabel}>Full Name</Text>
                <Text style={styles.emailLabel}>Email</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
                <Text style={styles.email} numberOfLines={1}>{post.email}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Host;