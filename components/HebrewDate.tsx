import React, { useState, useEffect } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import moment from 'moment';
import 'moment/min/moment-with-locales'; // Import moment with locales

interface HebrewDateProps {
  textStyle: StyleProp<TextStyle>; // Import StyleProp and TextStyle from react-native
}
const HebrewDate: React.FC<HebrewDateProps> = ({ textStyle }) => {
  const [hebrewDate, setHebrewDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    moment.locale('he'); // Set locale to Hebrew

    const intervalId = setInterval(() => {
      const now = moment();
      const formattedDate = now.format('DD/MM/YYYY'); // Format date as DD/MM/YYYY

      setHebrewDate(formattedDate);
      setCurrentTime(now.format('HH:mm:ss')); // Keep time format HH:mm:ss
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
  <Text style={[textStyle]}>
    <Text>תאריך: {hebrewDate}  </Text>
    <Text>שעה: {currentTime}</Text>  
  </Text>
  );
};

export default HebrewDate;
