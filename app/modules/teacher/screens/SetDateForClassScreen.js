import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { DatePickerField } from '../../../components/fields';

@observer
class ExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: props.visible };
    }

    componentWillReceiveProps(nextProps) {
        const allSchoolYearsChanged =
            nextProps.formValues.allSchoolYears !== '-' &&
            nextProps.formValues.allSchoolYears !== this.props.formValues.allSchoolYears;

        let otherSchoolYearsChanged = false;

        for (let i = 0; i < store.schoolYearSelected.classes.length; i++) {
            const schoolYear = store.schoolYearSelected.classes[i].key;

            const currVal = this.props.formValues[schoolYear];
            const nextVal = nextProps.formValues[schoolYear];

            if (
                nextVal !== '-' &&
                nextVal !== currVal &&
                nextVal !== this.props.formValues.allSchoolYears &&
                nextVal !== nextProps.formValues.allSchoolYears
            ) {
                otherSchoolYearsChanged = true;
                break;
            }
        }

        this.setState({ visible: nextProps.visible });

        const { dispatch } = this.props;

        if (allSchoolYearsChanged) {
            store.schoolYearSelected.classes.map(schoolYear =>
                dispatch(
                    change(
                        'formExerciseScreen',
                        schoolYear.key,
                        nextProps.formValues.allSchoolYears || '-',
                    ),
                ),
            );
        }

        if (otherSchoolYearsChanged) {
            dispatch(change('formExerciseScreen', 'allSchoolYears', '-'));
        }
    }

    save = () => {
        Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
            { text: 'OK', onPress: this.props.hideModal },
        ]);
    };

    render() {
        return (
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.visible}
            onRequestClose={() => null}
          >
            <Container>
              <Header appHeader>
                <Left>
                  <TouchableWithoutFeedback onPress={this.props.hideModal}>
                    <Icon name="arrow-back" />
                  </TouchableWithoutFeedback>
                </Left>
                <Body>
                  <Title>Marcação</Title>
                </Body>
                <Right>
                  <TouchableWithoutFeedback onPress={this.save}>
                    <Text>Salvar</Text>
                  </TouchableWithoutFeedback>
                </Right>
              </Header>
              <Content padder>
                <Field
                  name="allSchoolYears"
                  label="Todas Turmas"
                  component={DatePickerField}
                  props={{ initialValue: '-' }}
                />
                {store.schoolYearSelected.classes.map((schoolYear, index) =>
                  <Field
                    key={index}
                    name={schoolYear.key}
                    label={schoolYear.name}
                    component={DatePickerField}
                    props={{ initialValue: '-' }}
                  />,
                        )}
              </Content>
            </Container>
          </Modal>
        );
    }
}

const form = reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);
const selector = formValueSelector('formExerciseScreen');
export default connect((state) => {
    const formValues = store.schoolYearSelected.classes.map(schoolYear => schoolYear.key);
    return {
        formValues: selector(state, 'allSchoolYears', ...formValues),
    };
})(form);
