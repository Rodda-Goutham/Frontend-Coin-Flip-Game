# Frontend-Coin-Flip-Game
# Overview
This is the frontend for the Coin Flip Game, a decentralized application (dApp) built using Next.js, React, and TailwindCSS. The application allows users to connect their Ethereum wallet, place bets on a coin flip, and potentially double their bet amount based on the outcome. The frontend interacts with the Coin Flip Game smart contract deployed on the Ethereum network, using the Ethers.js library for blockchain interactions.
## After connecting wallet
![Screenshot from 2024-09-08 01-31-22](https://github.com/user-attachments/assets/cf6d4000-862a-4c49-9e14-6bd9d815ebc9)

## After placing bet
![Screenshot from 2024-09-08 01-31-53](https://github.com/user-attachments/assets/78c1dd0a-7203-44c6-b896-4e8999313af8)

## Result
![Screenshot from 2024-09-08 01-33-26](https://github.com/user-attachments/assets/9b88ea90-6d5c-42f7-b324-b02203ff6bac)


# Table of Contents
- [Features](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#features)
- [Technologies Used](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#technologies-used)
- [Getting Started](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#getting-started)
- [Usage](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#usage)
- [Custom Scripts](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#custom-scripts)
- [Contributing](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#contributing)
- [License](https://github.com/Rodda-Goutham/Frontend-Coin-Flip-Game/edit/main/README.md#license)
# Features
- **Connect Wallet**: Users can connect their Ethereum wallet (e.g., MetaMask).
- **Bet Placement**: Users can place a bet on either "heads" or "tails".
- **Coin Flip**: Initiate a coin flip and view the outcome.
- **Feedback**: The UI displays a message indicating whether the user won or lost the bet.
- **Responsive Design**: The interface is responsive and user-friendly across devices.
# Technologies Used
- **Next.js**: Framework for building server-side rendered React applications.
- **React.js**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling the application.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **Moralis**: Web3 development platform used for authentication and wallet interactions.
- **Web3uikit**: UI components for Web3 applications.
# Getting Started
## Prerequisites
Ensure you have the following installed:

- Node.js (v14.x or later)
- Yarn package manager
## Installation
Clone the repository:
```
git clone https://github.com/your-username/coin-flip-game-frontend.git
cd coin-flip-game-frontend
```
1. Install dependencies:
```
yarn install
```
2. Create a .env.local file:

Create a .env.local file in the root directory and add the necessary environment variables:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=<your-contract-address>
NEXT_PUBLIC_ALCHEMY_API_KEY=<your-alchemy-api-key>
```
3. Run the development server:
```
yarn dev
```
The application will be available at http://localhost:3000.

## Deployment
To deploy the application to Vercel:

## Build the application:
```
yarn build
```
Deploy to Vercel:
```
vercel
```
Follow the prompts to deploy the application.

# Usage
## Connecting Wallet
- Upon loading the application, click the "Connect Wallet" button in the top right corner to connect your Ethereum wallet.
- Ensure you are connected to the correct network (e.g., Sepolia testnet).
## Placing a Bet
- Enter the amount of ETH you want to bet in the input field.
- Select either "Heads" or "Tails" by clicking the corresponding button. Only one button can be selected at a time.
- Click the "Flip" button to initiate the coin flip. The transaction will be sent to the Ethereum network.
## Viewing the Outcome
- After the coin flip, a message will appear on the screen indicating whether you won or lost.
- If you win, your winnings will be automatically sent to your wallet.
# Custom Scripts
- ```yarn dev```: Runs the application in development mode.
- ```yarn build```: Builds the application for production.
- ```yarn start```: Starts the production server.
- ```yarn lint```: Lints the codebase using ESLint.
# Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

## Steps to Contribute:
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to the branch.
5. Submit a pull request.
# License
This project is licensed under the MIT License. See the LICENSE file for details.

## Additional Notes:
- Replace your-username in the clone command with your GitHub username if you fork the project.
- Make sure to keep the .env.local file secure as it contains sensitive information like API keys and contract addresses.
