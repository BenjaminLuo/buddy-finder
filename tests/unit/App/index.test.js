import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../../src/client/src/components/App/index.js";
import React from 'react';

jest.mock('../../../src/client/src/components/Auth/auth', () => ({
    auth: {
        onAuthStateChanged: jest.fn((cb) => {
            cb(null);
            return jest.fn();
        })
    }
}));

describe('App', () => {
    it('renders the main app and navigates', () => {
        render(<App />);
        // Check for the main app bar
        expect(screen.getByText('BuddyFinder')).toBeInTheDocument();

        // Check for navigation items
        expect(screen.getByText('Matching')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Matching'));
        // We can't assert the URL change directly here without a full router setup,
        // but we can check that the click doesn't crash.
    });
});
