import { render, screen, waitFor } from "@testing-library/react";
import Statistics from "../../../src/client/src/components/Statistics/index.js";
import { MemoryRouter } from "react-router-dom";
import AuthDetails from '../../../src/client/src/components/Authentication/AuthDetails'
import GetFetch from '../../../src/client/src/components/common/index.js'
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../src/client/src/components/App/theme.js";

// Mock the auth module and GetFetch
jest.mock('../../../src/client/src/components/Auth/auth', () => ({
    auth: {
        onAuthStateChanged: jest.fn(cb => {
            cb({ uid: '123', email: 'test@test.com' }); // Mock a logged-in user
            return jest.fn(); // Return an unsubscribe function
        }),
    }
}));

jest.mock('../../../src/client/src/components/common/index.js', () => jest.fn());

const renderWithProviders = (component) => {
    return render(
        <ThemeProvider theme={theme}>
            <AuthDetails>
                <MemoryRouter>
                    {component}
                </MemoryRouter>
            </AuthDetails>
        </ThemeProvider>
    );
};

describe('Statistics', () => {
    beforeEach(() => {
        GetFetch.mockResolvedValue([
            { id: 1, goal: 'Run a marathon', completed: 1 },
            { id: 2, goal: 'Learn React', completed: 0 },
        ]);
    });

    it('renders the statistics page with user goals', async () => {
        renderWithProviders(<Statistics />);

        // Wait for the goals to be loaded and rendered
        await waitFor(() => {
            expect(screen.getByText('Run a marathon')).toBeInTheDocument();
        });

        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('1 / 2')).toBeInTheDocument();
    });
});
