;(function ($) {
  
  /**
   * jQuery.passwordPolicy
   *
   * https://github.com/remy/password-policy
   *
   * A Javascript password validator
   *
   * TODO
   *     A nice way to store information between completeCallback
   *     A more full test suite
   *     A better way of adding tests
   */
  $.fn.passwordPolicy = function (userConfig) {
    
    // Ensure config is an object
    if( ! userConfig ) { userConfig = {}; }
    
    // Maintain a reference to the element
    var elem = this;
    
    var runTest = function (test) {
      // Run the test's callback, passing the current value of
      // the element and another callback to be run when the
      // test is complete
      var result = test.cb(elem.val());
      config.testCb(test, result);
    };

    // Callback run for before tests are run
    var resetCallback = function (ev) {
      $('.output').empty();
    };

    // Callback to passed the output of the testCb
    var completeCallback = function () {};
    
    // Callback run for each test, allowing the way the results
    // are outputted to be customised by the user
    var testCallback = function (rule, result) {
      // Build an li to contain the test results
      var resultElem = $('<li/>', {
        'class': 'result ' + (result ? 'pass' : 'fail'),
        'text': rule.description || ''
      });
      
      // Add a strong with the test name
      $('<strong/>', {
        'text': rule.name || 'Test',
        'class': 'test-name'
      }).prependTo(resultElem);

      // Add it to the output ul
      $('.output').append(resultElem);
    };
    
    // Default plugin configuration
    //
    // event          : the event that should trigger validation
    // resetCb        : function to be run before tests start (passed the event)
    // completeCb     : function to passed the output of the testCb
    // testCb         : function to be run after test completion
    // tests          : array of test objects
    //    name        : name / short description
    //    description : longer description of what the test does (optional)
    //    cb          : callback for the test itself
    //                    cb is passed the string value of the element being tested
    //
    // I don't like the test object syntax, would be better to have some kind of
    // register(function () { ... }) method to allow the suite to be extended from
    // outside the userConfig
    var config = {
      trigger: 'keyup',
      resetCb: resetCallback,
      testCb: testCallback,
      completeCb: completeCallback,
      tests: []
    };
    
    // Merge the defaults with the user supplied config
    $.extend(true, config, userConfig);
    
    // Get to work
    $('body').on(config.trigger, elem, function (ev) {
     
      // Fire the reset callback
      config.resetCb(ev);

      // Test against default/supplied rules
      var i = 0, l = config.tests.length;
      for( ; i < l; i++ ) {
        // Run it... and profit!
        config.completeCb(runTest(config.tests[i]));
      }
      
    });
  
  };
    
}(jQuery));