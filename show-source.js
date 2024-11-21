(function show_source_code() {
    var url = document.currentScript.dataset.href; if (!url) url = ""
    var text = `<div class="show_source_code"><b><a href="${url}">ORIGIN: ${url}</a></b><pre contenteditable="true" class="show_source"
    style=" overflow-y: scroll; border:1px solid black; padding: 1em; " spellcheck="false" translate="no"></pre></div>`
    document.currentScript.insertAdjacentHTML("afterend", text)
    var code = document.currentScript.nextSibling.firstChild.nextSibling
    fetch(url).then(res => res.text()).then(res => code.textContent = res)
})()