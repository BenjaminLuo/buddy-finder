import { render, screen, fireEvent } from "@testing-library/react";
import { SignInForm } from "../../../src/client/src/components/Authentication/SignInForm";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../src/client/src/components/App/theme';

// Mock the auth module
jest.mock('../../../src/client/src/components/Auth/auth', () => ({
    auth: {
        onAuthStateChanged: jest.fn(),
    },
    signIn: jest.fn(() => Promise.resolve()),
    signUp: jest.fn(() => Promise.resolve()),
}));

const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}

describe('Authentication', () => {
    it('renders the sign-in form and allows typing', () => {
        renderWithTheme(<SignInForm />);

        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('calls the signIn function on sign-in button click', () => {
        const { signIn } = require('../../../src/client/src/components/Auth/auth');
        renderWithTheme(<SignInForm />);

        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const signInButton = screen.getByText('Sign In');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(signInButton);

        expect(signIn).toHaveBeenCalledWith(expect.any(Object), 'test@example.com', 'password123');
    });

    it('calls the signUp function on create account button click', () => {
        const { signUp } = require('../../../src/client/src/components/Auth/auth');
        renderWithTheme(<SignInForm />);

        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const createAccountButton = screen.getByText('Create New Account');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(createAccountButton);

        expect(signUp).toHaveBeenCalledWith(expect.any(Object), 'test@example.com', 'password123');
    });
});
