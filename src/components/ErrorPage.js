// src/components/ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigation = useNavigate();

    const handleBackToHome = () => {
        navigation.push('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Authentication Error</h1>
            <p style={styles.message}>There was an issue with your authentication. Please try again or contact support.</p>
            <button style={styles.button} onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '600px',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ErrorPage;
