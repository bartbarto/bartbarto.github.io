/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function() {
    'use strict';

    console.log(' __                 \n/  \\        _____________ \n|  |       /             \\\n@  @       | Hi there.   |\n|| ||      |             |\n|| ||   <--| Please type |\n|\\_/|      | your command|\n\\___/      \\_____________/           ')

    var navdrawerContainer = document.querySelector('.navdrawer-container');
    var appbarElement = document.querySelector('.app-bar');
    var menuBtn = document.querySelector('.menu');
    var main = document.querySelector('main');

    function closeMenu() {
        appbarElement.classList.remove('open');
        navdrawerContainer.classList.remove('open');
    }

    function toggleMenu() {
        appbarElement.classList.toggle('open');
        navdrawerContainer.classList.toggle('open');
    }

    main.addEventListener('ontouchstart', closeMenu);
    main.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);
    navdrawerContainer.addEventListener('click', function(event) {
        if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
            closeMenu();
        }
    });

    document.querySelector('.navdrawer-container').addEventListener('click', function(e) {
        var clickEl = e.toElement.getAttribute('href');
        // alert(clickEl);
        if(clickEl){
            switchViews(clickEl);
        }
    })

    // document.querySelector('.navi').addEventListener('click', function(e) {
    //     var clickEl = e.toElement.getAttribute('href');
    //     console.log(clickEl)
    //     switchViews(clickEl);
    // })

    window.onhashchange = function(e){
        switchViews('#' + e.newURL.split('#')[1])
    }

    if(window.location.hash){
        switchViews(window.location.hash);
    }
})();

function switchViews(element) {
    try {
        var mains = document.getElementsByTagName('main');
        for (var i = 0; i < mains.length; i++) {
            mains[i].style.display = 'none';
        };

        document.querySelector(element).style.display = 'inline';
    } catch (e) {
        console.warn(e)
    }
}
