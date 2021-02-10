function getPos(element) {
    let x = 0, y = 0;

    // eslint-disable-next-line
    do {
        x += element.offsetLeft - element.scrollLeft;
        y += element.offsetTop - element.scrollTop;
        // eslint-disable-next-line
    } while (element = element.offsetParent);
    return { 'x': x, 'y': y };
}

export {
    getPos
}
