$(function () {
    $('a').on('click', function (event) {
        const matchResult = this.href.match(/#lang=([a-z]{2})$/);
        if (!matchResult) return;

        event.preventDefault();
        cookies.set('lang', matchResult[1]);
        location.reload();
    });
});