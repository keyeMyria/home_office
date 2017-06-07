import React, { Component } from 'react';
import { Content, Button, Text, Picker, Toast } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from './store';

import { PickerField } from './redux-form-native-base';

// const validate = values => {
//   const error = {};
//   // TODO: Implementar validações
//   // if (!values.email) {
//   //   error.email = 'required field';
//   // }
//   // if (!values.name) {
//   //   error.name = 'required field';
//   // }
//   // if (!values.selectVehicle) {
//   //   error.selectVehicle = 'required field';
//   // }
//   return error;
// };

@observer
class CargaMinima extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    this.checkIfFormChanged();
  }

  componentDidMount() {
    this.checkIfFormChanged();
  }

  checkIfFormChanged = () => {
    // Reset form
    if (store.formChanged) {
      this.props.reset();
      store.toogleFormChanged();
    }
  }

  submit = values => {
    store.salvarCargaMinimaFilho(values);

    Toast.show({
      text: 'Dados salvos com sucesso!',
      type: 'success',
      position: 'bottom',
      buttonText: 'OK'
    });
  }

  render() {

    const materias = store.filhoMaterias.items;
    const pickerItems = store.temposCargaExercicio.map((tempo, index) =>
      <Picker.Item key={index} label={tempo.label} value={tempo.id} />
    );

    return (
      <Content padder>
        {materias.map((materia, index) => {
          const currentValue = store.filhoCargaExercicio[materia.id] || 0;
          return (
            <Field key={index}
              name={materia.id}
              label={materia.nome}
              component={PickerField}
              props={{ initialValue: currentValue }}>
              {pickerItems}
            </Field>
          );
        })}
        <Button block info onPress={this.props.handleSubmit(this.submit)} style={{ marginTop: 20 }}>
          <Text>Salvar</Text>
        </Button>
      </Content>
    );
  }
}

export default reduxForm({
  form: 'formCargaMinima',
  // validate
})(CargaMinima);