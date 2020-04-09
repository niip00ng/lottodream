let clicked = false

export const safeClicked = () => {
    if(!clicked) {
        clicked = !clicked
        releaseClicked()
        return clicked
    }
}

export const releaseClicked = () => {
    setTimeout(() => {
        
        clicked = !clicked
    }, 1000);
}