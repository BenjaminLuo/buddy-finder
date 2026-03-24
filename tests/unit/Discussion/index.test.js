import { render, screen } from "@testing-library/react";
import Discussion from "../../../src/client/src/components/Discussion/index.js";
import { MemoryRouter } from "react-router-dom";

describe('Discussion', () => {

    function renderComponent() {
        render(
            <MemoryRouter>
                <Discussion />
            </MemoryRouter>
        );
    }

    it('renders the discussion page with key elements', () => {
        renderComponent();
        expect(screen.getByText('Community News')).toBeInTheDocument();
        expect(screen.getByText('Post an Update')).toBeInTheDocument();
    });
})
