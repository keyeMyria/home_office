import React, { Component } from 'react';
import { ListItem, Grid, Row, Col, Text } from 'native-base';
import { PropTypes } from 'mobx-react';

const emptyFunction = () => {};

export default class CalendarItem extends Component {
    static propTypes = {
        item: PropTypes.objectOrObservableObject,
        onPress: React.PropTypes.func.isRequired,
    };

    static defaultProps = {
        onPress: emptyFunction,
    };

    render() {
        const { item, onPress } = this.props;
        return (
          <ListItem onPress={() => onPress(item)}>
            <Grid>
              <Col size={10} style={[styles.gridColumn, { backgroundColor: item.colorType }]}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {item.type}
                  </Text>
                </Row>
              </Col>
              <Col size={30} style={styles.gridColumn}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {item.dayOfWeek} {item.date}
                  </Text>
                </Row>
              </Col>
              <Col size={60} style={styles.gridColumnAlignLeft}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {item.information}
                  </Text>
                </Row>
              </Col>
            </Grid>
          </ListItem>
        );
    }
}

// Styles
const styles = {
    gridColumn: {
        height: 55,
        alignItems: 'center',
    },
    gridColumnAlignLeft: {
        height: 55,
        alignItems: 'flex-start',
    },
    gridRowText: {
        fontSize: 14,
    },
};
