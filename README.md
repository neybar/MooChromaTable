MooChromaTable
==============

A plugin that creates a scrollable table with a fixed position header, (the header will stay put while you scroll down the table content). It allows the user to define the table dimensions as a fixed pixel amount, auto, or 100%. This is meant to be a relatively lightweight and unobtrusive plugin requiring very little setup and minimal css and HTML markup.

Ported from a jQuery plugin called Chromatable
http://www.chromaloop.com/posts/chromatable-jquery-plugin
http://plugins.jquery.com/project/Chromatable

How to use
----------

MooChromaTables is very easy to use.  The main requirement for this plugin to work correctly is that you have a <thead> with <th> elements followed by a tbody section.

### HTML

    <table id='MyTable'>
        <thead>
            <tr>
                <th>1</th>
                <th>2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>2</td>
            </tr>
        </tbody>
    </table>

### Javascript

    $('MyTable').moochromatable();
    //or
    $('MyTable').moochromatable({width:'900px',height:'400px'});

Options
-------
width: can be any unit of measurement, '100%' or 'auto' defaults to '900px'
height: can be any unit of measurement, '100%' or 'auto' defaults to '300px'
