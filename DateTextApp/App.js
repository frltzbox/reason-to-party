import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import eventData from './data.json';
import Firework from './Fireworks';

const { width } = Dimensions.get('window');
const scale = width / 375;

export default function App() {
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const formattedDate = selectedDate.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit'
    });
    const todayEvent = eventData.find(item => item.datum === formattedDate);
    setEvent(todayEvent);
  }, [selectedDate]);

  const onChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.date}>
            {selectedDate.toLocaleDateString('de-DE', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.container}>
        <Firework />
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
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  date: {
    fontSize: 14 * scale,
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
