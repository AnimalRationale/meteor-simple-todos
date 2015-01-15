var EVENTS, OFFSCREEN_CLASS, hooks;

OFFSCREEN_CLASS = 'off';

EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

hooks = {
    insertElement: function(node, next) {
        $(node).addClass(OFFSCREEN_CLASS).insertBefore(next);
        return Deps.afterFlush(function() {
            return $(node).removeClass(OFFSCREEN_CLASS);
        });
    },
    removeElement: function(node) {
        return $(node).addClass(OFFSCREEN_CLASS).on(EVENTS, function() {
            return $(node).remove();
        });
    }
};

Template.transition.rendered = function() {
    return this.firstNode.parentNode._uihooks = hooks;
};