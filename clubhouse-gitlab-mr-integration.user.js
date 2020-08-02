// ==UserScript==
// @name         Clubhouse gitlab merge request integration
// @namespace    http://tampermonkey.net/
// @version      0.0-alpha
// @description  Copies correct link for clubhouse integration with gitlab merge request
// @author       bpalij | https://github.com/bpalij
// @match        https://app.clubhouse.io/*/story/*/*
// @source       https://github.com/bpalij/clubhouse-gitlab-mr-integration
// @supportURL   https://github.com/bpalij/clubhouse-gitlab-mr-integration/issues
// @grant        none
// ==/UserScript==

// ts check directives work in vs code
// @ts-check

(function() {

  'use strict';

  var alreadyCreatedTimers = 0; // some time after rendering page it deletes tampermonkey elements, so checking some times in a row before deleting check timer

  var newTimer = setInterval(function () { // needed elements appear not on page load, so checking while needed elements will not appear on page

    // checking if elements which are created by this script are on page
    var alreadyCreatedSpan1 = document.getElementById('tampermonkey-added-span-text-copy-this-in-gitlab-mr');
    var alreadyCreatedSpan2 = document.getElementById('tampermonkey-added-span-text-copied');
    var alreadyCreatedInput = document.getElementById('tampermonkey-added-input-with-text-for-copy');
    var alreadyCreatedButton = document.getElementById('tampermonkey-added-button-that-will-copy-text');

    if (alreadyCreatedSpan1 || alreadyCreatedSpan2 || alreadyCreatedInput || alreadyCreatedButton) {

      if( (alreadyCreatedTimers++) > 100) { clearInterval(newTimer); } // if elements are kept on page for some time and do not disappear, delete timer

    } else {

      alreadyCreatedTimers = 0; // if elements disappeared, start counting again

      // elements that must be on page before adding new elements
      var idElement = document.querySelector('.story>.story-details>.right-column>.story-attributes>.attribute.story-id>input.clipboard'); // take id from here
      var linkElement = document.querySelector('.story>.story-details>.right-column>.story-attributes>.attribute.attribute-has-toggle.inline-attribute-field>input.permalink'); // take link from here
      var linkBlock = document.querySelector('.story>.story-details>.right-column>.story-attributes>.attribute.attribute-has-toggle.inline-attribute-field'); // add elements after this element

      if(idElement && linkElement && linkBlock){

        // create text for copy
        // @ts-ignore
        var id = idElement.value;
        // @ts-ignore
        var link = linkElement.value;
        var textForCopy = '[ch'+id+']('+link+')';

        // creating elements
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.value = textForCopy;
        newInput.readOnly = true;
        newInput.size = 16;
        newInput.id = 'tampermonkey-added-input-with-text-for-copy';
        newInput.style.backgroundColor='inherit';

        var newText = document.createElement('span');
        newText.innerText = 'Copy this in gitlab merge request!';
        newText.id = 'tampermonkey-added-span-text-copy-this-in-gitlab-mr';
        newText.style.display = 'block';

        var copiedText = document.createElement('span');
        copiedText.innerText = 'Copied';
        copiedText.style.display = 'none';
        copiedText.id = 'tampermonkey-added-span-text-copied';

        var button = document.createElement('input');
        button.type = 'button';
        button.value = 'Copy';
        button.id = 'tampermonkey-added-button-that-will-copy-text';
        button.style.backgroundColor='inherit';

        // creating button logic
        button.addEventListener('click', function (e) {

          e.preventDefault();

          // next 2 lines copy text
          newInput.select();
          document.execCommand('copy');
          if (window.getSelection) { // take away selection
            window.getSelection().removeAllRanges();
          } else { // old IE
            // @ts-ignore
            document.selection.empty();
          }
          copiedText.style.display = 'inline'; // show text after copying to see it worked
          setTimeout(function () { copiedText.style.display = 'none'; }, 1000); // element must disappear after some time for beauty

        });

        // input our elements after linkBlock
        linkBlock.parentNode.insertBefore(copiedText, linkBlock.nextSibling);
        linkBlock.parentNode.insertBefore(button, linkBlock.nextSibling);
        linkBlock.parentNode.insertBefore(newInput, linkBlock.nextSibling);
        linkBlock.parentNode.insertBefore(newText, linkBlock.nextSibling);
      }
    }
  }, 100) // how often checking page

})();