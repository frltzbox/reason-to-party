
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import eventData from './data.json';

const Stack = createStackNavigator();

function HomeScreen() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit'
    });
    const todayEvent = eventData.find(item => item.datum === formattedDate);
    setEvent(todayEvent);
  }, []);
  return (
      <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('de-DE', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {event ? (
            <>
              <Text style={styles.title}>{event.name}</Text>
              <Text style={styles.description}>{event.beschreibung}</Text>
            </>
          ) : (
            <Text style={styles.noEvent}>Kein spezielles Ereignis heute.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: new Date().toLocaleDateString('de-DE', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'left',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: '#FFFFFF',
  },
});
