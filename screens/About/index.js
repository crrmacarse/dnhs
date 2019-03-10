import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AdditionalHistory from '../../components/AdditionalHistory';

import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Icon,
  Font,
  WebBrowser
} from 'expo';

export default class AboutScreen extends React.Component {
  state = {
    readMore: false,
  }

  static navigationOptions = {
    title: 'About DNHS',
    headerStyle: {
      borderBottomColor: 'rgba(8,158,232,.3)',
      borderBottomWidth: 2,
    },
  };

  componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      'gentium-basic': require('../../assets/fonts/GenBasB.ttf'),
    });
  }

  _handleReadMoreHistory = () => {
    this.setState(prevState => ({
      readMore: !prevState.readMore
    }))
  }

  render() {
    const { readMore } = this.state;
    const { navigate } = this.props.navigation;

    return (

      <ScrollView style={styles.container}>

        <View style={styles.topContainer}>
          <Text style={{
              fontSize: 55,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#0275d8',
            }}>
              DNHS
            </Text>
          
              <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'grey',
          }}>
            More Information
            </Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.description}>
              Dumangas National High School is a Local Government High School located in Dumangas, Iloilo. It was conceived to further support 
              the locals of Dumangas who seek quality educational attainment.
          </Text>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>
            HISTORY
          </Text>
          <Text style={styles.historyDescription}>
            Of all the newly legislated high school created in the Division of Iloilo recently, Dumangas, National High School has a very interesting beginning. 
            It existed already before it was created. It is a result of series of consequences.
          </Text>
          <Text style={styles.historyDescription}>
            It must be recalled that last 1996, the Commission on Higher Education Issued CHED order no. 4 s. 1996 providing for the phase down of secondary 
            program to a maximum of 500 students for laboratory school of SUC offering a teacher education program. 
            Dumangas Polytechnic College is one intuition affected by the order.
          </Text>

          <TouchableOpacity
            onPress={this._handleReadMoreHistory}
            style={readMore && { display: 'none' }}
          >
            <Text style={{ marginTop: 5 }}>Read more</Text>
          </TouchableOpacity>

          {readMore && <AdditionalHistory />}

        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>
            MISSION AND VISION
          </Text>

          <View style={styles.mvContainer}>
            <Text style={styles.semiMVTitle}>
              MISSION
            </Text>
            <Text style={styles.historyDescription}>
              In the realization of the aims of education as manadates by the constitution, DNHS shall:
              Adhere to the ideals of the teaching profession; Be equipped in knowledge and skills capable
              of attaining the objectives of quality education; Capable of managing changes and demands of 
              a competitive society; God loving with strong sense of moral and spiritual values
            </Text>
          </View>

          <View style={styles.mvContainer}>
            <Text style={styles.semiMVTitle}>
              Vision
            </Text>
            <Text style={styles.historyDescription}>
              Dumangas National High School envision to produce graduates who are: Scientifically and 
              technologically literate; Economically productive citizens; Creative and innovative; and
              Above all; graduates who know moral right for wrong.
            </Text>
          </View>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  topContainer: {
    padding: 15,
    paddingTop: 25,
  },
  mainDivider: {
    backgroundColor: '#d3d3d3',
    paddingLeft: 1,
    marginLeft: 10,
    height: "100%",
  },
  mainTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
    padding: 10,
  },
  description: {
    marginTop: 5,
    letterSpacing: 1.2,
    fontSize: 15,
    padding: 10,
    color: '#343a40',
  },
  historyContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 5,
    padding: 15,
  },
  historyDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  historyTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
  },
  mvContainer: {
    margin: 10,
  },
  semiMVTitle: {
    fontWeight: 'bold',
    color: '#be6837',
  },
  websiteContainer: {
    margin: 30,
    marginBottom: 20,
    marginTop: 5,
    flexDirection: 'row-reverse',
    color: 'blue',
  },
  campusTourButtonContainer: {
    marginTop: 20,
  },
  settingsContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 1,
    padding: 15,
  },
  settingsContainerBTNContainer: {
    marginBottom: 30,
  }
});