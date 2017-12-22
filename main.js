// ==UserScript==
// @name         Change search engine
// @namespace    https://github.com/kyyblabla/change-search-engine
// @version      0.1
// @description  Change search engine
// @author       kyyblabla
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    String.prototype.format = function(replacements) {
        replacements = (typeof replacements === 'object') ? replacements : Array.prototype.slice.call(arguments, 0);
        return formatString(this, replacements);
    }
    var formatString = function(str, replacements) {
        replacements = (typeof replacements === 'object') ? replacements : Array.prototype.slice.call(arguments, 1);
        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
            if (m == '{{') {
                return '{';
            }
            if (m == '}}') {
                return '}';
            }
            return replacements[n];
        });
    };
    var app = new Vue({
        el: '#engine_container',
        data: {
            keyWord: '',
            engines: [{
                "name": "google",
                "url": "https://www.google.com/search?q={keyWord}"
            }, {
                "name": "baidu",
                "url": "https://www.baidu.com/s?wd={keyWord}"
            }, {
                "name": "bing",
                "url": "https://bing.com/search?q={keyWord}"
            }],
            currentEngine: 0,
            showMe: false
        },
        filters: {
            formatSearchUrl(value, keyWord) {
                if (!value) {
                    return '';
                }
                value = value.toString();
                return value.format({
                    "keyWord": keyWord
                });
            }
        },
        methods: {
            search() {
                if (!this.keyWord) {
                    return;
                }
                console.log(this.engines[this.currentEngine].name);
            },
            onDirectionKeydown(key) {
                if (key === 'up') {
                    this.currentEngine--;
                } else {
                    this.currentEngine++;
                }
                if (this.currentEngine < 0) {
                    this.currentEngine = this.engines.length - 1;
                }
                if (this.currentEngine >= this.engines.length) {
                    this.currentEngine = 0;
                }
            }
        },
        mounted() {
            const _this = this;
            document.onkeydown = function(e) {
                console.log(e.keyCode);
                if (e.keyCode === 69 && e.altKey) {
                    _this.showMe = !_this.showMe;
                }
            };
        }
    });
})();
