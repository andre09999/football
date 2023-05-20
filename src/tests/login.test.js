import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from  '@testing-library/react';
import userEvent from  '@testing-library/user-event';

import App from  '../App';

describe('Verifica elementos da pagina Login',()=>{
      
      test('verifica se aparece mensagem corretamente', async () => {
        const history = createMemoryHistory();
        history.push("/");
        const { container } = render(
          <Router history={history}>
            <App />
          </Router>
        );

        expect(container.innerHTML).toMatch(/Login/);
      
      });
      test('verifica se tem um input do tipo text', () => {
      
        const history = createMemoryHistory();
        history.push("/");
        const { container } = render(
          <Router history={history}>
            <App />
          </Router>
        );
         
          const input = screen.getByTestId('inputLogin');
         
          expect(input).toBeInTheDocument();
         
         });
  

      test('verifica se tem o elemento e uma mensagem indicando local', () => {
      
        const history = createMemoryHistory();
        history.push("/");
        const { container } = render(
          <Router history={history}>
            <App />
          </Router>
        );
         
          const input = screen.getByTestId('msgLogin');
          const mensagem = screen.getByText('coloque sua chave de segurança')
          expect(input).toBeInTheDocument();
         expect(mensagem).toBeInTheDocument();
         });
  
         test('verifica se tem um botão', () => {
      
          const history = createMemoryHistory();
          history.push("/");
          const { container } = render(
            <Router history={history}>
              <App />
            </Router>
          );
         
          const button = screen.getByTestId('entrar');
         
          expect(button).toBeInTheDocument();
          expect(button).toBeDisabled();
         });

})