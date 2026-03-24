import { render, screen } from "@testing-library/react";
import Landing from "../../../src/client/src/components/Landing/index.js";
import { MemoryRouter } from "react-router-dom";
import AuthDetails from '../../../src/client/src/components/Authentication/AuthDetails'

jest.mock('../../../src/client/src/components/Auth/auth', () => ({
    auth: {
        onAuthStateChanged: jest.fn((cb) => {
            cb(null);
            return jest.fn();
        })
    }
}));

describe('Landing', () => {
    function renderComponent() {
        render(
            <AuthDetails>
                <MemoryRouter>
                    <Landing />
                </MemoryRouter>
            </AuthDetails>
        );
    }

    it('renders the landing page with key elements', () => {
        renderComponent();
        expect(screen.getByText('Find Your Perfect Buddy')).toBeInTheDocument();
        expect(screen.getByText('Get Started Now')).toBeInTheDocument();
    });
})
