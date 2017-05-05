'use strict';

var helper = require("./helper.js"),
    libcore = require("libcore");

function Pointer(chr, negative) {
    if (chr) {
        this.chr = chr;
    }
    
    this.negative = negative === true;
}

Pointer.prototype = {
    constructor: Pointer,
    negative: false,
    chr: '',
    to: null,
    next: null,
    
    clone: function (overrides) {
        var pointer = this,
            from = null,
            dupe = helper.clone,
            assign = libcore.assign;
        var created, last;
        
        if (!overrides) {
            overrides = null;
        }
        
        for (; pointer; pointer = pointer.next) {
            created = dupe(pointer);
            if (overrides) {
                assign(created, overrides);
            }
            
            if (from) {
                last.next = created;
            }
            else {
                from = created;
            }
            
            last = created;
        }
        
        last.next = null;
        
        return [from, last];
        
    },
    
    point: function (fragment) {
        var pointer = this;
        
        for (; pointer; pointer = pointer.next) {
            if (!pointer.to) {
                pointer.to = fragment;
            }
        }
        
        return this;
    },
    
    last: function () {
        var pointer = this;
        
        for (; pointer.next; pointer = pointer.next) {}
        
        return pointer;
    },
    
    range: function (to) {
        var chr = this.chr,
            Class = Pointer,
            S = String,
            start = null,
            end = null,
            negative = this.negative;
        var from, len, created;
        
        from = chr.charCodeAt(0);
        chr = to.chr;
        to = chr.charCodeAt(0);
        len = to - from - 1;
        
        for (; len--;) {
            created = new Class(S.fromCharCode(++from), negative);
            if (start) {
                end.next = created;
            }
            else {
                start = created;
            }
            end = created;
        }
        
        return start && [start, end];
    }
    
};

module.exports = Pointer;