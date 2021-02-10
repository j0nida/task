import ReactDOM from 'react-dom'

//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) 
        return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}


export const scrollBySmothly = (ref, change, duration = 500) => {

    let element = ReactDOM.findDOMNode(ref);
    const start = element.scrollTop;
    const increment = 50;
    let currentTime = 0;

    const animateScroll = () => {
        currentTime += increment;
        element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

export const scrollToSmothly = (ref, to, duration) => {

    let element = ReactDOM.findDOMNode(ref);
    const start = element.scrollTop;
    const change = to - start;
    const increment = 50;
    let currentTime = 0;

    const animateScroll = () => {
        currentTime += increment;
        element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

