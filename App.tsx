import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewsList from './noticias';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Noticias Inegi Tlaxcala</Text>
            </View>
            <View style={styles.main}>
                <NewsList />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  header: {
      padding: 20,
      backgroundColor: '#cdf7d9',
  },
  headerText: {
      fontSize: 24,
      fontWeight: 'bold',
  },
  main: {
      flex: 1,
      padding: 20,
  },
});

export default App;