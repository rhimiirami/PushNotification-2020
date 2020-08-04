var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://fcm.googleapis.com/fcm/send',
  'headers': {
    'Authorization': 'key=AAAA7z9ZhFQ:APA91bHjVPB2R3Ifb27Bvn73bC7s0ijYwAo2_3OYunTuXdF9_61fi5nrVsc3Or9V2Yklh57ZYUYgrG_xgrtlCAcC-oEYTwAKXkGp1NZmNTx-te2jzlSg4slpcs_HO6oQfySRwZbZoh_J',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  "to":"ezSyFQtlS4O4Flj2ml5RQ0:APA91bH8wInISQ_28m3E2iDhkOkLrZwLNe-9KqBe_6fSKQERzBPk2-8NJ6fb5SvO01xxF5NAUxUu_OVRB5ZvCv4CD5tPU0_f0sqa-iQ2Xs4-VJwfw0Wh2N_xgR8sGuAufACM-MDP64eA",
  "notification":{
  "body":"BACEM FROM JAVASCRIPT",
  "title":"Javascript cript",
  "priority":"high",
  "content_available":true
}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});