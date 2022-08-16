// Используем ES6 для поддержки старых браузеров можно использовать сборщик

const declOfNum = (number, words) => {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

const getCurrentLang = () => {
    const currentLanguage = new URLSearchParams(window.location.search).get('lng');
    if (currentLanguage && (currentLanguage === 'eng' || currentLanguage === 'ru')) {
        return currentLanguage;
    }

    return 'eng';
}

const setCurrentDate = (lng) => {
    const daysOfWeek = {
        ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        eng: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };

    const months = {
        ru: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        eng: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    const currentDate = new Date();
    const titleDateElement = document.querySelector('.main__title-date');

    const dayOfWeek = daysOfWeek[lng][currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[lng][currentDate.getMonth()]
    const year = currentDate.getFullYear();

    const localizedCurrentDate = dayOfWeek + ', ' + dayOfMonth + ' ' + month + ', ' + year;
    titleDateElement.textContent = localizedCurrentDate;
    titleDateElement.setAttribute('datetime', currentDate.toISOString().split('T')[0]);
};

const translatePage = (lng) => {
    if (lng === 'ru') {
        const mainTitleElement = document.querySelector('.main__title');
        mainTitleElement.textContent = 'Увеличьте скорость своего мобильного телефона на 50% всего одним нажатием!';

        const mainTextElement = document.querySelector('.main__text');
        mainTextElement.textContent = 'Magic Cleaner - это утилита для ускорения работы и оптимизации производительности вашего телефона. Она увеличит скорость и позволяет эффективно использовать дополнительные возможности, чтобы полностью и надолго остановить ненужный процесс запуска приложений в фоновом режиме.';

        const advantageListElement = document.querySelector('.advantage__list');
        advantageListElement.children[0].textContent = 'Очистите память и сделайте телефон быстрее!';
        advantageListElement.children[1].textContent = 'Ускорьте работу памяти за считанные секунды';
        advantageListElement.children[2].textContent = 'Остановите фоновые запущенные приложения';

        const todoListElement = document.querySelector('.todo__list');
        todoListElement.children[0].textContent = 'Нажмите кнопку "Установить" и установите Magic Cleaner прямо сейчас!';
        todoListElement.children[1].textContent = 'Откройте приложение и наслаждайтесь!';

        const downloadButtonElement = document.querySelector('.download__button');
        downloadButtonElement.textContent = 'Установить';

        const stopwatchTextElement = document.querySelector('.stopwatch-text');
        stopwatchTextElement.innerHTML = 'У вас есть <span class="stopwatch"></span>, чтобы воспользоваться этим предложением!';
    }
};

const initTimer = (lng, total, finishCallback) => {
    const stopwatchElement = document.querySelector('.stopwatch');

    const printStopwatch = () => {
        const minutes = Math.round(total / 60);
        const seconds = Math.round(total % 60);

        if (lng === 'ru') {
            stopwatchElement.textContent = minutes + declOfNum(minutes, [' минута и ', ' минуты и ', ' минут и ']) + seconds + declOfNum(seconds, [' секунда', ' секунды', ' секунд']);
        } else if (lng === 'eng') {
            stopwatchElement.textContent = minutes + declOfNum(minutes, [' minute and ', ' minutes and ', ' minutes and ']) + seconds + declOfNum(seconds, [' second', ' seconds', ' seconds']);
        }
    }

    printStopwatch();

    const intervalId = setInterval(() => {
        total--;
        printStopwatch();
        if (total === 0) {
            clearInterval(intervalId);
            finishCallback()
        }
    }, 1000);
};

const redirect = () => {
    window.location.replace('http://google.com');
}

const setDonwloadButtonClickHandler = (callback) => {
    const downloadButtonElement = document.querySelector('.download__button');
    downloadButtonElement.addEventListener('click', callback);
};

(() => {
    const currentLanguage = getCurrentLang();
    setCurrentDate(currentLanguage);
    translatePage(currentLanguage);
    //initTimer(currentLanguage, 10, redirect);
    //alert('download');
    setDonwloadButtonClickHandler(redirect);
})();