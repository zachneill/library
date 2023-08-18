(function () {
    var d, w, tabList, h, form, input, urlBase, active, facets, v, r, rt, a, f, select,
    query;
    d = document;
    w = window;
    r = (function () {
    try {
    return w.self !== w.top;
} catch (e) {
    return true;
}
})();
    rt = r ? '_blank' : '_self';
    a = d.getElementById('discovery-advanced-search');
    if (a) a.setAttribute('target', rt);
    tabList = d.querySelectorAll('#discovery-search-box span.material-tab');
    tabList = [].slice.call(tabList);
    h = function (e) {
    if (e.keyCode && e.keyCode !== 13) return;
    tabList.forEach(function (it) {
    it.className = 'material-tab';
});
    this.className = 'material-tab active-tab';
};
    tabList.forEach(function (tab) {
    tab.addEventListener('click', h);
    tab.addEventListener('keydown', h);
});
    form = d.getElementById('discovery-search-form');
    input = d.getElementById('discovery-search');
    select = d.getElementById('discovery-search-select');
    urlBase = 'https://bereacollege.on.worldcat.org/external-search?queryString=#T#&clusterResults=on&groupVariantRecords=off&stickyFacetsChecked=off&changedFacet=stickyFacetsChecked&baseScope=wz%3A868&sortKey=BEST_MATCH#F#';
    form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    f = '';
    active = d.querySelector('.material-tab.active-tab');
    if (active) {
    facets = JSON.parse(active.getAttribute('data-facets') || '[]');
    facets.forEach(function (facet) {
    console.log(facet);
    if (facet.key && facet.value && facet.value !== 'all') {
    f += '&' + facet.key + '=' + facet.value;
}
})
}
    query = input.value;
    if (select) {
    var index = select.options[select.selectedIndex].value

    if (index !== 'kw') query = select.options[select.selectedIndex].value + ':' + query;
}
    w.open(urlBase.replace('#T#', encodeURIComponent(query)).replace('#F#', f), rt);
});
})()