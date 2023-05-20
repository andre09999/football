import React from 'react';
import { render, screen } from  '@testing-library/react';
import userEvent from  '@testing-library/user-event';

import App from  '../App';


test('Verifica elementos da pagina Login',()=> {

    it('verifica se aparece mensagem corretamente', () => {
    
     render(<App  />);
    
     const linkElement = screen.getByText(/coloque sua chave de segurança/i);
    
     expect(linkElement).toBeInTheDocument();
    
    });
    it('verifica se tem um input do tipo text', () => {
    
        render(<App  />);
       
        const input = screen.getByTestId('inputLogin');
       
        expect(input).toBeInTheDocument();
       
       });

     it('verifica se tem um botão', () => {
    
        render(<App  />);
       
        const button = screen.getByTestId('entrar');
       
        expect(button).toBeInTheDocument();
       
       });
})