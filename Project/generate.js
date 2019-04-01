//*THIS CODE WAS TAKEN FROM THE HTML FILE*//

$(document).ready(function(){
                $(".stringPosition ").hide();
                $('.submit').click(function(){
                    let v = $('.password').val();
                    if (v.length > 0) {
                        $(".box").hide();
                        $.ajax({
                            url: '/search/' + v + '',
                            data: $('.password').text(),
                            type: 'POST',
                            beforeSend : function(){
                                $('.middle').append('<div class="loader"></div>'); 
                            },
                            success: function(response) {
                                let r = JSON.stringify(response);
                                r = r.replace("[","").replace("]","");
                                list = r.split(",");
                                
                                $(".stringPosition ").fadeIn();
                                
                                var i;
                                for (i = 0; i < list.length; i++)
                                {
                                    $(".boxSearch").append("<iframe id='player' src=" + list[i].replace("watch?v=", "embed/") + " class=\"player\" width=\"560\" height=\"315\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
                                    $(".boxSearch").append('<div class="devider"></div>');
                                }
                                $(".boxSearch").css({"margin-top": "4200px"});
                                $(".loader").hide();
                            },
                            complete : function() {
                                
                            },
                            error: function(error) {
                            console.log(error);
                            }
                        });
                        //$('.box').hide();
                    }
                    else {
                        //$('.box').show();
                        alert('You are bad');
                    }
                });
            });
