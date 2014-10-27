(function() {
angular.module('material.core')
.constant('$mdConstant', {
  KEY_CODE: {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    LEFT_ARROW : 37,
    UP_ARROW : 38,
    RIGHT_ARROW : 39,
    DOWN_ARROW : 40
  }
});
})();




var module = angular.module('ehe.common.directives', []);



/**
 * layout
 */



/**
 * @ngdoc directive
 * @name eheToolbar
 * @module material.components.toolbar
 * @restrict E
 * @description
 * `ehe-toolbar` is used to place a toolbar in your app.
 *
 * Toolbars are usually used above a content area to display the title of the
 * current page, and show relevant action buttons for that page.
 *
 * You can change the height of the toolbar by adding either the
 * `ehe-medium-tall` or `ehe-tall` class to the toolbar.
 *
 * @usage
 * <hljs lang="html">
 * <div layout="vertical" layout-fill>
 *   <ehe-toolbar>
 *
 *     <div class="ehe-toolbar-tools">
 *       <span>My App's Title</span>
 *
 *       <!-- fill up the space between left and right area -->
 *       <span flex></span>
 *
 *       <ehe-button>
 *         Right Bar Button
 *       </ehe-button>
 *     </div>
 *
 *   </ehe-toolbar>
 *   <ehe-content>
 *     Hello!
 *   </ehe-content>
 * </div>
 * </hljs>
 *
 * @param {boolean=} scrollShrink Whether the header should shrink away as 
 * the user scrolls down, and reveal itself as the user scrolls up. 
 * Note: for scrollShrink to work, the toolbar must be a sibling of a 
 * `md-content` element, placed before it. See the scroll shrink demo.
 *
 *
 * @param {number=} shrinkSpeedFactor How much to change the speed of the toolbar's
 * shrinking by. For example, if 0.25 is given then the toolbar will shrink
 * at one fourth the rate at which the user scrolls down. Default 0.5.
 */ 
module.directive('eheToolbar', function() {
    return {
        restrict : 'E',
        link : function(scope, element, attr) {
        	
        	

        }
    };
});



/**
 * @ngdoc directive
 * @name mdContent
 * @module material.components.content
 *
 * @restrict E
 *
 * @description
 * The `<md-content>` directive is a container element useful for scrollable content
 *
 * @usage
 * <hljs lang="html">
 *  <md-content class="md-content-padding">
 *      Lorem ipsum dolor sit amet, ne quod novum mei.
 *  </md-content>
 * </hljs>
 *
 */
module.directive('eheContent', function() {
    return {
        restrict : 'E',
        link : function(scope, element, attr) {
        	
        	

        }
    };
});



/**
 * form controls
 * 
 */

//input

//textarea

//radio

//checkbox



/**
 * @ngdoc directive
 * @name mdButton
 * @module material.components.button
 *
 * @restrict E
 *
 * @description
 * `<md-button>` is a button directive with optional ink ripples (default enabled).
 *
 * @param {boolean=} noink If present, disable ripple ink effects.
 * @param {boolean=} disabled If present, disable tab selection.
 * @param {string=} type Optional attribute to specific button types (useful for forms); such as 'submit', etc.
 * @param ----{string=} ng-href Optional attribute to support both ARIA and link navigation
 * @param ----{string=} href Optional attribute to support both ARIA and link navigation
 * @param ----{string=} ariaLabel Publish the button label used by screen-readers for accessibility. Defaults to the button's text.
 *
 * @usage
 * <hljs lang="html">
 *  <md-button>Button</md-button>
 *  <br/>
 *  <md-button noink class="md-button-colored">
 *    Button (noInk)
 *  </md-button>
 *  <br/>
 *  <md-button disabled class="md-button-colored">
 *    Colored (disabled)
 *  </md-button>
 * </hljs>
 */
module.directive('mdButton', function() {
	
//	ngHrefDirectives, $mdInkRipple, $mdAria, $mdUtil, $mdTheming
	
//	var ngHrefDirective = ngHrefDirectives[0];
	
    return {
        restrict : 'E',
        compile: function(element, attr) {
	        var innerElement;
	        var attributesToCopy;
	
	
	        // Add an inner anchor if the element has a `href` or `ngHref` attribute,
	        // so this element can be clicked like a normal `<a>`.
	        if (attr.ngHref || attr.href) {
	          innerElement = angular.element('<a>');
	          attributesToCopy = ['ng-href', 'href', 'rel', 'target'];
	        // Otherwise, just add an inner button element (for form submission etc)
	        } else {
	          innerElement = angular.element('<button>');
	          attributesToCopy = ['type', 'disabled', 'ng-disabled', 'form'];
	        }
	
//	        angular.forEach(attributesToCopy, function(name) {
//	          var camelCaseName = $mdUtil.camelCase(name);
//	          if (attr.hasOwnProperty(camelCaseName)) {
//	            innerElement.attr(name, attr[camelCaseName]);
//	          }
//	        });
	
	        innerElement
	          .addClass('md-button-inner')
	          .append(element.contents())
	          // Since we're always passing focus to the inner element,
	          // add a focus class to the outer element so we can still style
	          // it with focus.
	          .on('focus', function() {
	            element.addClass('focus');
	          })
	          .on('blur', function() {
	            element.removeClass('focus');
	          });
	
	        element.
	          append(innerElement)
	          .attr('tabIndex', -1)
	          //Always pass focus to innerElement
	          .on('focus', function() {
	            innerElement.focus();
	          });
	
	        return function postLink(scope, element, attr) {
//	          $mdTheming(element);
//	          $mdAria.expect(element, 'aria-label', element.text());
//	          $mdInkRipple.attachButtonBehavior(element);
	        };
        }
    };
});



/**
 * divider
 */

/**
 * whiteframe
 */


















/**
 * tree
 */













