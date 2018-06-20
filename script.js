var animals = ["Bear", "Boar", "Badger", "Bandicoot"];
            
            function buttonInitializer() {
                $("#buttons-view").empty();
                for (var i = 0; i < animals.length; i++) {
                    var a = $("<button>")
                        a.addClass("animal");
                        a.attr("data-name", animals[i]);
                        a.text(animals[i]);
                        $("#buttons-view").append(a);
                    }
                }
                
                buttonInitializer();
                
                $("#add-animal").on("click", function(event) {
                    event.preventDefault();
                    var animal = $("#animal-input").val().trim();
                    console.log(animal)
                    animals.push(animal);
                    buttonInitializer();       
                });
                
                function iCastSummonCreatureX(){
                    console.log(this);
                    var animal = $(this).attr("data-name");
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
                    $.ajax({
                        url: queryURL,
                        method: "GET" })
                        .then(function(response) {
                            console.log(response)
                            for (var i = 0; i < 10; i++) {
                                var div = $("<div>");
                                    var p = $("<p>");
                                        var img = $("<img>");
                                        $(img).attr("src", response.data[i].images.fixed_height_still.url).addClass("gif")
                                        $(img).attr("data-state", "still").attr("data-animate", response.data[i].images.fixed_height.url).attr("data-still", response.data[i].images.fixed_height_still.url);
                                        $(p).append(response.data[i].rating);
                                        $(div).append(img).append(p);
                                        $("#animals-view").prepend(div);
                                    }
                                });
                            }
                            
                            function stopAndGo(){
                                var state = $(this).attr("data-state");
                                if (state == "still") {
                                    $(this).attr("src", $(this).attr("data-animate"))
                                    $(this).attr("data-state", "animate")
                                }
                                
                                else if (state == "animate") {
                                    $(this).attr("src", $(this).attr("data-still"))
                                    $(this).attr("data-state", "still")
                                }
                            }
                            
                            
                            $(document).on("click", ".animal", iCastSummonCreatureX) 
                            $(document).on("click", ".gif", stopAndGo)
                            
                            