import { render, screen } from "@testing-library/react";
import Matching from "../../../src/client/src/components/Matching/index.js";
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

describe('Matching', () => {
    function renderComponent() {
        render(
            <AuthDetails>
                <MemoryRouter>
                    <Matching />
                </MemoryRouter>
            </AuthDetails>
        );
    }

    it('renders the matching page with key elements', () => {
        renderComponent();
        expect(screen.getByText('Buddy Matching')).toBeInTheDocument();
        expect(screen.getByText("What's the plan?")).toBeInTheDocument();
    });
})
