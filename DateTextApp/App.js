import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import eventData from './data.json';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function App() {
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    marginTop: 30,
    marginBottom:0,
    alignSelf:"flex-start",
    borderRadius: 10,
    backgroundColor: '#1E1E1E', // Optional: Different shade for header
  },
  date: {
    fontSize: 10 * scale,
    fontWeight: 'italic',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22 * scale,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10 * scale,
    textAlign: 'center',
  },
  description: {
    fontSize: 16 * scale,
    color: '#CCCCCC',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10 * scale,
  },
  noEvent: {
    fontSize: 16 * scale,
    color: '#300',
    fontStyle: 'italic',
    marginHorizontal: 20,
    textAlign: 'center',
  },
});
