import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui/components/Navbar";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));


describe('Pruebas en <Navbar/>', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Steve',
            id: '123'
        },
        logout: jest.fn()
    };
    
    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrar el nombre del usuario logeado', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        ); 

        expect(screen.getByText('Steve')).toBeTruthy();

    });

    test('Debe llamar el logout y navigate cuando se hace lcick en el botono de logout', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        ); 

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);
        
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});
        
    }); 

});

