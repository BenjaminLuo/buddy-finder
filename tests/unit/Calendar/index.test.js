import { render, screen, waitFor } from "@testing-library/react";
import Calendar from "../../../src/client/src/components/Calendar/index.js";
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

describe('Calendar', () => {
    beforeEach(() => {
        GetFetch.mockResolvedValue([
            { id: 1, event: 'Team Meeting', start: '2024-01-01T10:00:00', end: '2024-01-01T11:00:00' },
            { id: 2, event: 'Project Deadline', start: '2024-01-02T17:00:00', end: '2024-01-02T17:00:00' },
        ]);
    });

    it('renders the calendar with events', async () => {
        renderWithProviders(<Calendar />);

        // Wait for the events to be loaded and rendered by FullCalendar
        await waitFor(() => {
            expect(screen.getByText('Team Meeting')).toBeInTheDocument();
            expect(screen.getByText('Project Deadline')).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});
