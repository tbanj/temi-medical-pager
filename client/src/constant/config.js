

const dev = {
    STREAM_API_KEY: process.env.REACT_STREAM_API_KEY
};

const prod = {
    STREAM_API_KEY: process.env.REACT_STREAM_API_KEY
};

const config = process.env.REACT_APP_NODE_ENV === 'production' ? prod : dev;

export default config;