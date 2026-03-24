# BuddyFinder
Connect with like-minded individuals for activities, discussions, and events.

## Problem
Finding people with similar interests for specific activities or events can be challenging in a fragmented social landscape. BuddyFinder provides a unified platform to match with others for activities, participate in themed discussions, and manage shared events through an integrated calendar and goal tracker.

## Tech stack
- **Frontend**: React (v16), Material UI (@mui/material), FullCalendar, React Router
- **Backend**: Node.js, Express, MySQL
- **Infrastructure**: Firebase (Authentication and Hosting)
- **Testing**: Jest, React Testing Library, Cypress

## Key features
- **Activity Matching**: Search and match with users for specific locations, actions, and times.
- **Discussion Forums**: Engage in community discussions across General, Social, and Physical Activity categories.
- **Event Calendar**: Organise and track personal or shared events with an integrated calendar view.
- **Goal Tracking**: Set and complete personal goals with progress monitoring.
- **Social Management**: Manage friend lists and blocked users for a safe and personalised experience.
- **Usage Statistics**: View insights into your activity and engagement within the app.

## Demo

### Desktop Experience
A clean, professional interface designed for productivity and social discovery.

| Home Page | Matching | Discussion |
| :---: | :---: | :---: |
| ![Home](docs/images/desktop-main.png) | ![Matching](docs/images/desktop-matching.png) | ![Discussion](docs/images/desktop-news.png) |

| Forum | Calendar | Statistics |
| :---: | :---: | :---: |
| ![Forum](docs/images/desktop-forum.png) | ![Calendar](docs/images/desktop-calendar.png) | ![Statistics](docs/images/desktop-statistics.png) |

<details>
<summary>View More Desktop Screenshots</summary>

| Search | Similarity | FAQ |
| :---: | :---: | :---: |
| ![Search](docs/images/desktop-search.png) | ![Similarity](docs/images/desktop-similarity.png) | ![FAQ](docs/images/desktop-faq.png) |

| Contact | Settings | |
| :---: | :---: | :---: |
| ![Contact](docs/images/desktop-contact.png) | ![Settings](docs/images/desktop-settings.png) | |

</details>

### Mobile Experience
Fully responsive design ensuring you can find buddies on the go.

<p align="center">
  <img src="docs/images/mobile-main.png" width="30%" alt="Mobile Home" />
  <img src="docs/images/mobile-matching.png" width="30%" alt="Mobile Matching" />
  <img src="docs/images/mobile-news.png" width="30%" alt="Mobile News" />
</p>

<details>
<summary>View More Mobile Screenshots</summary>

<p align="center">
  <img src="docs/images/mobile-forum.png" width="30%" alt="Mobile Forum" />
  <img src="docs/images/mobile-calendar.png" width="30%" alt="Mobile Calendar" />
  <img src="docs/images/mobile-statistics.png" width="30%" alt="Mobile Statistics" />
</p>

<p align="center">
  <img src="docs/images/mobile-search.png" width="30%" alt="Mobile Search" />
  <img src="docs/images/mobile-similarity.png" width="30%" alt="Mobile Similarity" />
  <img src="docs/images/mobile-faq.png" width="30%" alt="Mobile FAQ" />
</p>

<p align="center">
  <img src="docs/images/mobile-contact.png" width="30%" alt="Mobile Contact" />
  <img src="docs/images/mobile-settings.png" width="30%" alt="Mobile Settings" />
</p>

</details>

## Usage & Setup

### Prerequisites
- Node.js (v12+ recommended)
- Yarn or NPM
- MySQL database (credentials must be configured in `src/server/config.js`)

### Installation
Clone the repository and install dependencies for both the root and the client.

```bash
# Install root dependencies
yarn install

# Install client dependencies
cd src/client
yarn install
```

### Example Usage
To run both the backend server and the frontend client concurrently:

```bash
yarn dev
```
The application will be available at `http://localhost:3000`, with the backend running on port 5000.

To run unit tests:
```bash
yarn test
```

To run Cypress E2E tests:
```bash
cd src/client
yarn cypress
```
