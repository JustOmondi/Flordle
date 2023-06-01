const cookieName: string = 'flordleLoaded'

export const getCookie = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie: string = cookies[i].trim();

        if (cookie.startsWith(`${cookieName}=`)) {
            return cookie.substring(cookieName.length + 1);
        }
    }

    return null;
}

export const setCookie = () => {
    const date: Date = new Date();
    const THREE_MONTHS: number = 90
    date.setTime(date.getTime() + (THREE_MONTHS * 24 * 60 * 60 * 1000));

    const expires: string = `expires=${date.toUTCString()}`;
    const cookieValue: string = `true; ${expires} ;path=/;`

    document.cookie = `${cookieName}=${cookieValue}`;
}