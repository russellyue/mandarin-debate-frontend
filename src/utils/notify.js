export default async () => {
    const play = async (url) => {
        var audio = new Audio(url);
        audio.play();
    };
    const url = './static/soft-metal-bell.mp3';
    play(url);
};

// export default notificationSound;
