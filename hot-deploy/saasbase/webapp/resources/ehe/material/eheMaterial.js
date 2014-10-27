(function() {
angular.module('eheMaterial', ["ng","ngAnimate","ngAria","material.core","material.decorators","material.animations"]);})();

(function() {
  /**
   * Angular Mds initialization function that validates environment
   * requirements.
   */
  angular.module('material.core', [] )
    .run(function validateEnvironment() {

      if (typeof Hammer === 'undefined') {
        throw new Error(
          'ngMaterial requires HammerJS to be preloaded.'
        );
      }

    });

})();

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

(function() {
angular.module('material.core')
.factory('$mdUtil', ['$cacheFactory', function($cacheFactory) {
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  /* for nextUid() function below */
  var uid = ['0','0','0'];

  var Util;
  return Util = {
    now: window.performance ? angular.bind(window.performance, window.performance.now) : Date.now,

    /**
     * Checks if the specified element has an ancestor (ancestor being parent, grandparent, etc)
     * with the given attribute defined. 
     *
     * Also pass in an optional `limit` (levels of ancestry to scan), default 4.
     */
    ancestorHasAttribute: function ancestorHasAttribute(element, attrName, limit) {
      limit = limit || 4;
      var current = element;
      while (limit-- && current.length) {
        if (current[0].hasAttribute && current[0].hasAttribute(attrName)) {
          return true;
        }
        current = current.parent();
      }
      return false;
    },

    /**
     * Checks to see if the element or its parents are disabled.
     * @param element DOM element to start scanning for `disabled` attribute
     * @param limit Number of parent levels that should be scanned; defaults to 4
     * @returns {*} Boolean
     */
    isParentDisabled: function isParentDisabled(element, limit) {
      return Util.ancestorHasAttribute(element, 'disabled', limit);
    },

    /**
     * Checks if two elements have the same parent
     */
    elementIsSibling: function elementIsSibling(element, otherElement) {
      return element.parent().length && 
        (element.parent()[0] === otherElement.parent()[0]);
    },

    /**
     * Converts snake_case to camelCase.
     * @param name Name to normalize
     */
    camelCase: function camelCase(name) {
      return name
        .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
    },

    /**
     * Selects 'n' words from a string
     * for use in an HTML attribute
     */
    stringFromTextBody: function stringFromTextBody(textBody, numWords) {
      var string = textBody.trim();

      if(string.split(/\s+/).length > numWords){
        string = textBody.split(/\s+/).slice(1, (numWords + 1)).join(" ") + '...';
      }
      return string;
    },

    /**
     * Publish the iterator facade to easily support iteration and accessors
     * @see iterator below
     */
    iterator: iterator,

    /**
     * @see cacheFactory below
     */
    cacheFactory: cacheFactory,

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    debounce: function debounce(func, wait, immediate) {
      var timeout;
      return function debounced() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
      };
    },

    // Returns a function that can only be triggered every `delay` milliseconds.
    // In other words, the function will not be called unless it has been more
    // than `delay` milliseconds since the last call.
    throttle: function throttle(func, delay) {
      var recent;
      return function throttled() {
        var context = this;
        var args = arguments;
        var now = Util.now();

        if (!recent || recent - now > delay) {
          func.apply(context, args);
          recent = now;
        }
      };
    },

    /**
     * Wraps an element with a tag
     *
     * @param el element to wrap
     * @param tag tag to wrap it with
     * @param [className] optional class to apply to the wrapper
     * @returns new element
     *
     */
    wrap: function(el, tag, className) {
      if(el.hasOwnProperty(0)) { el = el[0]; }
      var wrapper = document.createElement(tag);
      wrapper.className += className;
      wrapper.appendChild(el.parentNode.replaceChild(wrapper, el));
      return angular.element(wrapper);
    },

    /**
     * nextUid, from angular.js.
     * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
     * characters such as '012ABC'. The reason why we are not using simply a number counter is that
     * the number string gets longer over time, and it can also overflow, where as the nextId
     * will grow much slower, it is a string, and it will never overflow.
     *
     * @returns an unique alpha-numeric string
     */
    nextUid: function() {
      var index = uid.length;
      var digit;

      while(index) {
        index--;
        digit = uid[index].charCodeAt(0);
        if (digit == 57 /*'9'*/) {
          uid[index] = 'A';
          return uid.join('');
        }
        if (digit == 90  /*'Z'*/) {
          uid[index] = '0';
        } else {
          uid[index] = String.fromCharCode(digit + 1);
          return uid.join('');
        }
      }
      uid.unshift('0');
      return uid.join('');
    },

    // Stop watchers and events from firing on a scope without destroying it,
    // by disconnecting it from its parent and its siblings' linked lists.
    disconnectScope: function disconnectScope(scope) {
      if (!scope) return;

      // we can't destroy the root scope or a scope that has been already destroyed
      if (scope.$root === scope) return;
      if (scope.$$destroyed ) return;

      var parent = scope.$parent;
      scope.$$disconnected = true;

      // See Scope.$destroy
      if (parent.$$childHead === scope) parent.$$childHead = scope.$$nextSibling;
      if (parent.$$childTail === scope) parent.$$childTail = scope.$$prevSibling;
      if (scope.$$prevSibling) scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
      if (scope.$$nextSibling) scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;

      scope.$$nextSibling = scope.$$prevSibling = null;

    },

    // Undo the effects of disconnectScope above.
    reconnectScope: function reconnectScope(scope) {
      if (!scope) return;

      // we can't disconnect the root node or scope already disconnected
      if (scope.$root === scope) return;
      if (!scope.$$disconnected) return;

      var child = scope;

      var parent = child.$parent;
      child.$$disconnected = false;
      // See Scope.$new for this logic...
      child.$$prevSibling = parent.$$childTail;
      if (parent.$$childHead) {
        parent.$$childTail.$$nextSibling = child;
        parent.$$childTail = child;
      } else {
        parent.$$childHead = parent.$$childTail = child;
      }
    }
  };

  /*
   * iterator is a list facade to easily support iteration and accessors
   *
   * @param items Array list which this iterator will enumerate
   * @param reloop Boolean enables iterator to consider the list as an endless reloop
   */
  function iterator(items, reloop) {
    var trueFn = function() { return true; };

    reloop = !!reloop;
    var _items = items || [ ];

    // Published API
    return {
      items: getItems,
      count: count,

      inRange: inRange,
      contains: contains,
      indexOf: indexOf,
      itemAt: itemAt,

      findBy: findBy,

      add: add,
      remove: remove,

      first: first,
      last: last,
      next: next,
      previous: previous,

      hasPrevious: hasPrevious,
      hasNext: hasNext

    };

    /*
     * Publish copy of the enumerable set
     * @returns {Array|*}
     */
    function getItems() {
      return [].concat(_items);
    }

    /*
     * Determine length of the list
     * @returns {Array.length|*|number}
     */
    function count() {
      return _items.length;
    }

    /*
     * Is the index specified valid
     * @param index
     * @returns {Array.length|*|number|boolean}
     */
    function inRange(index) {
      return _items.length && ( index > -1 ) && (index < _items.length );
    }

    /*
     * Can the iterator proceed to the next item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns {Array.length|*|number|boolean}
     */
    function hasNext(item) {
      return item ? inRange(indexOf(item) + 1) : false;
    }

    /*
     * Can the iterator proceed to the previous item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns {Array.length|*|number|boolean}
     */
    function hasPrevious(item) {
      return item ? inRange(indexOf(item) - 1) : false;
    }

    /*
     * Get item at specified index/position
     * @param index
     * @returns {*}
     */
    function itemAt(index) {
      return inRange(index) ? _items[index] : null;
    }

    /*
     * Find all elements matching the key/value pair
     * otherwise return null
     *
     * @param val
     * @param key
     *
     * @return array
     */
    function findBy(key, val) {
      return _items.filter(function(item) {
        return item[key] === val;
      });
    }

    /*
     * Add item to list
     * @param item
     * @param index
     * @returns {*}
     */
    function add(item, index) {
      if ( !item ) return -1;

      if (!angular.isNumber(index)) {
        index = _items.length;
      }

      _items.splice(index, 0, item);

      return indexOf(item);
    }

    /*
     * Remove item from list...
     * @param item
     */
    function remove(item) {
      if ( contains(item) ){
        _items.splice(indexOf(item), 1);
      }
    }

    /*
     * Get the zero-based index of the target item
     * @param item
     * @returns {*}
     */
    function indexOf(item) {
      return _items.indexOf(item);
    }

    /*
     * Boolean existence check
     * @param item
     * @returns {boolean}
     */
    function contains(item) {
      return item && (indexOf(item) > -1);
    }

    /*
     * Find the next item. If reloop is true and at the end of the list, it will 
     * go back to the first item. If given ,the `validate` callback will be used
     * determine whether the next item is valid. If not valid, it will try to find the
     * next item again.
     * @param item
     * @param {optional} validate
     * @returns {*}
     */
    function next(item, validate) {
      validate = validate || trueFn;

      if (contains(item)) {
        var index = indexOf(item) + 1,
        found = inRange(index) ? _items[ index ] : (reloop ? first() : null);

        return validate(found) ? found : next(found, validate);
      }

      return null;
    }

    /*
     * Find the previous item. If reloop is true and at the beginning of the list, it will 
     * go back to the last item. If given ,the `validate` callback will be used
     * determine whether the previous item is valid. If not valid, it will try to find the
     * previous item again.
     * @param item
     * @param {optional} validate
     * @returns {*}
     */
    function previous(item, validate) {
      validate = validate || trueFn;

      if (contains(item)) {
        var index = indexOf(item) - 1,
        found = inRange(index) ? _items[ index ] : (reloop ? last() : null);

        return validate(found) ? found : previous(found, validate);
      }

      return null;
    }

    /*
     * Return first item in the list
     * @returns {*}
     */
    function first() {
      return _items.length ? _items[0] : null;
    }

    /*
     * Return last item in the list...
     * @returns {*}
     */
    function last() {
      return _items.length ? _items[_items.length - 1] : null;
    }
  }

  /*
   * Angular's $cacheFactory doesn't have a keys() method,
   * so we add one ourself.
   */
  function cacheFactory(id, options) {
    var cache = $cacheFactory(id, options);

    var keys = {};
    cache._put = cache.put;
    cache.put = function(k,v) {
      keys[k] = true;
      return cache._put(k, v);
    };
    cache._remove = cache.remove;
    cache.remove = function(k) {
      delete keys[k];
      return cache._remove(k);
    };

    cache.keys = function() {
      return Object.keys(keys);
    };

    return cache;
  }
}]);



/* 
 * Since removing jQuery from the demos, some code that uses `element.focus()` is broken.
 *
 * We need to add `element.focus()`, because it's testable unlike `element[0].focus`.
 *
 * TODO(ajoslin): This should be added in a better place later.
 */

angular.element.prototype.focus = angular.element.prototype.focus || function() {
  if (this.length) {
    this[0].focus();
  }
  return this;
};
angular.element.prototype.blur = angular.element.prototype.blur || function() {
  if (this.length) {
    this[0].blur();
  }
  return this;
};
})();

(function() {
angular.module('material.decorators', [])
.config(['$provide', function($provide) {
  $provide.decorator('$$rAF', ['$delegate', '$rootScope', rAFDecorator]);

  function rAFDecorator($$rAF, $rootScope) {

    /**
     * Use this to debounce events that come in often.
     * The debounced function will always use the *last* invocation before the
     * coming frame.
     *
     * For example, window resize events that fire many times a second:
     * If we set to use an raf-debounced callback on window resize, then
     * our callback will only be fired once per frame, with the last resize
     * event that happened before that frame.
     *
     * @param {function} callback function to debounce
     */
    $$rAF.debounce = function(cb) {
      var queueArgs, alreadyQueued, queueCb, context;
      return function debounced() {
        queueArgs = arguments;
        context = this;
        queueCb = cb;
        if (!alreadyQueued) {
          alreadyQueued = true;
          $$rAF(function() {
            queueCb.apply(context, queueArgs);
            alreadyQueued = false;
          });
        }
      };
    };

    return $$rAF;
  }
}]);
})();

(function() {
/*
 * @ngdoc module
 * @name material.components.animate
 * @description
 *
 * Ink and Popup Effects
 */
angular.module('material.animations', ['material.core'])
  .service('$mdEffects', [ 
    '$rootElement', 
    '$$rAF', 
    '$sniffer',
    '$q',
    MdEffects
  ]);

/*
 * @ngdoc service
 * @name $mdEffects
 * @module material.components.animate
 *
 * @description
 * The `$mdEffects` service provides a simple API for various
 * Material Design effects.
 *
 * @returns A `$mdEffects` object with the following properties:
 * - `{function(element,styles,duration)}` `inkBar` - starts ink bar
 * animation on specified DOM element
 * - `{function(element,parentElement,clickElement)}` `popIn` - animated show of element overlayed on parent element
 * - `{function(element,parentElement)}` `popOut` - animated close of popup overlay
 *
 */
function MdEffects($rootElement, $$rAF, $sniffer, $q) {

  var webkit = /webkit/i.test($sniffer.vendorPrefix);
  function vendorProperty(name) {
    return webkit ? 
      ('webkit' + name.charAt(0).toUpperCase() + name.substring(1)) :
      name;
  }

  var self;
  // Publish API for effects...
  return self = {
    popIn: popIn,

    /* Constants */
    TRANSITIONEND_EVENT: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
    ANIMATIONEND_EVENT: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),

    TRANSFORM: vendorProperty('transform'),
    TRANSITION: vendorProperty('transition'),
    TRANSITION_DURATION: vendorProperty('transitionDuration'),
    ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
    ANIMATION_DURATION: vendorProperty('animationDuration'),
    ANIMATION_NAME: vendorProperty('animationName'),
    ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
    ANIMATION_DIRECTION: vendorProperty('animationDirection')
  };

  // **********************************************************
  // API Methods
  // **********************************************************
  function popIn(element, parentElement, clickElement) {
    var deferred = $q.defer();
    parentElement.append(element);

    var startPos;
    if (clickElement) {
      var clickRect = clickElement[0].getBoundingClientRect();
      startPos = translateString(
        clickRect.left - element[0].offsetWidth,
        clickRect.top - element[0].offsetHeight, 
        0
      ) + ' scale(0.2)';
    } else {
      startPos = 'translate3d(0,100%,0) scale(0.5)';
    }

    element
      .css(self.TRANSFORM, startPos)
      .css('opacity', 0);
    
    $$rAF(function() {
      $$rAF(function() {
        element
          .addClass('active')
          .css(self.TRANSFORM, '')
          .css('opacity', '')
          .on(self.TRANSITIONEND_EVENT, finished);
      });
    });

    function finished(ev) {
      //Make sure this transitionend didn't bubble up from a child
      if (ev.target === element[0]) {
        element.off(self.TRANSITIONEND_EVENT, finished);
        deferred.resolve();
      }
    }

    return deferred.promise;
  }

  // **********************************************************
  // Utility Methods
  // **********************************************************


  function translateString(x, y, z) {
    return 'translate3d(' + Math.floor(x) + 'px,' + Math.floor(y) + 'px,' + Math.floor(z) + 'px)';
  }

}

})();

(function() {

angular.module('material.animations')

.directive('inkRipple', [
  '$mdInkRipple',
  InkRippleDirective
])

.factory('$mdInkRipple', [
  '$window',
  '$$rAF',
  '$mdEffects',
  '$timeout',
  '$mdUtil',
  InkRippleService
]);

function InkRippleDirective($mdInkRipple) {
  return function(scope, element, attr) {
    if (attr.inkRipple == 'checkbox') {
      $mdInkRipple.attachCheckboxBehavior(element);
    } else {
      $mdInkRipple.attachButtonBehavior(element);
    }
  };
}

function InkRippleService($window, $$rAF, $mdEffects, $timeout, $mdUtil) {

  return {
    attachButtonBehavior: attachButtonBehavior,
    attachCheckboxBehavior: attachCheckboxBehavior,
    attach: attach
  };

  function attachButtonBehavior(element) {
    return attach(element, {
      mousedown: true,
      center: false,
      animationDuration: 350,
      mousedownPauseTime: 175,
      animationName: 'inkRippleButton',
      animationTimingFunction: 'linear'
    });
  }

  function attachCheckboxBehavior(element) {
    return attach(element, {
      mousedown: true,
      center: true,
      animationDuration: 300,
      mousedownPauseTime: 180,
      animationName: 'inkRippleCheckbox',
      animationTimingFunction: 'linear'
    });
  }

  function attach(element, options) {
    // Parent element with noink attr? Abort.
    if (element.controller('noink')) return angular.noop;
    var contentParent = element.controller('mdContent');

    options = angular.extend({
      mousedown: true,
      hover: true,
      focus: true,
      center: false,
      animationDuration: 300,
      mousedownPauseTime: 150,
      animationName: '',
      animationTimingFunction: 'linear'
    }, options || {});

    var rippleContainer;
    var node = element[0];
    var hammertime = new Hammer(node);

    if (options.mousedown) {
      hammertime.on('hammer.input', onInput);
    }

    // Publish self-detach method if desired...
    return function detach() {
      hammertime.destroy();
      if (rippleContainer) {
        rippleContainer.remove();
      }
    };

    function rippleIsAllowed() {
      return !element[0].hasAttribute('disabled');
    }

    function createRipple(left, top, positionsAreAbsolute) {

      var rippleEl = angular.element('<div class="md-ripple">')
            .css($mdEffects.ANIMATION_DURATION, options.animationDuration + 'ms')
            .css($mdEffects.ANIMATION_NAME, options.animationName)
            .css($mdEffects.ANIMATION_TIMING, options.animationTimingFunction)
            .on($mdEffects.ANIMATIONEND_EVENT, function() {
              rippleEl.remove();
            });

      if (!rippleContainer) {
        rippleContainer = angular.element('<div class="md-ripple-container">');
        element.append(rippleContainer);
      }
      rippleContainer.append(rippleEl);

      var containerWidth = rippleContainer.prop('offsetWidth');

      if (options.center) {
        left = containerWidth / 2;
        top = rippleContainer.prop('offsetHeight') / 2;
      } else if (positionsAreAbsolute) {
        var elementRect = node.getBoundingClientRect();
        left -= elementRect.left;
        top -= elementRect.top;
      }

      if (contentParent) {
        top += contentParent.$element.prop('scrollTop');
      }

      var css = {
        'background-color': $window.getComputedStyle(rippleEl[0]).color || 
          $window.getComputedStyle(node).color,
        'border-radius': (containerWidth / 2) + 'px',

        left: (left - containerWidth / 2) + 'px',
        width: containerWidth + 'px',

        top: (top - containerWidth / 2) + 'px',
        height: containerWidth + 'px'
      };
      css[$mdEffects.ANIMATION_DURATION] = options.fadeoutDuration + 'ms';
      rippleEl.css(css);

      return rippleEl;
    }

    var pauseTimeout;
    var rippleEl;
    function onInput(ev) {
      if (ev.eventType === Hammer.INPUT_START && ev.isFirst && rippleIsAllowed()) {

        rippleEl = createRipple(ev.center.x, ev.center.y, true);
        pauseTimeout = $timeout(function() {
          rippleEl && rippleEl.css($mdEffects.ANIMATION_PLAY_STATE, 'paused');
        }, options.mousedownPauseTime, false);

        rippleEl.on('$destroy', function() {
          rippleEl = null;
        });

      } else if (ev.eventType === Hammer.INPUT_END && ev.isFinal) {
        $timeout.cancel(pauseTimeout);
        rippleEl && rippleEl.css($mdEffects.ANIMATION_PLAY_STATE, '');
      }
    }

  }

}
})();

(function() {
angular.module('material.animations')

/**
 * noink/nobar/nostretch directive: make any element that has one of
 * these attributes be given a controller, so that other directives can 
 * `require:` these and see if there is a `no<xxx>` parent attribute.
 *
 * @usage
 * <hljs lang="html">
 * <parent noink>
 *   <child detect-no>
 *   </child>
 * </parent>
 * </hljs>
 *
 * <hljs lang="js">
 * myApp.directive('detectNo', function() {
 *   return {
 *     require: ['^?noink', ^?nobar'],
 *     link: function(scope, element, attr, ctrls) {
 *       var noinkCtrl = ctrls[0];
 *       var nobarCtrl = ctrls[1];
 *       if (noInkCtrl) {
 *         alert("the noink flag has been specified on an ancestor!");
 *       }
 *       if (nobarCtrl) {
 *         alert("the nobar flag has been specified on an ancestor!");
 *       }
 *     }
 *   };
 * });
 * </hljs>
 */
.directive({
  noink: attrNoDirective(),
  nobar: attrNoDirective(),
  nostretch: attrNoDirective()
});

function attrNoDirective() {
  return function() {
    return {
      controller: angular.noop
    };
  };
}
})();


/**
 * backdrop TOADD
 */


/**
 * bottomSheet TOADD
 */



(function() {
/**
 * @ngdoc module
 * @name material.components.button
 * @description
 *
 * Button
 */
angular.module('material.components.button', [
  'material.core',
  'material.animations',
  'material.services.aria',
  'material.services.theming'
])
  .directive('mdButton', [
    'ngHrefDirective',
    '$mdInkRipple',
    '$mdAria',
    '$mdUtil',
    '$mdTheming',
    MdButtonDirective
  ]);

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
 * @param {string=} ng-href Optional attribute to support both ARIA and link navigation
 * @param {string=} href Optional attribute to support both ARIA and link navigation
 * @param {string=} ariaLabel Publish the button label used by screen-readers for accessibility. Defaults to the button's text.
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
function MdButtonDirective(ngHrefDirectives, $mdInkRipple, $mdAria, $mdUtil, $mdTheming ) {
  var ngHrefDirective = ngHrefDirectives[0];

  return {
    restrict: 'E',
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

      angular.forEach(attributesToCopy, function(name) {
        var camelCaseName = $mdUtil.camelCase(name);
        if (attr.hasOwnProperty(camelCaseName)) {
          innerElement.attr(name, attr[camelCaseName]);
        }
      });

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
        $mdTheming(element);
        $mdAria.expect(element, 'aria-label', element.text());
        $mdInkRipple.attachButtonBehavior(element);
      };
    }
  };

}
})();



/**
 * card TOADD
 */



(function() {
/**
 * @ngdoc module
 * @name material.components.checkbox
 * @description Checkbox module!
 */
angular.module('material.components.checkbox', [
  'material.core',
  'material.animations',
  'material.services.theming',
  'material.services.aria'
])
  .directive('mdCheckbox', [ 
    'inputDirective',
    '$mdInkRipple',
    '$mdAria',
    '$mdConstant',
    '$mdTheming',
    MdCheckboxDirective
  ]);

/**
 * @ngdoc directive
 * @name mdCheckbox
 * @module material.components.checkbox
 * @restrict E
 *
 * @description
 * The checkbox directive is used like the normal [angular checkbox](https://docs.angularjs.org/api/ng/input/input%5Bcheckbox%5D).
 *
 * @param {string} ngModel Assignable angular expression to data-bind to.
 * @param {string=} name Property name of the form under which the control is published.
 * @param {expression=} ngTrueValue The value to which the expression should be set when selected.
 * @param {expression=} ngFalseValue The value to which the expression should be set when not selected.
 * @param {string=} ngChange Angular expression to be executed when input changes due to user interaction with the input element.
 * @param {boolean=} noink Use of attribute indicates use of ripple ink effects
 * @param {boolean=} disabled Use of attribute indicates the switch is disabled: no ink effects and not selectable
 * @param {string=} ariaLabel Publish the button label used by screen-readers for accessibility. Defaults to the checkbox's text.
 *
 * @usage
 * <hljs lang="html">
 * <md-checkbox ng-model="isChecked" aria-label="Finished?">
 *   Finished ?
 * </md-checkbox>
 *
 * <md-checkbox noink ng-model="hasInk" aria-label="No Ink Effects">
 *   No Ink Effects
 * </md-checkbox>
 *
 * <md-checkbox disabled ng-model="isDisabled" aria-label="Disabled">
 *   Disabled
 * </md-checkbox>
 *
 * </hljs>
 *
 */
function MdCheckboxDirective(inputDirectives, $mdInkRipple, $mdAria, $mdConstant, $mdTheming) {
  var inputDirective = inputDirectives[0];

  var CHECKED_CSS = 'md-checked';

  return {
    restrict: 'E',
    transclude: true,
    require: '?ngModel',
    template: 
      '<div class="md-container" ink-ripple="checkbox">' +
        '<div class="md-icon"></div>' +
      '</div>' +
      '<div ng-transclude class="md-label"></div>',
    compile: compile
  };

  // **********************************************************
  // Private Methods
  // **********************************************************

  function compile (tElement, tAttrs) {

    tAttrs.type = 'checkbox';
    tAttrs.tabIndex = 0;
    tElement.attr('role', tAttrs.type);

    return function postLink(scope, element, attr, ngModelCtrl) {
      var checked = false;
      $mdTheming(element);

      // Create a mock ngModel if the user doesn't provide one
      ngModelCtrl = ngModelCtrl || {
        $setViewValue: function(value) {
          this.$viewValue = value;
        },
        $parsers: [],
        $formatters: []
      };

      $mdAria.expect(tElement, 'aria-label', true);

      // Reuse the original input[type=checkbox] directive from Angular core.
      // This is a bit hacky as we need our own event listener and own render
      // function.
      inputDirective.link.pre(scope, {
        on: angular.noop,
        0: {}
      }, attr, [ngModelCtrl]);

      element.on('click', listener);
      element.on('keypress', keypressHandler);
      ngModelCtrl.$render = render;

      function keypressHandler(ev) {
        if(ev.which === $mdConstant.KEY_CODE.SPACE) {
          ev.preventDefault();
          listener(ev);
        }
      }
      function listener(ev) {
        if (element[0].hasAttribute('disabled')) return;

        scope.$apply(function() {
          checked = !checked;
          ngModelCtrl.$setViewValue(checked, ev && ev.type);
          ngModelCtrl.$render();
        });
      }

      function render() {
        checked = ngModelCtrl.$viewValue;
        if(checked) {
          element.addClass(CHECKED_CSS);
        } else {
          element.removeClass(CHECKED_CSS);
        }
      }
    };
  }
}


})();





(function() {
/**
 * @ngdoc module
 * @name material.components.content
 *
 * @description
 * Scrollable content
 */
angular.module('material.components.content', [
  'material.services.theming',
  'material.services.registry'
])
  .directive('mdContent', [
    '$mdTheming',
    mdContentDirective
  ]);

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
function mdContentDirective($mdTheming) {
  return {
    restrict: 'E',
    controller: ['$scope', '$element', ContentController],
    link: function($scope, $element, $attr) {
      $mdTheming($element);
      $scope.$broadcast('$mdContentLoaded', $element);
    }
  };

  function ContentController($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  }
}
})();


/**
 * dialog TOADD
 */




(function() {
/**
 * @ngdoc module
 * @name material.components.divider
 * @description Divider module!
 */
angular.module('material.components.divider', [
  'material.animations',
  'material.services.aria',
  'material.services.theming'
])
.directive('mdDivider', [
  '$mdTheming',
  MdDividerDirective
]);

function MdDividerController(){}

/**
 * @ngdoc directive
 * @name mdDivider
 * @module material.components.divider
 * @restrict E
 *
 * @description
 * Dividers group and separate content within lists and page layouts using strong visual and spatial distinctions. This divider is a thin rule, lightweight enough to not distract the user from content.
 *
 * @param {boolean=} inset Add this attribute to activate the inset divider style.
 * @usage
 * <hljs lang="html">
 * <md-divider></md-divider>
 *
 * <md-divider inset></md-divider>
 * </hljs>
 *
 */
function MdDividerDirective($mdTheming) {
  return {
    restrict: 'E',
    link: $mdTheming,
    controller: [MdDividerController]
  };
}
})();



(function() {
/*
 * @ngdoc module
 * @name material.components.icon
 * @description
 * Icon
 */
angular.module('material.components.icon', [])
  .directive('mdIcon', [
    mdIconDirective
  ]);

/*
 * @ngdoc directive
 * @name mdIcon
 * @module material.components.icon
 *
 * @restrict E
 *
 * @description
 * The `<md-icon>` directive is an element useful for SVG icons
 *
 * @usage
 * <hljs lang="html">
 *  <md-icon icon="/img/icons/ic_access_time_24px.svg">
 *  </md-icon>
 * </hljs>
 *
 */
function mdIconDirective() {
  return {
    restrict: 'E',
    template: '<object class="md-icon"></object>',
    compile: function(element, attr) {
      var object = angular.element(element[0].children[0]);
      if(angular.isDefined(attr.icon)) {
        object.attr('data', attr.icon);
      }
    }
  };
}
})();


/**
 * list, item TOADD
 */


/**
 * progressCircular TOADD
 */


/**
 * progressLinear TOADD
 */



(function() {

/**
 * @ngdoc module
 * @name material.components.radioButton
 * @description radioButton module!
 */
angular.module('material.components.radioButton', [
  'material.core',
  'material.animations',
  'material.services.aria',
  'material.services.theming'
])
  .directive('mdRadioGroup', [
    '$mdUtil',
    '$mdConstant',
    '$mdTheming',
    mdRadioGroupDirective
  ])
  .directive('mdRadioButton', [
    '$mdAria',
    '$mdUtil',
    '$mdTheming',
    mdRadioButtonDirective
  ]);

/**
 * @ngdoc directive
 * @module material.components.radioButton
 * @name mdRadioGroup
 *
 * @restrict E
 *
 * @description
 * The `<md-radio-group>` directive identifies a grouping
 * container for the 1..n grouped radio buttons; specified using nested
 * `<md-radio-button>` tags.
 *
 * @param {string} ngModel Assignable angular expression to data-bind to.
 * @param {boolean=} noink Use of attribute indicates flag to disable ink ripple effects.
 *
 * @usage
 * <hljs lang="html">
 * <md-radio-group ng-model="selected">
 *
 *   <md-radio-button
 *        ng-repeat="d in colorOptions"
 *        ng-value="d.value" aria-label="{{ d.label }}">
 *
 *          {{ d.label }}
 *
 *   </md-radio-button>
 *
 * </md-radio-group>
 * </hljs>
 *
 */
function mdRadioGroupDirective($mdUtil, $mdConstant, $mdTheming) {
  RadioGroupController.prototype = createRadioGroupControllerProto();

  return {
    restrict: 'E',
    controller: ['$element', RadioGroupController],
    require: ['mdRadioGroup', '?ngModel'],
    link: link
  };

  function link(scope, element, attr, ctrls) {
    $mdTheming(element);
    var rgCtrl = ctrls[0],
      ngModelCtrl = ctrls[1] || {
        $setViewValue: angular.noop
      };

    function keydownListener(ev) {
      if (ev.which === $mdConstant.KEY_CODE.LEFT_ARROW) {
        ev.preventDefault();
        rgCtrl.selectPrevious();
      }
      else if (ev.which === $mdConstant.KEY_CODE.RIGHT_ARROW) {
        ev.preventDefault();
        rgCtrl.selectNext();
      }
    }

    rgCtrl.init(ngModelCtrl);

    element.attr({
      'role': 'radiogroup',
      'tabIndex': '0'
    })
    .on('keydown', keydownListener);
  }

  function RadioGroupController($element) {
    this._radioButtonRenderFns = [];
    this.$element = $element;
  }

  function createRadioGroupControllerProto() {
    return {
      init: function(ngModelCtrl) {
        this._ngModelCtrl = ngModelCtrl;
        this._ngModelCtrl.$render = angular.bind(this, this.render);
      },
      add: function(rbRender) {
        this._radioButtonRenderFns.push(rbRender);
      },
      remove: function(rbRender) {
        var index = this._radioButtonRenderFns.indexOf(rbRender);
        if (index !== -1) {
          this._radioButtonRenderFns.splice(index, 1);
        }
      },
      render: function() {
        this._radioButtonRenderFns.forEach(function(rbRender) {
          rbRender();
        });
      },
      setViewValue: function(value, eventType) {
        this._ngModelCtrl.$setViewValue(value, eventType);
        // update the other radio buttons as well
        this.render();
      },
      getViewValue: function() {
        return this._ngModelCtrl.$viewValue;
      },
      selectNext: function() {
        return changeSelectedButton(this.$element, 1);
      },
      selectPrevious : function() {
        return changeSelectedButton(this.$element, -1);
      },
      setActiveDescendant: function (radioId) {
        this.$element.attr('aria-activedescendant', radioId);
      }
    };
  }
  /**
   * Change the radio group's selected button by a given increment.
   * If no button is selected, select the first button.
   */
  function changeSelectedButton(parent, increment) {
    // Coerce all child radio buttons into an array, then wrap then in an iterator
    var buttons = $mdUtil.iterator(
      Array.prototype.slice.call(parent[0].querySelectorAll('md-radio-button')),
      true
    );

    if (buttons.count()) {
      var selected = parent[0].querySelector('md-radio-button.md-checked');
      var target = buttons[increment < 0 ? 'previous' : 'next'](selected) || buttons.first();
      // Activate radioButton's click listener (triggerHandler won't create a real click event)
      angular.element(target).triggerHandler('click');
    }
  }

}

/**
 * @ngdoc directive
 * @module material.components.radioButton
 * @name mdRadioButton
 *
 * @restrict E
 *
 * @description
 * The `<md-radio-button>`directive is the child directive required to be used within `<md-radioo-group>` elements.
 *
 * While similar to the `<input type="radio" ng-model="" value="">` directive,
 * the `<md-radio-button>` directive provides ink effects, ARIA support, and
 * supports use within named radio groups.
 *
 * @param {string} ngModel Assignable angular expression to data-bind to.
 * @param {string=} ngChange Angular expression to be executed when input changes due to user
 *    interaction with the input element.
 * @param {string} ngValue Angular expression which sets the value to which the expression should
 *    be set when selected.*
 * @param {string} value The value to which the expression should be set when selected.
 * @param {string=} name Property name of the form under which the control is published.
 * @param {string=} ariaLabel Publish the button label used by screen-readers for accessibility. Defaults to the radio button's text.
 *
 * @usage
 * <hljs lang="html">
 *
 * <md-radio-button value="1" aria-label="Label 1">
 *   Label 1
 * </md-radio-button>
 *
 * <md-radio-button ng-model="color" ng-value="specialValue" aria-label="Green">
 *   Green
 * </md-radio-button>
 *
 * </hljs>
 *
 */
function mdRadioButtonDirective($mdAria, $mdUtil, $mdTheming) {

  var CHECKED_CSS = 'md-checked';

  return {
    restrict: 'E',
    require: '^mdRadioGroup',
    transclude: true,
    template: '<div class="md-container" ink-ripple="checkbox">' +
                '<div class="md-off"></div>' +
                '<div class="md-on"></div>' +
              '</div>' +
              '<div ng-transclude class="md-label"></div>',
    link: link
  };

  function link(scope, element, attr, rgCtrl) {
    var lastChecked;

    $mdTheming(element);
    configureAria(element, scope);

    rgCtrl.add(render);
    attr.$observe('value', render);

    element
      .on('click', listener)
      .on('$destroy', function() {
        rgCtrl.remove(render);
      });

    function listener(ev) {
      if (element[0].hasAttribute('disabled')) return;

      scope.$apply(function() {
        rgCtrl.setViewValue(attr.value, ev && ev.type);
      });
    }

    function render() {
      var checked = (rgCtrl.getViewValue() === attr.value);
      if (checked === lastChecked) {
        return;
      }
      lastChecked = checked;
      element.attr('aria-checked', checked);
      if (checked) {
        element.addClass(CHECKED_CSS);
        rgCtrl.setActiveDescendant(element.attr('id'));
      } else {
        element.removeClass(CHECKED_CSS);
      }
    }
    /**
     * Inject ARIA-specific attributes appropriate for each radio button
     */
    function configureAria( element, scope ){
      scope.ariaId = buildAriaID();

      element.attr({
        'id' :  scope.ariaId,
        'role' : 'radio',
        'aria-checked' : 'false'
      });

      $mdAria.expect(element, 'aria-label', true);

      /**
       * Build a unique ID for each radio button that will be used with aria-activedescendant.
       * Preserve existing ID if already specified.
       * @returns {*|string}
       */
      function buildAriaID() {
        return attr.id || ( 'radio' + "_" + $mdUtil.nextUid() );
      }
    }
  }
}


})();



/**
 * sidenav TOADD
 */



/**
 * slider TOADD
 */


/**
 * sticky TOADD
 */

/**
 * subheader TOADD
 */

/**
 * swipe TOADD
 */

/**
 * switch TOADD
 */

/**
 * tabs TOADD
 */


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













