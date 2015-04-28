window.onload = function () {
    var controller = new Controller(new View(), new Api());

    controller.refresh_ui();

    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];

    $("#recipient").autocomplete({
        source: function (request, response) {
            var search_term = request.term;
            var api = new Api();
            api.get_all_users(search_term, response);
        }
    });
};