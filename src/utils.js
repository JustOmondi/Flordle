const cookieName = 'flordleLoaded'

export const getCookie = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(`${cookieName}=`)) {
            return cookie.substring(cookieName.length + 1);
        }
    }

    return null;
}

export const setCookie = () => {

    const date = new Date();
    const THREE_MONTHS = 90
    date.setTime(date.getTime() + (THREE_MONTHS * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;
    const cookieValue = `true; ${expires} ;path=/;`

    document.cookie = `${cookieName}=${cookieValue}`;
}