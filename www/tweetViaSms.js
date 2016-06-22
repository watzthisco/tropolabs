/*
 * Tropo Learning Lab - Tweet by SMS
 * Level: Advanced
 *
 * Docs:
 * This app posts messages to Twitter via SMS.
 */

1. get an sms
2. post to twitter
3. send confirmation text back

curl --request 'POST' 'https://api.twitter.com/1.1/statuses/update.json' --data 'status=Maybe+he%27ll+finally+find+his+keys.+%23peterfalk' --header 'Authorization: OAuth oauth_consumer_key="CgnCUaRYA6bEaYQFf0hMJ2r6f", oauth_nonce="cf9196295948bf81208df103eb7c0b57", oauth_signature="7xMU8kbtoWqDPvFaQPbc3%2Fllvjs%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1466615733", oauth_version="1.0a"' --verbose