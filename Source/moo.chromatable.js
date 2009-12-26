/*
---
description: Creates a scrollable table with a fixed position header, (the header will stay in place while you scoll down the table content).

authors:
- Zachary D. Siswick
- James Lance

license: MIT-style

requires:
- core/1.2.4:Class.Extras
- core/1.2.4:Element.Style
- core/1.2.4:Element.Event

provides:
- MooChromaTable
...
*/
var MooChromaTable = new Class({
    // implements
    Implements: [Options],

    // options
    options: {
        width: '900px',
        height: '300px'
    },

    // initialization
    initialize: function(table, options) {
        // set options
        this.setOptions(options);

        // lock table head
        this.lock_head(table);
    },

    // this method takes a table element and pins its' head element
    lock_head: function(table) {
        var uniqueID = table.getProperty('ID') + ('_wrapper');
        table.setStyle('width',this.options.width);
        table.addClass('_scrolling');

        var scrolling_outer = new Element('div',{'class':'scrolling_outer'});
        scrolling_outer.setStyle('position','relative');

        var scrolling_inner = new Element('div', {'class': 'scrolling_inner', id: uniqueID});
        var pr = '17px';
        // if the width is auto, we need to remove padding-right on scrolling container
        if (this.options.width == '100%' || this.options.width == 'auto') {
            pr = '0px';
        }
        scrolling_inner.setStyles({
            'border': '1px solid #CCCCCC',
            'overflow-x': 'hidden',
            'overflow-y': 'auto',
            'padding-right': pr,
            'height': this.options.height,
            'width': this.options.width
        });

        scrolling_inner.wraps(table);
        scrolling_outer.wraps(scrolling_inner);

        // clone an exact copy of the scrolling table and add to DOM before the original table
        // replace old class with new to differentiate between the two
        var clone_table = table.clone().inject(table,'before');
        clone_table.addClass('_thead');
        var clone_width = this.options.width;
        if (this.options.width == '100%' || this.options.width == 'auto') {
            clone_width = 'auto';
        }
        clone_table.setStyles({
            'width': clone_width,
            'display': 'block',
            'position': 'absolute',
            'border': 'none',
            'border-bottom': '1px solid #CCCCCC',
            'top': '1px'
        });
        // remove all children within the cloned table after the thead element
        clone_table.getChildren('tbody').each(function(ele) {
            ele.dispose();
        });

        //copy the cell widths across from the original table
        this.resizer(table);
        if (this.options.width == '100%' || this.options.width == 'auto') {
            //attach the resizer to the resize window event.
            window.addEvent('resize', this.resizer.pass(table));
        }
    },
    resizer: function(table) {
        var source = table.getElement('thead').getElements('th');

        table.getPrevious().getElement('thead').getElements('th').each(function(th, i) {
            console.log(source[i].getStyle('width'));
            th.setStyle('width', source[i].getStyle('width'));
        });
    }
});
Element.implement({
    moochromatable: function(options) {
        return new MooChromaTable(this, options);
    }
});
