import React from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const AdditionalHistory = () =>
  (
    <View>
      <Text style={styles.historyDescription}>
        On June 2001, Dumangas Polytechnic College in consonance with CHED order
        no. 4 s. 1996 gradually implemented such order starting from the first
        year. The parent was confused where to enroll their children. For those who can afford, it is not a problem. Dumangas is barely 24 kilometers to the city, Distura made a representation with School Division Superintendent Dr. Raymundo A. Lapating urging the latter for the establishment of a high school in the población. It was already in the third week of June when it was finally announced that there shall be a high school and it shall be named Dumangas National High School, separate from the college under its
        new mother school, Iloilo State College of Fisheries.
    </Text>

      <Text style={styles.historyDescription}>
        On June 2001, Dumangas Polytechnic College in consonance with CHED order no. 4
        s. 1996 gradually implemented such order starting from the first year.
        The parent was confused where to enroll their children. For those who
        can afford, it is not a problem. Dumangas is barely 24 kilometers to
        the city, Distura made a representation with School Division
        Superintendent Dr. Raymundo A. Lapating urging the latter for the
        establishment of a high school in the población. It was already in
        the third week of June when it was finally announced that there shall
        be a high school and it shall be named Dumangas National High School,
        separate from the college under its new mother school, Iloilo State College of Fisheries.
    </Text>

      <Text style={styles.historyDescription}>
        On August 2001, Congress enacted R.A. 8886; an act renaming Dumangas National High School as an
        independent entity exclusive for secondary education. This is how Dumangas National High School was
        reborn. The local school board aware of the situation deployed 9 teachers paid the local government.
    </Text>

    </View>
  )

const styles = StyleSheet.create({
  historyDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
});

export default AdditionalHistory;