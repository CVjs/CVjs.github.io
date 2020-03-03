var eventtemplate = "<div class='well'><div class='pull-right' style='padding:10px;'><h3>{{moment}}</h3><h4>at <a href='{{mapurl}}'>{{venue.name}}</a>:</h4><a href='{{mapurl}}'><img src='{{map}}'/></a></div><a href='{{event_url}}'><h2>{{name}}</h2></a><p>{{{description}}}</p></div>";
var mapimgtemplate = "https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=320x180&maptype=roadmap&markers=color:blue%7Clabel:{{name}}%7C{{lat}},{{lon}}&sensor=false";
var mapurltemplate = "https://www.google.com/maps/preview#!q={{address_1}} {{city}} {{state}}";

$(document).ready(function(){
  var url = "https://api.meetup.com/2/events?group_id=6083632&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=20&fields=&sig_id=12399825&sig=e3db5633737115cf98c5cfb3569d2e96bb6f485a&callback=?";
  $.getJSON(url,{},function(resp){
    console.log("success");
    resp.results.forEach(function(event){
      console.dir(event);
      event.moment = moment(event.time).format('MMMM Do YYYY, h:mma');
      event.map = Mustache.render(mapimgtemplate,event.venue);
      event.mapurl = Mustache.render(mapurltemplate,event.venue);
      $("#meetup_events").append(Mustache.render(eventtemplate, event));
    });
  });
});