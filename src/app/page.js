"use client"
import { useState, useEffect } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { ethers } from 'ethers';
import { Button, Input, useNotification } from '@web3uikit/core';
import { ConnectButton } from '@web3uikit/web3';
import { contractAddress, contractABI } from '../utils/contract.js';
import "../styles/globals.css";
import "dotenv";


export default function HomePage() {
    const { isWeb3Enabled, chainId: chainIdHex, user } = useMoralis();
    const [isWaitingForResult, setIsWaitingForResult] = useState(false);
    const [displayResult, setDisplayResult] = useState(false);
    const [betAmount, setBetAmount] = useState('');
    const [selectedSide, setSelectedSide] = useState('');
    const [result, setResult] = useState('');
    const [won, setWon] = useState(false);
    const [gainedOrLost, setGainedOrLost] = useState('');
    const [coinFlippedEventEmitted, setCoinFlippedEventEmitted] = useState(false);
    const [contract, setContract] = useState('');
    const dispatch = useNotification();
    const chainId = parseInt(chainIdHex);

     const handleFlip = async () => {

        if (!isWeb3Enabled) {
            alert("Please connect your wallet!");
            return;
        }

        if (chainId != 11155111) {
            alert("please connect to Sepolia testnet");
            return;
        }

        if (!betAmount || betAmount <= 0) {
            alert("Bet amount must be greater than 0");
            return; // Stop further execution if the bet amount is invalid
        }

        if (!selectedSide) {
            alert("Please select a side!");
            return; // Stop further execution if a side is not selected
        }

        try {
            const tx = await flipCoin(selectedSide);

            if (tx) {
                setIsWaitingForResult(true);
                handleTransactionSuccess(tx);
            } else {
                handleTransactionFailure(tx);
                return;
            }
        } catch (error) {
            console.error('Error during flip:', error);
            if (error.code === 4001) {  // Ethers.js error code for user rejection
                console.log("transaction denied!");
                alert("Transaction rejected by user.");
            } else {
                console.log("An error occurred during the transaction.");
            }
        }

        const handleCoinFlipped = (player, betAmount, side, result, won) => {
            console.log('CoinFlipped event detected:', { player, betAmount, side, result, won });
            setResult(result);
            setWon(won);
            setGainedOrLost(betAmount);
            setCoinFlippedEventEmitted(true);
            setDisplayResult(true);

            contract.off('CoinFlipped', handleCoinFlipped);
        };

        contract.on('CoinFlipped', handleCoinFlipped);
    }

    const { fetch: flipCoin, data, error, isFetching } = useWeb3ExecuteFunction({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: 'flip',
        params: {
            _side: selectedSide,
        },
        msgValue: betAmount ? ethers.parseEther(betAmount) : undefined,
    });

    const handleTransactionSuccess = () => {
        dispatch({
            type: "success",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
        })
    }

    const handleTransactionFailure = () => {
        dispatch({
            type: "error",
            message: "Transaction Failed!",
            title: "Transaction Notification",
            position: "topR",
        })
    }

    const handleExit = async () => {
        setDisplayResult(false);
        setIsWaitingForResult(false);
    }

    useEffect(() => {
        const chainId = parseInt(chainIdHex);
    }, [chainIdHex]);

    useEffect(() => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const Contract = new ethers.Contract(contractAddress, contractABI, provider);
        setContract(Contract);
    }, []);

    return (
        <div className="container">
            {isWaitingForResult && !displayResult && (
                <div className="loading-container">
                    <div className="loading-text">Loading result...</div>
                    <div className="loading-spinner"></div>
                </div>
            )}
            {!isWaitingForResult && (
                <div className="main-container">
                    <div className="connect-button">
                        <ConnectButton/>
                    </div>
                    <div className="bet-amount">
                        <Input
                            label="Enter bet amount in ETH"
                            name="Bet Amount"
                            type="number"
                            onChange={(e) => setBetAmount(e.target.value)}
                            value={betAmount}
                            className="bet-amount-input"
                        />
                        <h1 className="choose-side-title">Choose your side:</h1>
                        <div className="side-buttons">
                            <Button
                                onClick={() => setSelectedSide('heads')}
                                text="HEADS"
                                theme="secondary"
                                size="large"
                                radius="50%"
                                isSelected={selectedSide === 'heads'}
                                className="side-button"
                            />
                            <h6>or</h6>
                            <Button
                                onClick={() => setSelectedSide('tails')}
                                text="TAILS"
                                theme="secondary"
                                size="large"
                                radius="50%"
                                isSelected={selectedSide === 'tails'}
                                className="side-button"
                            />
                        </div>
                        <div className="choice">Your choice : {selectedSide}</div>
                        <div>
                            <Button
                                onClick={handleFlip}
                                text="FLIP"
                                theme="primary"
                                size="large"
                                radius="50%"
                                className="flip-button"
                                isLoading={isFetching && !coinFlippedEventEmitted}
                            />
                        </div>
                    </div>
                </div>
            )}
            {coinFlippedEventEmitted && displayResult && (
                <div className="flex-1 text-right">
                    {data && (
                        <p className="success-message">
                            Transaction successful! <a href={`https://sepolia.etherscan.io/tx/${data.hash}`} target="_blank" rel="noopener noreferrer">View on Etherscan</a>
                        </p>
                    )}
                    {error && (
                        <p className="error-message">
                            Error: {error.message}
                        </p>
                    )}
                    {result && (
                        <div className="result-container">
                            <div className={`result-message ${won ? 'win' : 'lose'}`}>
                                <h2>{won ? 'Congratulations! You Won!' : 'Sorry, You Lost!'}</h2>
                                <p>The coin landed on: <span className="coin-result">{result}</span></p>
                                <p>You {won ? `gained  ${ethers.formatEther(gainedOrLost) * 2}` : `lost ${ethers.formatEther(gainedOrLost)}`}</p>
                            </div>
                            <p >
                                View <a className="success-message" href={`https://sepolia.etherscan.io/address/${data.from}#internaltx`} target="_blank" rel="noopener noreferrer">Gains </a>
                                /<a className="error-message" href={`https://sepolia.etherscan.io/address/${data.from}`} target="_blank" rel="noopener noreferrer"> Losses</a> on Etherscan
                            </p>
                            <Button
                                onClick={handleExit}
                                text="Close"
                                theme="primary"
                                size="large"
                                radius="50%"
                                className="close-result"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
