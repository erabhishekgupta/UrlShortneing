import React, { useState } from 'react';
import axios from 'axios';
import '../Style.css/urlapp.css';  // Add your CSS styles here

function UrlShortneing() {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidUrl = (string) => {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/; // Basic URL validation regex
        return regex.test(string);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShortenedUrl('');
        setError('');

        // Validate the URL
        if (!isValidUrl(url)) {
            setError('Please enter a valid URL.');
            setLoading(false);
            return; // Exit the function if the URL is invalid
        }

        try {
            // Make sure to include the correct URL for your API
            const response = await axios.post('https://urlshortening-production.up.railway.app/generate', { url });

            if (response.data && response.status === 200) {
                const fullShortenedUrl = `https://urlshortening-production.up.railway.app/${response.data.shortLink}`;
                setShortenedUrl(fullShortenedUrl);
            } else {
                setError('Failed to shorten URL. Please try again.');
            }
        } catch (err) {
            console.error("Error shortening URL:", err.response || err);
            setError(err.response?.data?.message || 'Failed to shorten URL. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setUrl('');            // Clear the URL input
        setShortenedUrl('');   // Clear the shortened URL result
        setError('');          // Clear any error message
    };

    const copyToClipboard = () => {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl)
                .then(() => {
                    alert('Shortened URL copied to clipboard!'); // Feedback for the user
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        }
    };

    return (
        <div className="url-shortener-container">
            <h1 className="title">Shorten a long link</h1>
            <p className="subtitle">Convert a long link into a shorter one</p>
            <form onSubmit={handleSubmit} className="shorten-form">
                <input
                    className="url-input"
                    type="text"
                    placeholder="Paste your long link here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <div className="button-container">
                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Shortening...' : 'Get Your Link'}
                    </button>
                    <button type="button" className="clear-button" onClick={clearForm}>
                        Clear Section
                    </button>
                </div>
            </form>
            {error && <p className="error">{error}</p>}
            {shortenedUrl && (
                <div className="shortened-url-container">
                    <p className="shortened-url">
                        Shortened URL:{" "}
                        <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                            {shortenedUrl}
                        </a>
                    </p>
                    <button className="copy-button" onClick={copyToClipboard}>
                        Copy to Clipboard
                    </button>
                </div>
            )}
        </div>
    );
}

export default UrlShortneing;
