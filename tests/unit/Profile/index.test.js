import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../../../src/client/src/components/Profile/index.js";
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

describe('Profile', () => {
    beforeEach(() => {
        GetFetch.mockResolvedValue([{
            display_name: 'Test User',
            bio: 'This is a test bio.',
            interests: ['React', 'Testing'],
            posts: ['My first post'],
            comments: ['A great comment']
        }]);
    });

    it('renders the profile page with user data', async () => {
        renderWithProviders(<Profile />);

        // Wait for the user data to be loaded and rendered
        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument();
        });

        expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('My first post')).toBeInTheDocument();
        expect(screen.getByText(/"A great comment"/)).toBeInTheDocument();
    });
});
