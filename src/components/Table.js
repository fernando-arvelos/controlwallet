import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        <tr>
          <th scope="row">Descrição</th>
          <th scope="row">Tag</th>
          <th scope="row">Método de pagamento</th>
          <th scope="row">Valor</th>
          <th scope="row">Moeda</th>
          <th scope="row">Câmbio utilizado</th>
          <th scope="row">Valor convertido</th>
          <th scope="row">Moeda de conversão</th>
          <th scope="row">Editar/Excluir</th>
        </tr>
      </div>
    );
  }
}

export default Table;
