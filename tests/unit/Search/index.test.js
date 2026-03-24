import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../../../src/client/src/components/Search/index.js";
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

describe('Search', () => {
    beforeEach(() => {
        GetFetch.mockImplementation((url) => {
            if (url === 'getUserList') {
                return Promise.resolve([
                    { user_id: '1', display_name: 'Alice' },
                    { user_id: '2', display_name: 'Bob' },
                ]);
            }
            if (url === 'getFriendList') {
                return Promise.resolve(['2']);
            }
            if (url === 'getBlockList') {
                return Promise.resolve([]);
            }
            return Promise.resolve([]);
        });
    });

    it('renders the search page with users and filters them', async () => {
        renderWithProviders(<Search />);

        // Wait for users to be loaded
        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getAllByText('Bob').length).toBeGreaterThan(0);
        });

        // Test search functionality
        const searchInput = screen.getByPlaceholderText('Search by display name...');
        fireEvent.change(searchInput, { target: { value: 'Alice' } });

        const searchResults = screen.getByTestId('search-results');
        expect(searchResults).toHaveTextContent('Alice');
        expect(searchResults).not.toHaveTextContent('Bob');
    });

    it('displays friends and blocked users correctly', async () => {
        renderWithProviders(<Search />);

        await waitFor(() => {
            // Bob is a friend
            expect(screen.getAllByText('Bob').length).toBeGreaterThan(0);
            expect(screen.getByText('Friend')).toBeInTheDocument();

            // Alice is not a friend
            expect(screen.getByText('Alice')).toBeInTheDocument();
            const aliceCard = screen.getByText('Alice').closest('div.MuiPaper-root');
            expect(aliceCard).not.toHaveTextContent('Friend');
        });
    });
});
