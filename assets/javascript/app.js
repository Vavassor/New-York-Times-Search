var apiKey = "7dc1ae6bf3f64190b3f6a825d0cb9d8e";

$(document).ready(function() {

  $("#search-form").on("submit", function(event) {
    event.preventDefault();

    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

    $.each($(".form-control"), function() {
      var name = $(this).attr("data-name");

      var key = "";
      if (name === "search") {
        key = "q";
        queryUrl += "&" + key + "=" + $(this).val();
      } else if (name === "number-of-records") {

      } else if (name === "start-year") {
        key = "begin_date";
        // queryUrl += "&" + key + "=" + input.val();
      } else if (name === "end-year") {
        key = "end_date";
        // queryUrl += "&" + key + "=" + input.val();
      }
    });

    console.log("Query URL:" + queryUrl);

    $.ajax({
      method: "GET",
      url: queryUrl,
    })
    .then(function(response) {
      var docs = response.response.docs;

      $(".article-dump").empty();

      for (var i = 0; i < docs.length; i++) {
        var div = $("<div>");

        var title = $("<h2>");
        title.text(docs[i].headline.main);
        div.append(title);

        $(".article-dump").append(div);
      }
    });
  });

});
