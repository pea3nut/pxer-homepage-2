$(function () {

    // change url
    $('a[push-state]').on('click', function (event) {
        event.preventDefault();
        history.pushState({
            focus: this.getAttribute('push-state-focus'),
        }, '', this.href);

        const focusElt = document.querySelector(history.state.focus);
        new MoveTo({ tolerance: 120 }).move(focusElt);
    });

    // Scroll spy
    const remotes = Array.from(document.querySelectorAll('[scroll-spy]'));
    const spies = remotes.map(el => document.querySelector(el.getAttribute('scroll-spy')));
    $(window).on('scroll', throttle(function (event) {
        remotes.forEach((remote, index) => {
            const spy = spies[index];
            if (spy.getBoundingClientRect().top < window.innerHeight / 3) {
                remote.classList.add('active');
            } else {
                remote.classList.remove('active');
            }
        });
    }, 150));

    // Detect browser
    const browserDetecters = [{
        name: 'firefox',
        href: 'https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/',
        is: () => navigator.userAgent.toLocaleLowerCase().includes('firefox'),
    },{
        name: 'qq',
        href: 'https://appcenter.browser.qq.com/search/detail?key=Tampermonkey&id=dhdgffkkebhmkfjojejmpbldmpobfkfo &title=Tampermonkey',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('qqbrowser'),
    },{
        name: 'edge',
        href: 'https://www.microsoft.com/store/apps/9NBLGGH5162S',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('edge'),
    },{
        name: '360se',
        href: 'https://ext.se.360.cn/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('360se'),
    },{
        name: '360ee',
        href: 'https://ext.chrome.360.cn/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('360ee'),
    },{
        name: 'maxthon',
        href: 'http://extension.maxthon.cn/detail/index.php?view_id=1680&category_id=',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('maxthon'),
    },{
        name: 'sougou',
        href: 'http://ie.sogou.com/app/s/YXBwXzQzMjY=',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('metasr'),
    },{
        name: '2345',
        href: 'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
        is: () => navigator.appVersion.toLocaleLowerCase().includes('2345explorer'),
    },{
        name: 'chrome',
        href: 'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
        is: () => true,
    }];
    $('#browserType').on('input', function (event) {
        const info = browserDetecters.find(i => i.name === this.value);
        document.getElementById('extensionStore').href = info.href;
    });
    const info = browserDetecters.find(detecter => detecter.is());
    document.getElementById('browserType').value = info.name;
    document.getElementById('extensionStore').href = info.href;

    // For ssr
    $(window).on('load', () => $('a[push-state][ssr]').click());
});

// @see https://stackoverflow.com/questions/27078285/simple-throttle-in-js
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
