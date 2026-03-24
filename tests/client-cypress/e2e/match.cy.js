import * as React from 'react';
import Discussion from '../../src/components/Discussion'
import { render, screen } from '@testing-library/react'

// let renderTest;

describe('Discussion', () => {
  function renderComponent() {
    render(<Discussion />);
  }

  it('Renders', () => {
    renderComponent();
    expect(screen.getByText('News'));
  })
})