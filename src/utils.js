export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_PRODUCTION_BASEURL
    }
    else if (process.env.NODE_ENV === 'development') {
        return process.env.REACT_APP_BASEURL
    }
}

export const firebaseConfig = {
    apiKey: "AIzaSyBcEBRIr1tmY_ZxuRgNN6cA1rLuhpr-KiA",
    authDomain: "startup-fb1d9.firebaseapp.com",
    projectId: "startup-fb1d9",
    storageBucket: "startup-fb1d9.appspot.com",
    messagingSenderId: "99269182406",
    appId: "1:99269182406:web:ce541eb547617766ac68c7",
    measurementId: "G-4MG5TT1N2K"
};