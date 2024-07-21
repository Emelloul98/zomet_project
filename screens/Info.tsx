import Header from "@/components/Header";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

type ScreenProps = {
  navigation: any;
};

export default function Info(props: ScreenProps) {
  const textData = [
    "שלום טכנאי יקר!\nברוך הבא לאפליקציית שעון אסטרונומי\nלפניך דף האפליקציה במצב לא מחובר לשעון:",
    "בשלב זה מוצגת לפניך אופציית עריכת טבלה בלבד\n תוכל להוסיף ולהסיר שורות מהטבלה באמצעות הכפתורים:",
    "תוכל לשמור טבלה שערכת במכשיר הפרטי שלך בעזרת אייקון שמור:",
    "ולהביא את הקובץ חזרה לטבלה בעזרת אייקון התיקיה:",
    "לחץ על כפתור התחבר לשעון,לאחר הלחיצה תועבר לדף ההתחברות במכשירך שם תוכל לבחור שעון,להזין סיסמה ולחזור לאפליקציה",
    "כעת יוצג בפניך דף האונליין, גם בו תוכל לערוך טבלה אך הפעם תצטרך לבחור ראשית על איזה מפסק ברצונך לעבוד:",
    "תוכל גם לצרוב את ערכי הטבלה לשעון בעזרת האייקון:",
    "אם השעון כבר מכיל טבלת תזמונים תוכל להביא אותה מהשעון אליו התחברת על ידי האייקון:",
    "אם ברצונך לעבור ממצב שליטה בשעון על ידי טבלה לשליטה ידנית תוכל ללחוץ על אייקון האצבע:",
    "לאחר הלחיצה תוכל להדליק את השעון בעזרת לחיצה על הנורה:",
    "או אם הנורה כבר דלוקה תוכל לכבות אותה באותה צורה:",
    "תוכל תמיד לחזור לדף עריכת הטבלה כאשר תרצה בכך על ידי לחיצה על אייקון הטבלה:",
  ];

  // List of objects with text and image references
  const infoData = [
    { id: 1, text: textData[0], image: require("../assets/images/info1.jpg") },
    { id: 2, text: textData[1], image: require("../assets/images/info2.jpg") },
    { id: 3, text: textData[2], image: require("../assets/images/info3.jpg") },
    { id: 4, text: textData[3], image: require("../assets/images/info4.jpg") },
    { id: 5, text: textData[4], image: require("../assets/images/info5.jpg") },
    { id: 6, text: textData[5], image: require("../assets/images/info6.jpg") },
    { id: 7, text: textData[6], image: require("../assets/images/info7.jpg") },
    { id: 8, text: textData[7], image: require("../assets/images/info8.jpg") },
    { id: 9, text: textData[8], image: require("../assets/images/info9.jpg") },
    {
      id: 10,
      text: textData[9],
      image: require("../assets/images/info10.jpg"),
    },
    {
      id: 11,
      text: textData[10],
      image: require("../assets/images/info11.jpg"),
    },
    {
      id: 12,
      text: textData[11],
      image: require("../assets/images/info12.jpg"),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header navigation={props.navigation} backIcon={true} isConnect={false} />
      {infoData.map((item) => (
        <View key={item.id} style={styles.infoItem}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.textView}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  infoItem: {
    flexDirection: "row-reverse",
    width: "90%",
    height: 265,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: "40%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 10,
  },
  textView: {
    width: "60%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "right",
  },
});
